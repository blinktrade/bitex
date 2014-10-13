import requests, os.path, logging, sys, time
try:
    import ujson as json
except ImportError:
    try:
        import simplejson as json
    except ImportError:
        import json

class Error(Exception):
    pass
class ValidationError(Error):
    pass
class InvalidKeyError(Error):
    pass
class PaymentRequiredError(Error):
    pass
class UnknownSubaccountError(Error):
    pass
class UnknownTemplateError(Error):
    pass
class ServiceUnavailableError(Error):
    pass
class UnknownMessageError(Error):
    pass
class InvalidTagNameError(Error):
    pass
class InvalidRejectError(Error):
    pass
class UnknownSenderError(Error):
    pass
class UnknownUrlError(Error):
    pass
class UnknownTrackingDomainError(Error):
    pass
class InvalidTemplateError(Error):
    pass
class UnknownWebhookError(Error):
    pass
class UnknownInboundDomainError(Error):
    pass
class UnknownInboundRouteError(Error):
    pass
class UnknownExportError(Error):
    pass
class IPProvisionLimitError(Error):
    pass
class UnknownPoolError(Error):
    pass
class NoSendingHistoryError(Error):
    pass
class PoorReputationError(Error):
    pass
class UnknownIPError(Error):
    pass
class InvalidEmptyDefaultPoolError(Error):
    pass
class InvalidDeleteDefaultPoolError(Error):
    pass
class InvalidDeleteNonEmptyPoolError(Error):
    pass
class InvalidCustomDNSError(Error):
    pass
class InvalidCustomDNSPendingError(Error):
    pass
class MetadataFieldLimitError(Error):
    pass
class UnknownMetadataFieldError(Error):
    pass

ROOT = 'https://mandrillapp.com/api/1.0/'
ERROR_MAP = {
    'ValidationError': ValidationError,
    'Invalid_Key': InvalidKeyError,
    'PaymentRequired': PaymentRequiredError,
    'Unknown_Subaccount': UnknownSubaccountError,
    'Unknown_Template': UnknownTemplateError,
    'ServiceUnavailable': ServiceUnavailableError,
    'Unknown_Message': UnknownMessageError,
    'Invalid_Tag_Name': InvalidTagNameError,
    'Invalid_Reject': InvalidRejectError,
    'Unknown_Sender': UnknownSenderError,
    'Unknown_Url': UnknownUrlError,
    'Unknown_TrackingDomain': UnknownTrackingDomainError,
    'Invalid_Template': InvalidTemplateError,
    'Unknown_Webhook': UnknownWebhookError,
    'Unknown_InboundDomain': UnknownInboundDomainError,
    'Unknown_InboundRoute': UnknownInboundRouteError,
    'Unknown_Export': UnknownExportError,
    'IP_ProvisionLimit': IPProvisionLimitError,
    'Unknown_Pool': UnknownPoolError,
    'NoSendingHistory': NoSendingHistoryError,
    'PoorReputation': PoorReputationError,
    'Unknown_IP': UnknownIPError,
    'Invalid_EmptyDefaultPool': InvalidEmptyDefaultPoolError,
    'Invalid_DeleteDefaultPool': InvalidDeleteDefaultPoolError,
    'Invalid_DeleteNonEmptyPool': InvalidDeleteNonEmptyPoolError,
    'Invalid_CustomDNS': InvalidCustomDNSError,
    'Invalid_CustomDNSPending': InvalidCustomDNSPendingError,
    'Metadata_FieldLimit': MetadataFieldLimitError,
    'Unknown_MetadataField': UnknownMetadataFieldError
}

logger = logging.getLogger('mandrill')
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler(sys.stderr))

class Mandrill(object):
    def __init__(self, apikey=None, debug=False):
        '''Initialize the API client

        Args:
           apikey (str|None): provide your Mandrill API key.  If this is left as None, we will attempt to get the API key from the following locations::
               - MANDRILL_APIKEY in the environment vars
               - ~/.mandrill.key for the user executing the script
               - /etc/mandrill.key
           debug (bool): set to True to log all the request and response information to the "mandrill" logger at the INFO level.  When set to false, it will log at the DEBUG level.  By default it will write log entries to STDERR
       '''

        self.session = requests.session()
        if debug:
            self.level = logging.INFO
        else:
            self.level = logging.DEBUG
        self.last_request = None

        if apikey is None:
            if 'MANDRILL_APIKEY' in os.environ:
                apikey = os.environ['MANDRILL_APIKEY']
            else:
                apikey = self.read_configs()

        if apikey is None: raise Error('You must provide a Mandrill API key')
        self.apikey = apikey

        self.templates = Templates(self)
        self.exports = Exports(self)
        self.users = Users(self)
        self.rejects = Rejects(self)
        self.inbound = Inbound(self)
        self.tags = Tags(self)
        self.messages = Messages(self)
        self.whitelists = Whitelists(self)
        self.ips = Ips(self)
        self.internal = Internal(self)
        self.subaccounts = Subaccounts(self)
        self.urls = Urls(self)
        self.webhooks = Webhooks(self)
        self.senders = Senders(self)
        self.metadata = Metadata(self)

    def call(self, url, params=None):
        '''Actually make the API call with the given params - this should only be called by the namespace methods - use the helpers in regular usage like m.tags.list()'''
        if params is None: params = {}
        params['key'] = self.apikey
        params = json.dumps(params)
        self.log('POST to %s%s.json: %s' % (ROOT, url, params))
        start = time.time()
        r = self.session.post('%s%s.json' % (ROOT, url), data=params, headers={'content-type': 'application/json', 'user-agent': 'Mandrill-Python/1.0.55'})
        try:
            remote_addr = r.raw._original_response.fp._sock.getpeername() # grab the remote_addr before grabbing the text since the socket will go away
        except:
            remote_addr = (None, None) #we use two private fields when getting the remote_addr, so be a little robust against errors

        response_body = r.text
        complete_time = time.time() - start
        self.log('Received %s in %.2fms: %s' % (r.status_code, complete_time * 1000, r.text))
        self.last_request = {'url': url, 'request_body': params, 'response_body': r.text, 'remote_addr': remote_addr, 'response': r, 'time': complete_time}

        result = json.loads(response_body)

        if r.status_code != requests.codes.ok:
            raise self.cast_error(result)
        return result

    def cast_error(self, result):
        '''Take a result representing an error and cast it to a specific exception if possible (use a generic mandrill.Error exception for unknown cases)'''
        if not 'status' in result or result['status'] != 'error' or not 'name' in result:
            raise Error('We received an unexpected error: %r' % result)

        if result['name'] in ERROR_MAP:
            return ERROR_MAP[result['name']](result['message'])
        return Error(result['message'])

    def read_configs(self):
        '''Try to read the API key from a series of files if it's not provided in code'''
        paths = [os.path.expanduser('~/.mandrill.key'), '/etc/mandrill.key']
        for path in paths:
            try:
                f = open(path, 'r')
                apikey = f.read().strip()
                f.close()
                if apikey != '':
                    return apikey
            except:
                pass

        return None

    def log(self, *args, **kwargs):
        '''Proxy access to the mandrill logger, changing the level based on the debug setting'''
        logger.log(self.level, *args, **kwargs)

    def __repr__(self):
        return '<Mandrill %s>' % self.apikey

class Templates(object):
    def __init__(self, master):
        self.master = master

    def add(self, name, from_email=None, from_name=None, subject=None, code=None, text=None, publish=True, labels=[]):
        """Add a new template

        Args:
           name (string): the name for the new template - must be unique
           from_email (string): a default sending address for emails sent using this template
           from_name (string): a default from name to be used
           subject (string): a default subject line to be used
           code (string): the HTML code for the template with mc:edit attributes for the editable elements
           text (string): a default text part to be used when sending with this template
           publish (boolean): set to false to add a draft template without publishing
           labels (array): an optional array of up to 10 labels to use for filtering templates::
               labels[] (string): a single label

        Returns:
           struct.  the information saved about the new template::
               slug (string): the immutable unique code name of the template
               name (string): the name of the template
               labels (array): the list of labels applied to the template::
                   labels[] (string): a single label

               code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements - draft version
               subject (string): the subject line of the template, if provided - draft version
               from_email (string): the default sender address for the template, if provided - draft version
               from_name (string): the default sender from name for the template, if provided - draft version
               text (string): the default text part of messages sent with the template, if provided - draft version
               publish_name (string): the same as the template name - kept as a separate field for backwards compatibility
               publish_code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements that are available as published, if it has been published
               publish_subject (string): the subject line of the template, if provided
               publish_from_email (string): the default sender address for the template, if provided
               publish_from_name (string): the default sender from name for the template, if provided
               publish_text (string): the default text part of messages sent with the template, if provided
               published_at (string): the date and time the template was last published as a UTC string in YYYY-MM-DD HH:MM:SS format, or null if it has not been published
               created_at (string): the date and time the template was first created as a UTC string in YYYY-MM-DD HH:MM:SS format
               updated_at (string): the date and time the template was last modified as a UTC string in YYYY-MM-DD HH:MM:SS format

        Raises:
           InvalidTemplateError: The given template name already exists or contains invalid characters
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'name': name, 'from_email': from_email, 'from_name': from_name, 'subject': subject, 'code': code, 'text': text, 'publish': publish, 'labels': labels}
        return self.master.call('templates/add', _params)

    def info(self, name):
        """Get the information for an existing template

        Args:
           name (string): the immutable name of an existing template

        Returns:
           struct.  the requested template information::
               slug (string): the immutable unique code name of the template
               name (string): the name of the template
               labels (array): the list of labels applied to the template::
                   labels[] (string): a single label

               code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements - draft version
               subject (string): the subject line of the template, if provided - draft version
               from_email (string): the default sender address for the template, if provided - draft version
               from_name (string): the default sender from name for the template, if provided - draft version
               text (string): the default text part of messages sent with the template, if provided - draft version
               publish_name (string): the same as the template name - kept as a separate field for backwards compatibility
               publish_code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements that are available as published, if it has been published
               publish_subject (string): the subject line of the template, if provided
               publish_from_email (string): the default sender address for the template, if provided
               publish_from_name (string): the default sender from name for the template, if provided
               publish_text (string): the default text part of messages sent with the template, if provided
               published_at (string): the date and time the template was last published as a UTC string in YYYY-MM-DD HH:MM:SS format, or null if it has not been published
               created_at (string): the date and time the template was first created as a UTC string in YYYY-MM-DD HH:MM:SS format
               updated_at (string): the date and time the template was last modified as a UTC string in YYYY-MM-DD HH:MM:SS format

        Raises:
           UnknownTemplateError: The requested template does not exist
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'name': name}
        return self.master.call('templates/info', _params)

    def update(self, name, from_email=None, from_name=None, subject=None, code=None, text=None, publish=True, labels=None):
        """Update the code for an existing template. If null is provided for any fields, the values will remain unchanged.

        Args:
           name (string): the immutable name of an existing template
           from_email (string): the new default sending address
           from_name (string): the new default from name
           subject (string): the new default subject line
           code (string): the new code for the template
           text (string): the new default text part to be used
           publish (boolean): set to false to update the draft version of the template without publishing
           labels (array): an optional array of up to 10 labels to use for filtering templates::
               labels[] (string): a single label

        Returns:
           struct.  the template that was updated::
               slug (string): the immutable unique code name of the template
               name (string): the name of the template
               labels (array): the list of labels applied to the template::
                   labels[] (string): a single label

               code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements - draft version
               subject (string): the subject line of the template, if provided - draft version
               from_email (string): the default sender address for the template, if provided - draft version
               from_name (string): the default sender from name for the template, if provided - draft version
               text (string): the default text part of messages sent with the template, if provided - draft version
               publish_name (string): the same as the template name - kept as a separate field for backwards compatibility
               publish_code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements that are available as published, if it has been published
               publish_subject (string): the subject line of the template, if provided
               publish_from_email (string): the default sender address for the template, if provided
               publish_from_name (string): the default sender from name for the template, if provided
               publish_text (string): the default text part of messages sent with the template, if provided
               published_at (string): the date and time the template was last published as a UTC string in YYYY-MM-DD HH:MM:SS format, or null if it has not been published
               created_at (string): the date and time the template was first created as a UTC string in YYYY-MM-DD HH:MM:SS format
               updated_at (string): the date and time the template was last modified as a UTC string in YYYY-MM-DD HH:MM:SS format

        Raises:
           UnknownTemplateError: The requested template does not exist
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'name': name, 'from_email': from_email, 'from_name': from_name, 'subject': subject, 'code': code, 'text': text, 'publish': publish, 'labels': labels}
        return self.master.call('templates/update', _params)

    def publish(self, name):
        """Publish the content for the template. Any new messages sent using this template will start using the content that was previously in draft.

        Args:
           name (string): the immutable name of an existing template

        Returns:
           struct.  the template that was published::
               slug (string): the immutable unique code name of the template
               name (string): the name of the template
               labels (array): the list of labels applied to the template::
                   labels[] (string): a single label

               code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements - draft version
               subject (string): the subject line of the template, if provided - draft version
               from_email (string): the default sender address for the template, if provided - draft version
               from_name (string): the default sender from name for the template, if provided - draft version
               text (string): the default text part of messages sent with the template, if provided - draft version
               publish_name (string): the same as the template name - kept as a separate field for backwards compatibility
               publish_code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements that are available as published, if it has been published
               publish_subject (string): the subject line of the template, if provided
               publish_from_email (string): the default sender address for the template, if provided
               publish_from_name (string): the default sender from name for the template, if provided
               publish_text (string): the default text part of messages sent with the template, if provided
               published_at (string): the date and time the template was last published as a UTC string in YYYY-MM-DD HH:MM:SS format, or null if it has not been published
               created_at (string): the date and time the template was first created as a UTC string in YYYY-MM-DD HH:MM:SS format
               updated_at (string): the date and time the template was last modified as a UTC string in YYYY-MM-DD HH:MM:SS format

        Raises:
           UnknownTemplateError: The requested template does not exist
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'name': name}
        return self.master.call('templates/publish', _params)

    def delete(self, name):
        """Delete a template

        Args:
           name (string): the immutable name of an existing template

        Returns:
           struct.  the template that was deleted::
               slug (string): the immutable unique code name of the template
               name (string): the name of the template
               labels (array): the list of labels applied to the template::
                   labels[] (string): a single label

               code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements - draft version
               subject (string): the subject line of the template, if provided - draft version
               from_email (string): the default sender address for the template, if provided - draft version
               from_name (string): the default sender from name for the template, if provided - draft version
               text (string): the default text part of messages sent with the template, if provided - draft version
               publish_name (string): the same as the template name - kept as a separate field for backwards compatibility
               publish_code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements that are available as published, if it has been published
               publish_subject (string): the subject line of the template, if provided
               publish_from_email (string): the default sender address for the template, if provided
               publish_from_name (string): the default sender from name for the template, if provided
               publish_text (string): the default text part of messages sent with the template, if provided
               published_at (string): the date and time the template was last published as a UTC string in YYYY-MM-DD HH:MM:SS format, or null if it has not been published
               created_at (string): the date and time the template was first created as a UTC string in YYYY-MM-DD HH:MM:SS format
               updated_at (string): the date and time the template was last modified as a UTC string in YYYY-MM-DD HH:MM:SS format

        Raises:
           UnknownTemplateError: The requested template does not exist
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'name': name}
        return self.master.call('templates/delete', _params)

    def list(self, label=None):
        """Return a list of all the templates available to this user

        Args:
           label (string): an optional label to filter the templates

        Returns:
           array.  an array of structs with information about each template::
               [] (struct): the information on each template in the account::
                   [].slug (string): the immutable unique code name of the template
                   [].name (string): the name of the template
                   [].labels (array): the list of labels applied to the template::
                       [].labels[] (string): a single label

                   [].code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements - draft version
                   [].subject (string): the subject line of the template, if provided - draft version
                   [].from_email (string): the default sender address for the template, if provided - draft version
                   [].from_name (string): the default sender from name for the template, if provided - draft version
                   [].text (string): the default text part of messages sent with the template, if provided - draft version
                   [].publish_name (string): the same as the template name - kept as a separate field for backwards compatibility
                   [].publish_code (string): the full HTML code of the template, with mc:edit attributes marking the editable elements that are available as published, if it has been published
                   [].publish_subject (string): the subject line of the template, if provided
                   [].publish_from_email (string): the default sender address for the template, if provided
                   [].publish_from_name (string): the default sender from name for the template, if provided
                   [].publish_text (string): the default text part of messages sent with the template, if provided
                   [].published_at (string): the date and time the template was last published as a UTC string in YYYY-MM-DD HH:MM:SS format, or null if it has not been published
                   [].created_at (string): the date and time the template was first created as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].updated_at (string): the date and time the template was last modified as a UTC string in YYYY-MM-DD HH:MM:SS format


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'label': label}
        return self.master.call('templates/list', _params)

    def time_series(self, name):
        """Return the recent history (hourly stats for the last 30 days) for a template

        Args:
           name (string): the name of an existing template

        Returns:
           array.  the array of history information::
               [] (struct): the stats for a single hour::
                   [].time (string): the hour as a UTC date string in YYYY-MM-DD HH:MM:SS format
                   [].sent (integer): the number of emails that were sent during the hour
                   [].hard_bounces (integer): the number of emails that hard bounced during the hour
                   [].soft_bounces (integer): the number of emails that soft bounced during the hour
                   [].rejects (integer): the number of emails that were rejected during the hour
                   [].complaints (integer): the number of spam complaints received during the hour
                   [].opens (integer): the number of emails opened during the hour
                   [].unique_opens (integer): the number of unique opens generated by messages sent during the hour
                   [].clicks (integer): the number of tracked URLs clicked during the hour
                   [].unique_clicks (integer): the number of unique clicks generated by messages sent during the hour


        Raises:
           UnknownTemplateError: The requested template does not exist
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'name': name}
        return self.master.call('templates/time-series', _params)

    def render(self, template_name, template_content, merge_vars=None):
        """Inject content and optionally merge fields into a template, returning the HTML that results

        Args:
           template_name (string): the immutable name of a template that exists in the user's account
           template_content (array): an array of template content to render.  Each item in the array should be a struct with two keys - name: the name of the content block to set the content for, and content: the actual content to put into the block::
               template_content[] (struct): the injection of a single piece of content into a single editable region::
                   template_content[].name (string): the name of the mc:edit editable region to inject into
                   template_content[].content (string): the content to inject

           merge_vars (array): optional merge variables to use for injecting merge field content.  If this is not provided, no merge fields will be replaced.::
               merge_vars[] (struct): a single merge variable::
                   merge_vars[].name (string): the merge variable's name. Merge variable names are case-insensitive and may not start with _
                   merge_vars[].content (string): the merge variable's content


        Returns:
           struct.  the result of rendering the given template with the content and merge field values injected::
               html (string): the rendered HTML as a string

        Raises:
           UnknownTemplateError: The requested template does not exist
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'template_name': template_name, 'template_content': template_content, 'merge_vars': merge_vars}
        return self.master.call('templates/render', _params)


class Exports(object):
    def __init__(self, master):
        self.master = master

    def info(self, id):
        """Returns information about an export job. If the export job's state is 'complete',
the returned data will include a URL you can use to fetch the results. Every export
job produces a zip archive, but the format of the archive is distinct for each job
type. The api calls that initiate exports include more details about the output format
for that job type.

        Args:
           id (string): an export job identifier

        Returns:
           struct.  the information about the export::
               id (string): the unique identifier for this Export. Use this identifier when checking the export job's status
               created_at (string): the date and time that the export job was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               type (string): the type of the export job - activity, reject, or whitelist
               finished_at (string): the date and time that the export job was finished as a UTC string in YYYY-MM-DD HH:MM:SS format
               state (string): the export job's state - waiting, working, complete, error, or expired.
               result_url (string): the url for the export job's results, if the job is completed.

        Raises:
           UnknownExportError: The requested export job does not exist
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id}
        return self.master.call('exports/info', _params)

    def list(self, ):
        """Returns a list of your exports.

        Returns:
           array.  the account's exports::
               [] (struct): the individual export info::
                   [].id (string): the unique identifier for this Export. Use this identifier when checking the export job's status
                   [].created_at (string): the date and time that the export job was created as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].type (string): the type of the export job - activity, reject, or whitelist
                   [].finished_at (string): the date and time that the export job was finished as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].state (string): the export job's state - waiting, working, complete, error, or expired.
                   [].result_url (string): the url for the export job's results, if the job is completed.


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('exports/list', _params)

    def rejects(self, notify_email=None):
        """Begins an export of your rejection blacklist. The blacklist will be exported to a zip archive
containing a single file named rejects.csv that includes the following fields: email,
reason, detail, created_at, expires_at, last_event_at, expires_at.

        Args:
           notify_email (string): an optional email address to notify when the export job has finished.

        Returns:
           struct.  information about the rejects export job that was started::
               id (string): the unique identifier for this Export. Use this identifier when checking the export job's status
               created_at (string): the date and time that the export job was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               type (string): the type of the export job
               finished_at (string): the date and time that the export job was finished as a UTC string in YYYY-MM-DD HH:MM:SS format, or null for jobs that have not run
               state (string): the export job's state
               result_url (string): the url for the export job's results, if the job is complete

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'notify_email': notify_email}
        return self.master.call('exports/rejects', _params)

    def whitelist(self, notify_email=None):
        """Begins an export of your rejection whitelist. The whitelist will be exported to a zip archive
containing a single file named whitelist.csv that includes the following fields:
email, detail, created_at.

        Args:
           notify_email (string): an optional email address to notify when the export job has finished.

        Returns:
           struct.  information about the whitelist export job that was started::
               id (string): the unique identifier for this Export. Use this identifier when checking the export job's status
               created_at (string): the date and time that the export job was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               type (string): the type of the export job
               finished_at (string): the date and time that the export job was finished as a UTC string in YYYY-MM-DD HH:MM:SS format, or null for jobs that have not run
               state (string): the export job's state
               result_url (string): the url for the export job's results, if the job is complete

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'notify_email': notify_email}
        return self.master.call('exports/whitelist', _params)

    def activity(self, notify_email=None, date_from=None, date_to=None, tags=None, senders=None, states=None, api_keys=None):
        """Begins an export of your activity history. The activity will be exported to a zip archive
containing a single file named activity.csv in the same format as you would be able to export
from your account's activity view. It includes the following fields: Date, Email Address,
Sender, Subject, Status, Tags, Opens, Clicks, Bounce Detail. If you have configured any custom
metadata fields, they will be included in the exported data.

        Args:
           notify_email (string): an optional email address to notify when the export job has finished
           date_from (string): start date as a UTC string in YYYY-MM-DD HH:MM:SS format
           date_to (string): end date as a UTC string in YYYY-MM-DD HH:MM:SS format
           tags (array): an array of tag names to narrow the export to; will match messages that contain ANY of the tags::
               tags[] (string): a tag name
           senders (array): an array of senders to narrow the export to::
               senders[] (string): a sender address
           states (array): an array of states to narrow the export to; messages with ANY of the states will be included::
               states[] (string): a message state
           api_keys (array): an array of api keys to narrow the export to; messsagse sent with ANY of the keys will be included::
               api_keys[] (string): an API key associated with your account

        Returns:
           struct.  information about the activity export job that was started::
               id (string): the unique identifier for this Export. Use this identifier when checking the export job's status
               created_at (string): the date and time that the export job was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               type (string): the type of the export job
               finished_at (string): the date and time that the export job was finished as a UTC string in YYYY-MM-DD HH:MM:SS format, or null for jobs that have not run
               state (string): the export job's state
               result_url (string): the url for the export job's results, if the job is complete

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'notify_email': notify_email, 'date_from': date_from, 'date_to': date_to, 'tags': tags, 'senders': senders, 'states': states, 'api_keys': api_keys}
        return self.master.call('exports/activity', _params)


class Users(object):
    def __init__(self, master):
        self.master = master

    def info(self, ):
        """Return the information about the API-connected user

        Returns:
           struct.  the user information including username, key, reputation, quota, and historical sending stats::
               username (string): the username of the user (used for SMTP authentication)
               created_at (string): the date and time that the user's Mandrill account was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               public_id (string): a unique, permanent identifier for this user
               reputation (integer): the reputation of the user on a scale from 0 to 100, with 75 generally being a "good" reputation
               hourly_quota (integer): the maximum number of emails Mandrill will deliver for this user each hour.  Any emails beyond that will be accepted and queued for later delivery.  Users with higher reputations will have higher hourly quotas
               backlog (integer): the number of emails that are queued for delivery due to exceeding your monthly or hourly quotas
               stats (struct): an aggregate summary of the account's sending stats::
                   stats.today (struct): stats for this user so far today::
                       stats.today.sent (integer): the number of emails sent for this user so far today
                       stats.today.hard_bounces (integer): the number of emails hard bounced for this user so far today
                       stats.today.soft_bounces (integer): the number of emails soft bounced for this user so far today
                       stats.today.rejects (integer): the number of emails rejected for sending this user so far today
                       stats.today.complaints (integer): the number of spam complaints for this user so far today
                       stats.today.unsubs (integer): the number of unsubscribes for this user so far today
                       stats.today.opens (integer): the number of times emails have been opened for this user so far today
                       stats.today.unique_opens (integer): the number of unique opens for emails sent for this user so far today
                       stats.today.clicks (integer): the number of URLs that have been clicked for this user so far today
                       stats.today.unique_clicks (integer): the number of unique clicks for emails sent for this user so far today

                   stats.last_7_days (struct): stats for this user in the last 7 days::
                       stats.last_7_days.sent (integer): the number of emails sent for this user in the last 7 days
                       stats.last_7_days.hard_bounces (integer): the number of emails hard bounced for this user in the last 7 days
                       stats.last_7_days.soft_bounces (integer): the number of emails soft bounced for this user in the last 7 days
                       stats.last_7_days.rejects (integer): the number of emails rejected for sending this user in the last 7 days
                       stats.last_7_days.complaints (integer): the number of spam complaints for this user in the last 7 days
                       stats.last_7_days.unsubs (integer): the number of unsubscribes for this user in the last 7 days
                       stats.last_7_days.opens (integer): the number of times emails have been opened for this user in the last 7 days
                       stats.last_7_days.unique_opens (integer): the number of unique opens for emails sent for this user in the last 7 days
                       stats.last_7_days.clicks (integer): the number of URLs that have been clicked for this user in the last 7 days
                       stats.last_7_days.unique_clicks (integer): the number of unique clicks for emails sent for this user in the last 7 days

                   stats.last_30_days (struct): stats for this user in the last 30 days::
                       stats.last_30_days.sent (integer): the number of emails sent for this user in the last 30 days
                       stats.last_30_days.hard_bounces (integer): the number of emails hard bounced for this user in the last 30 days
                       stats.last_30_days.soft_bounces (integer): the number of emails soft bounced for this user in the last 30 days
                       stats.last_30_days.rejects (integer): the number of emails rejected for sending this user in the last 30 days
                       stats.last_30_days.complaints (integer): the number of spam complaints for this user in the last 30 days
                       stats.last_30_days.unsubs (integer): the number of unsubscribes for this user in the last 30 days
                       stats.last_30_days.opens (integer): the number of times emails have been opened for this user in the last 30 days
                       stats.last_30_days.unique_opens (integer): the number of unique opens for emails sent for this user in the last 30 days
                       stats.last_30_days.clicks (integer): the number of URLs that have been clicked for this user in the last 30 days
                       stats.last_30_days.unique_clicks (integer): the number of unique clicks for emails sent for this user in the last 30 days

                   stats.last_60_days (struct): stats for this user in the last 60 days::
                       stats.last_60_days.sent (integer): the number of emails sent for this user in the last 60 days
                       stats.last_60_days.hard_bounces (integer): the number of emails hard bounced for this user in the last 60 days
                       stats.last_60_days.soft_bounces (integer): the number of emails soft bounced for this user in the last 60 days
                       stats.last_60_days.rejects (integer): the number of emails rejected for sending this user in the last 60 days
                       stats.last_60_days.complaints (integer): the number of spam complaints for this user in the last 60 days
                       stats.last_60_days.unsubs (integer): the number of unsubscribes for this user in the last 60 days
                       stats.last_60_days.opens (integer): the number of times emails have been opened for this user in the last 60 days
                       stats.last_60_days.unique_opens (integer): the number of unique opens for emails sent for this user in the last 60 days
                       stats.last_60_days.clicks (integer): the number of URLs that have been clicked for this user in the last 60 days
                       stats.last_60_days.unique_clicks (integer): the number of unique clicks for emails sent for this user in the last 60 days

                   stats.last_90_days (struct): stats for this user in the last 90 days::
                       stats.last_90_days.sent (integer): the number of emails sent for this user in the last 90 days
                       stats.last_90_days.hard_bounces (integer): the number of emails hard bounced for this user in the last 90 days
                       stats.last_90_days.soft_bounces (integer): the number of emails soft bounced for this user in the last 90 days
                       stats.last_90_days.rejects (integer): the number of emails rejected for sending this user in the last 90 days
                       stats.last_90_days.complaints (integer): the number of spam complaints for this user in the last 90 days
                       stats.last_90_days.unsubs (integer): the number of unsubscribes for this user in the last 90 days
                       stats.last_90_days.opens (integer): the number of times emails have been opened for this user in the last 90 days
                       stats.last_90_days.unique_opens (integer): the number of unique opens for emails sent for this user in the last 90 days
                       stats.last_90_days.clicks (integer): the number of URLs that have been clicked for this user in the last 90 days
                       stats.last_90_days.unique_clicks (integer): the number of unique clicks for emails sent for this user in the last 90 days

                   stats.all_time (struct): stats for the lifetime of the user's account::
                       stats.all_time.sent (integer): the number of emails sent in the lifetime of the user's account
                       stats.all_time.hard_bounces (integer): the number of emails hard bounced in the lifetime of the user's account
                       stats.all_time.soft_bounces (integer): the number of emails soft bounced in the lifetime of the user's account
                       stats.all_time.rejects (integer): the number of emails rejected for sending this user so far today
                       stats.all_time.complaints (integer): the number of spam complaints in the lifetime of the user's account
                       stats.all_time.unsubs (integer): the number of unsubscribes in the lifetime of the user's account
                       stats.all_time.opens (integer): the number of times emails have been opened in the lifetime of the user's account
                       stats.all_time.unique_opens (integer): the number of unique opens for emails sent in the lifetime of the user's account
                       stats.all_time.clicks (integer): the number of URLs that have been clicked in the lifetime of the user's account
                       stats.all_time.unique_clicks (integer): the number of unique clicks for emails sent in the lifetime of the user's account



        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('users/info', _params)

    def ping(self, ):
        """Validate an API key and respond to a ping

        Returns:
           string.  the string "PONG!"

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('users/ping', _params)

    def ping2(self, ):
        """Validate an API key and respond to a ping (anal JSON parser version)

        Returns:
           struct.  a struct with one key "PING" with a static value "PONG!"

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('users/ping2', _params)

    def senders(self, ):
        """Return the senders that have tried to use this account, both verified and unverified

        Returns:
           array.  an array of sender data, one for each sending addresses used by the account::
               [] (struct): the information on each sending address in the account::
                   [].address (string): the sender's email address
                   [].created_at (string): the date and time that the sender was first seen by Mandrill as a UTC date string in YYYY-MM-DD HH:MM:SS format
                   [].sent (integer): the total number of messages sent by this sender
                   [].hard_bounces (integer): the total number of hard bounces by messages by this sender
                   [].soft_bounces (integer): the total number of soft bounces by messages by this sender
                   [].rejects (integer): the total number of rejected messages by this sender
                   [].complaints (integer): the total number of spam complaints received for messages by this sender
                   [].unsubs (integer): the total number of unsubscribe requests received for messages by this sender
                   [].opens (integer): the total number of times messages by this sender have been opened
                   [].clicks (integer): the total number of times tracked URLs in messages by this sender have been clicked
                   [].unique_opens (integer): the number of unique opens for emails sent for this sender
                   [].unique_clicks (integer): the number of unique clicks for emails sent for this sender


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('users/senders', _params)


class Rejects(object):
    def __init__(self, master):
        self.master = master

    def add(self, email, comment=None, subaccount=None):
        """Adds an email to your email rejection blacklist. Addresses that you
add manually will never expire and there is no reputation penalty
for removing them from your blacklist. Attempting to blacklist an
address that has been whitelisted will have no effect.

        Args:
           email (string): an email address to block
           comment (string): an optional comment describing the rejection
           subaccount (string): an optional unique identifier for the subaccount to limit the blacklist entry

        Returns:
           struct.  a status object containing the address and the result of the operation::
               email (string): the email address you provided
               added (boolean): whether the operation succeeded

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownSubaccountError: The provided subaccount id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'email': email, 'comment': comment, 'subaccount': subaccount}
        return self.master.call('rejects/add', _params)

    def list(self, email=None, include_expired=False, subaccount=None):
        """Retrieves your email rejection blacklist. You can provide an email
address to limit the results. Returns up to 1000 results. By default,
entries that have expired are excluded from the results; set
include_expired to true to include them.

        Args:
           email (string): an optional email address to search by
           include_expired (boolean): whether to include rejections that have already expired.
           subaccount (string): an optional unique identifier for the subaccount to limit the blacklist

        Returns:
           array.  Up to 1000 rejection entries::
               [] (struct): the information for each rejection blacklist entry::
                   [].email (string): the email that is blocked
                   [].reason (string): the type of event (hard-bounce, soft-bounce, spam, unsub) that caused this rejection
                   [].detail (string): extended details about the event, such as the SMTP diagnostic for bounces or the comment for manually-created rejections
                   [].created_at (string): when the email was added to the blacklist
                   [].last_event_at (string): the timestamp of the most recent event that either created or renewed this rejection
                   [].expires_at (string): when the blacklist entry will expire (this may be in the past)
                   [].expired (boolean): whether the blacklist entry has expired
                   [].sender (struct): the sender that this blacklist entry applies to, or null if none.::
                       [].sender.address (string): the sender's email address
                       [].sender.created_at (string): the date and time that the sender was first seen by Mandrill as a UTC date string in YYYY-MM-DD HH:MM:SS format
                       [].sender.sent (integer): the total number of messages sent by this sender
                       [].sender.hard_bounces (integer): the total number of hard bounces by messages by this sender
                       [].sender.soft_bounces (integer): the total number of soft bounces by messages by this sender
                       [].sender.rejects (integer): the total number of rejected messages by this sender
                       [].sender.complaints (integer): the total number of spam complaints received for messages by this sender
                       [].sender.unsubs (integer): the total number of unsubscribe requests received for messages by this sender
                       [].sender.opens (integer): the total number of times messages by this sender have been opened
                       [].sender.clicks (integer): the total number of times tracked URLs in messages by this sender have been clicked
                       [].sender.unique_opens (integer): the number of unique opens for emails sent for this sender
                       [].sender.unique_clicks (integer): the number of unique clicks for emails sent for this sender

                   [].subaccount (string): the subaccount that this blacklist entry applies to, or null if none.


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownSubaccountError: The provided subaccount id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'email': email, 'include_expired': include_expired, 'subaccount': subaccount}
        return self.master.call('rejects/list', _params)

    def delete(self, email, subaccount=None):
        """Deletes an email rejection. There is no limit to how many rejections
you can remove from your blacklist, but keep in mind that each deletion
has an affect on your reputation.

        Args:
           email (string): an email address
           subaccount (string): an optional unique identifier for the subaccount to limit the blacklist deletion

        Returns:
           struct.  a status object containing the address and whether the deletion succeeded.::
               email (string): the email address that was removed from the blacklist
               deleted (boolean): whether the address was deleted successfully.
               subaccount (string): the subaccount blacklist that the address was removed from, if any

        Raises:
           InvalidRejectError: The requested email is not in the rejection list
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownSubaccountError: The provided subaccount id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'email': email, 'subaccount': subaccount}
        return self.master.call('rejects/delete', _params)


class Inbound(object):
    def __init__(self, master):
        self.master = master

    def domains(self, ):
        """List the domains that have been configured for inbound delivery

        Returns:
           array.  the inbound domains associated with the account::
               [] (struct): the individual domain info::
                   [].domain (string): the domain name that is accepting mail
                   [].created_at (string): the date and time that the inbound domain was added as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].valid_mx (boolean): true if this inbound domain has successfully set up an MX record to deliver mail to the Mandrill servers


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('inbound/domains', _params)

    def add_domain(self, domain):
        """Add an inbound domain to your account

        Args:
           domain (string): a domain name

        Returns:
           struct.  information about the domain::
               domain (string): the domain name that is accepting mail
               created_at (string): the date and time that the inbound domain was added as a UTC string in YYYY-MM-DD HH:MM:SS format
               valid_mx (boolean): true if this inbound domain has successfully set up an MX record to deliver mail to the Mandrill servers

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'domain': domain}
        return self.master.call('inbound/add-domain', _params)

    def check_domain(self, domain):
        """Check the MX settings for an inbound domain. The domain must have already been added with the add-domain call

        Args:
           domain (string): an existing inbound domain

        Returns:
           struct.  information about the inbound domain::
               domain (string): the domain name that is accepting mail
               created_at (string): the date and time that the inbound domain was added as a UTC string in YYYY-MM-DD HH:MM:SS format
               valid_mx (boolean): true if this inbound domain has successfully set up an MX record to deliver mail to the Mandrill servers

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownInboundDomainError: The requested inbound domain does not exist
           Error: A general Mandrill error has occurred
        """
        _params = {'domain': domain}
        return self.master.call('inbound/check-domain', _params)

    def delete_domain(self, domain):
        """Delete an inbound domain from the account. All mail will stop routing for this domain immediately.

        Args:
           domain (string): an existing inbound domain

        Returns:
           struct.  information about the deleted domain::
               domain (string): the domain name that is accepting mail
               created_at (string): the date and time that the inbound domain was added as a UTC string in YYYY-MM-DD HH:MM:SS format
               valid_mx (boolean): true if this inbound domain has successfully set up an MX record to deliver mail to the Mandrill servers

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownInboundDomainError: The requested inbound domain does not exist
           Error: A general Mandrill error has occurred
        """
        _params = {'domain': domain}
        return self.master.call('inbound/delete-domain', _params)

    def routes(self, domain):
        """List the mailbox routes defined for an inbound domain

        Args:
           domain (string): the domain to check

        Returns:
           array.  the routes associated with the domain::
               [] (struct): the individual mailbox route::
                   [].id (string): the unique identifier of the route
                   [].pattern (string): the search pattern that the mailbox name should match
                   [].url (string): the webhook URL where inbound messages will be published


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownInboundDomainError: The requested inbound domain does not exist
           Error: A general Mandrill error has occurred
        """
        _params = {'domain': domain}
        return self.master.call('inbound/routes', _params)

    def add_route(self, domain, pattern, url):
        """Add a new mailbox route to an inbound domain

        Args:
           domain (string): an existing inbound domain
           pattern (string): the search pattern that the mailbox name should match
           url (string): the webhook URL where the inbound messages will be published

        Returns:
           struct.  the added mailbox route information::
               id (string): the unique identifier of the route
               pattern (string): the search pattern that the mailbox name should match
               url (string): the webhook URL where inbound messages will be published

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownInboundDomainError: The requested inbound domain does not exist
           Error: A general Mandrill error has occurred
        """
        _params = {'domain': domain, 'pattern': pattern, 'url': url}
        return self.master.call('inbound/add-route', _params)

    def update_route(self, id, pattern=None, url=None):
        """Update the pattern or webhook of an existing inbound mailbox route. If null is provided for any fields, the values will remain unchanged.

        Args:
           id (string): the unique identifier of an existing mailbox route
           pattern (string): the search pattern that the mailbox name should match
           url (string): the webhook URL where the inbound messages will be published

        Returns:
           struct.  the updated mailbox route information::
               id (string): the unique identifier of the route
               pattern (string): the search pattern that the mailbox name should match
               url (string): the webhook URL where inbound messages will be published

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownInboundRouteError: The provided inbound route does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id, 'pattern': pattern, 'url': url}
        return self.master.call('inbound/update-route', _params)

    def delete_route(self, id):
        """Delete an existing inbound mailbox route

        Args:
           id (string): the unique identifier of an existing route

        Returns:
           struct.  the deleted mailbox route information::
               id (string): the unique identifier of the route
               pattern (string): the search pattern that the mailbox name should match
               url (string): the webhook URL where inbound messages will be published

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownInboundRouteError: The provided inbound route does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id}
        return self.master.call('inbound/delete-route', _params)

    def send_raw(self, raw_message, to=None, mail_from=None, helo=None, client_address=None):
        """Take a raw MIME document destined for a domain with inbound domains set up, and send it to the inbound hook exactly as if it had been sent over SMTP

        Args:
           raw_message (string): the full MIME document of an email message
           to (array|null): optionally define the recipients to receive the message - otherwise we'll use the To, Cc, and Bcc headers provided in the document::
               to[] (string): the email address of the recipient
           mail_from (string): the address specified in the MAIL FROM stage of the SMTP conversation. Required for the SPF check.
           helo (string): the identification provided by the client mta in the MTA state of the SMTP conversation. Required for the SPF check.
           client_address (string): the remote MTA's ip address. Optional; required for the SPF check.

        Returns:
           array.  an array of the information for each recipient in the message (usually one) that matched an inbound route::
               [] (struct): the individual recipient information::
                   [].email (string): the email address of the matching recipient
                   [].pattern (string): the mailbox route pattern that the recipient matched
                   [].url (string): the webhook URL that the message was posted to


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'raw_message': raw_message, 'to': to, 'mail_from': mail_from, 'helo': helo, 'client_address': client_address}
        return self.master.call('inbound/send-raw', _params)


class Tags(object):
    def __init__(self, master):
        self.master = master

    def list(self, ):
        """Return all of the user-defined tag information

        Returns:
           array.  a list of user-defined tags::
               [] (struct): a user-defined tag::
                   [].tag (string): the actual tag as a string
                   [].reputation (integer): the tag's current reputation on a scale from 0 to 100.
                   [].sent (integer): the total number of messages sent with this tag
                   [].hard_bounces (integer): the total number of hard bounces by messages with this tag
                   [].soft_bounces (integer): the total number of soft bounces by messages with this tag
                   [].rejects (integer): the total number of rejected messages with this tag
                   [].complaints (integer): the total number of spam complaints received for messages with this tag
                   [].unsubs (integer): the total number of unsubscribe requests received for messages with this tag
                   [].opens (integer): the total number of times messages with this tag have been opened
                   [].clicks (integer): the total number of times tracked URLs in messages with this tag have been clicked
                   [].unique_opens (integer): the number of unique opens for emails sent with this tag
                   [].unique_clicks (integer): the number of unique clicks for emails sent with this tag


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('tags/list', _params)

    def delete(self, tag):
        """Deletes a tag permanently. Deleting a tag removes the tag from any messages
that have been sent, and also deletes the tag's stats. There is no way to
undo this operation, so use it carefully.

        Args:
           tag (string): a tag name

        Returns:
           struct.  the tag that was deleted::
               tag (string): the actual tag as a string
               reputation (integer): the tag's current reputation on a scale from 0 to 100.
               sent (integer): the total number of messages sent with this tag
               hard_bounces (integer): the total number of hard bounces by messages with this tag
               soft_bounces (integer): the total number of soft bounces by messages with this tag
               rejects (integer): the total number of rejected messages with this tag
               complaints (integer): the total number of spam complaints received for messages with this tag
               unsubs (integer): the total number of unsubscribe requests received for messages with this tag
               opens (integer): the total number of times messages with this tag have been opened
               clicks (integer): the total number of times tracked URLs in messages with this tag have been clicked
               unique_opens (integer): the number of unique opens for emails sent with this tag
               unique_clicks (integer): the number of unique clicks for emails sent with this tag

        Raises:
           InvalidTagNameError: The requested tag does not exist or contains invalid characters
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'tag': tag}
        return self.master.call('tags/delete', _params)

    def info(self, tag):
        """Return more detailed information about a single tag, including aggregates of recent stats

        Args:
           tag (string): an existing tag name

        Returns:
           struct.  the detailed information on the tag::
               tag (string): the actual tag as a string
               sent (integer): the total number of messages sent with this tag
               hard_bounces (integer): the total number of hard bounces by messages with this tag
               soft_bounces (integer): the total number of soft bounces by messages with this tag
               rejects (integer): the total number of rejected messages with this tag
               complaints (integer): the total number of spam complaints received for messages with this tag
               unsubs (integer): the total number of unsubscribe requests received for messages with this tag
               opens (integer): the total number of times messages with this tag have been opened
               clicks (integer): the total number of times tracked URLs in messages with this tag have been clicked
               stats (struct): an aggregate summary of the tag's sending stats::
                   stats.today (struct): stats with this tag so far today::
                       stats.today.sent (integer): the number of emails sent with this tag so far today
                       stats.today.hard_bounces (integer): the number of emails hard bounced with this tag so far today
                       stats.today.soft_bounces (integer): the number of emails soft bounced with this tag so far today
                       stats.today.rejects (integer): the number of emails rejected for sending this tag so far today
                       stats.today.complaints (integer): the number of spam complaints with this tag so far today
                       stats.today.unsubs (integer): the number of unsubscribes with this tag so far today
                       stats.today.opens (integer): the number of times emails have been opened with this tag so far today
                       stats.today.unique_opens (integer): the number of unique opens for emails sent with this tag so far today
                       stats.today.clicks (integer): the number of URLs that have been clicked with this tag so far today
                       stats.today.unique_clicks (integer): the number of unique clicks for emails sent with this tag so far today

                   stats.last_7_days (struct): stats with this tag in the last 7 days::
                       stats.last_7_days.sent (integer): the number of emails sent with this tag in the last 7 days
                       stats.last_7_days.hard_bounces (integer): the number of emails hard bounced with this tag in the last 7 days
                       stats.last_7_days.soft_bounces (integer): the number of emails soft bounced with this tag in the last 7 days
                       stats.last_7_days.rejects (integer): the number of emails rejected for sending this tag in the last 7 days
                       stats.last_7_days.complaints (integer): the number of spam complaints with this tag in the last 7 days
                       stats.last_7_days.unsubs (integer): the number of unsubscribes with this tag in the last 7 days
                       stats.last_7_days.opens (integer): the number of times emails have been opened with this tag in the last 7 days
                       stats.last_7_days.unique_opens (integer): the number of unique opens for emails sent with this tag in the last 7 days
                       stats.last_7_days.clicks (integer): the number of URLs that have been clicked with this tag in the last 7 days
                       stats.last_7_days.unique_clicks (integer): the number of unique clicks for emails sent with this tag in the last 7 days

                   stats.last_30_days (struct): stats with this tag in the last 30 days::
                       stats.last_30_days.sent (integer): the number of emails sent with this tag in the last 30 days
                       stats.last_30_days.hard_bounces (integer): the number of emails hard bounced with this tag in the last 30 days
                       stats.last_30_days.soft_bounces (integer): the number of emails soft bounced with this tag in the last 30 days
                       stats.last_30_days.rejects (integer): the number of emails rejected for sending this tag in the last 30 days
                       stats.last_30_days.complaints (integer): the number of spam complaints with this tag in the last 30 days
                       stats.last_30_days.unsubs (integer): the number of unsubscribes with this tag in the last 30 days
                       stats.last_30_days.opens (integer): the number of times emails have been opened with this tag in the last 30 days
                       stats.last_30_days.unique_opens (integer): the number of unique opens for emails sent with this tag in the last 30 days
                       stats.last_30_days.clicks (integer): the number of URLs that have been clicked with this tag in the last 30 days
                       stats.last_30_days.unique_clicks (integer): the number of unique clicks for emails sent with this tag in the last 30 days

                   stats.last_60_days (struct): stats with this tag in the last 60 days::
                       stats.last_60_days.sent (integer): the number of emails sent with this tag in the last 60 days
                       stats.last_60_days.hard_bounces (integer): the number of emails hard bounced with this tag in the last 60 days
                       stats.last_60_days.soft_bounces (integer): the number of emails soft bounced with this tag in the last 60 days
                       stats.last_60_days.rejects (integer): the number of emails rejected for sending this tag in the last 60 days
                       stats.last_60_days.complaints (integer): the number of spam complaints with this tag in the last 60 days
                       stats.last_60_days.unsubs (integer): the number of unsubscribes with this tag in the last 60 days
                       stats.last_60_days.opens (integer): the number of times emails have been opened with this tag in the last 60 days
                       stats.last_60_days.unique_opens (integer): the number of unique opens for emails sent with this tag in the last 60 days
                       stats.last_60_days.clicks (integer): the number of URLs that have been clicked with this tag in the last 60 days
                       stats.last_60_days.unique_clicks (integer): the number of unique clicks for emails sent with this tag in the last 60 days

                   stats.last_90_days (struct): stats with this tag in the last 90 days::
                       stats.last_90_days.sent (integer): the number of emails sent with this tag in the last 90 days
                       stats.last_90_days.hard_bounces (integer): the number of emails hard bounced with this tag in the last 90 days
                       stats.last_90_days.soft_bounces (integer): the number of emails soft bounced with this tag in the last 90 days
                       stats.last_90_days.rejects (integer): the number of emails rejected for sending this tag in the last 90 days
                       stats.last_90_days.complaints (integer): the number of spam complaints with this tag in the last 90 days
                       stats.last_90_days.unsubs (integer): the number of unsubscribes with this tag in the last 90 days
                       stats.last_90_days.opens (integer): the number of times emails have been opened with this tag in the last 90 days
                       stats.last_90_days.unique_opens (integer): the number of unique opens for emails sent with this tag in the last 90 days
                       stats.last_90_days.clicks (integer): the number of URLs that have been clicked with this tag in the last 90 days
                       stats.last_90_days.unique_clicks (integer): the number of unique clicks for emails sent with this tag in the last 90 days



        Raises:
           InvalidTagNameError: The requested tag does not exist or contains invalid characters
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'tag': tag}
        return self.master.call('tags/info', _params)

    def time_series(self, tag):
        """Return the recent history (hourly stats for the last 30 days) for a tag

        Args:
           tag (string): an existing tag name

        Returns:
           array.  the array of history information::
               [] (struct): the stats for a single hour::
                   [].time (string): the hour as a UTC date string in YYYY-MM-DD HH:MM:SS format
                   [].sent (integer): the number of emails that were sent during the hour
                   [].hard_bounces (integer): the number of emails that hard bounced during the hour
                   [].soft_bounces (integer): the number of emails that soft bounced during the hour
                   [].rejects (integer): the number of emails that were rejected during the hour
                   [].complaints (integer): the number of spam complaints received during the hour
                   [].unsubs (integer): the number of unsubscribes received during the hour
                   [].opens (integer): the number of emails opened during the hour
                   [].unique_opens (integer): the number of unique opens generated by messages sent during the hour
                   [].clicks (integer): the number of tracked URLs clicked during the hour
                   [].unique_clicks (integer): the number of unique clicks generated by messages sent during the hour


        Raises:
           InvalidTagNameError: The requested tag does not exist or contains invalid characters
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'tag': tag}
        return self.master.call('tags/time-series', _params)

    def all_time_series(self, ):
        """Return the recent history (hourly stats for the last 30 days) for all tags

        Returns:
           array.  the array of history information::
               [] (struct): the stats for a single hour::
                   [].time (string): the hour as a UTC date string in YYYY-MM-DD HH:MM:SS format
                   [].sent (integer): the number of emails that were sent during the hour
                   [].hard_bounces (integer): the number of emails that hard bounced during the hour
                   [].soft_bounces (integer): the number of emails that soft bounced during the hour
                   [].rejects (integer): the number of emails that were rejected during the hour
                   [].complaints (integer): the number of spam complaints received during the hour
                   [].unsubs (integer): the number of unsubscribes received during the hour
                   [].opens (integer): the number of emails opened during the hour
                   [].unique_opens (integer): the number of unique opens generated by messages sent during the hour
                   [].clicks (integer): the number of tracked URLs clicked during the hour
                   [].unique_clicks (integer): the number of unique clicks generated by messages sent during the hour


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('tags/all-time-series', _params)


class Messages(object):
    def __init__(self, master):
        self.master = master

    def send(self, message, async=False, ip_pool=None, send_at=None):
        """Send a new transactional message through Mandrill

        Args:
           message (struct): the information on the message to send::
               message.html (string): the full HTML content to be sent
               message.text (string): optional full text content to be sent
               message.subject (string): the message subject
               message.from_email (string): the sender email address.
               message.from_name (string): optional from name to be used
               message.to (array): an array of recipient information.::
                   message.to[] (struct): a single recipient's information.::
                       message.to[].email (string): the email address of the recipient
                       message.to[].name (string): the optional display name to use for the recipient
                       message.to[].type (string): the header type to use for the recipient, defaults to "to" if not provided


               message.headers (struct): optional extra headers to add to the message (most headers are allowed)
               message.important (boolean): whether or not this message is important, and should be delivered ahead of non-important messages
               message.track_opens (boolean): whether or not to turn on open tracking for the message
               message.track_clicks (boolean): whether or not to turn on click tracking for the message
               message.auto_text (boolean): whether or not to automatically generate a text part for messages that are not given text
               message.auto_html (boolean): whether or not to automatically generate an HTML part for messages that are not given HTML
               message.inline_css (boolean): whether or not to automatically inline all CSS styles provided in the message HTML - only for HTML documents less than 256KB in size
               message.url_strip_qs (boolean): whether or not to strip the query string from URLs when aggregating tracked URL data
               message.preserve_recipients (boolean): whether or not to expose all recipients in to "To" header for each email
               message.view_content_link (boolean): set to false to remove content logging for sensitive emails
               message.bcc_address (string): an optional address to receive an exact copy of each recipient's email
               message.tracking_domain (string): a custom domain to use for tracking opens and clicks instead of mandrillapp.com
               message.signing_domain (string): a custom domain to use for SPF/DKIM signing instead of mandrill (for "via" or "on behalf of" in email clients)
               message.return_path_domain (string): a custom domain to use for the messages's return-path
               message.merge (boolean): whether to evaluate merge tags in the message. Will automatically be set to true if either merge_vars or global_merge_vars are provided.
               message.global_merge_vars (array): global merge variables to use for all recipients. You can override these per recipient.::
                   message.global_merge_vars[] (struct): a single global merge variable::
                       message.global_merge_vars[].name (string): the global merge variable's name. Merge variable names are case-insensitive and may not start with _
                       message.global_merge_vars[].content (string): the global merge variable's content


               message.merge_vars (array): per-recipient merge variables, which override global merge variables with the same name.::
                   message.merge_vars[] (struct): per-recipient merge variables::
                       message.merge_vars[].rcpt (string): the email address of the recipient that the merge variables should apply to
                       message.merge_vars[].vars (array): the recipient's merge variables::
                           message.merge_vars[].vars[] (struct): a single merge variable::
                               message.merge_vars[].vars[].name (string): the merge variable's name. Merge variable names are case-insensitive and may not start with _
                               message.merge_vars[].vars[].content (string): the merge variable's content




               message.tags (array): an array of string to tag the message with.  Stats are accumulated using tags, though we only store the first 100 we see, so this should not be unique or change frequently.  Tags should be 50 characters or less.  Any tags starting with an underscore are reserved for internal use and will cause errors.::
                   message.tags[] (string): a single tag - must not start with an underscore

               message.subaccount (string): the unique id of a subaccount for this message - must already exist or will fail with an error
               message.google_analytics_domains (array): an array of strings indicating for which any matching URLs will automatically have Google Analytics parameters appended to their query string automatically.
               message.google_analytics_campaign (array|string): optional string indicating the value to set for the utm_campaign tracking parameter. If this isn't provided the email's from address will be used instead.
               message.metadata (array): metadata an associative array of user metadata. Mandrill will store this metadata and make it available for retrieval. In addition, you can select up to 10 metadata fields to index and make searchable using the Mandrill search api.
               message.recipient_metadata (array): Per-recipient metadata that will override the global values specified in the metadata parameter.::
                   message.recipient_metadata[] (struct): metadata for a single recipient::
                       message.recipient_metadata[].rcpt (string): the email address of the recipient that the metadata is associated with
                       message.recipient_metadata[].values (array): an associated array containing the recipient's unique metadata. If a key exists in both the per-recipient metadata and the global metadata, the per-recipient metadata will be used.


               message.attachments (array): an array of supported attachments to add to the message::
                   message.attachments[] (struct): a single supported attachment::
                       message.attachments[].type (string): the MIME type of the attachment
                       message.attachments[].name (string): the file name of the attachment
                       message.attachments[].content (string): the content of the attachment as a base64-encoded string


               message.images (array): an array of embedded images to add to the message::
                   message.images[] (struct): a single embedded image::
                       message.images[].type (string): the MIME type of the image - must start with "image/"
                       message.images[].name (string): the Content ID of the image - use <img src="cid:THIS_VALUE"> to reference the image in your HTML content
                       message.images[].content (string): the content of the image as a base64-encoded string


           async (boolean): enable a background sending mode that is optimized for bulk sending. In async mode, messages/send will immediately return a status of "queued" for every recipient. To handle rejections when sending in async mode, set up a webhook for the 'reject' event. Defaults to false for messages with no more than 10 recipients; messages with more than 10 recipients are always sent asynchronously, regardless of the value of async.
           ip_pool (string): the name of the dedicated ip pool that should be used to send the message. If you do not have any dedicated IPs, this parameter has no effect. If you specify a pool that does not exist, your default pool will be used instead.
           send_at (string): when this message should be sent as a UTC timestamp in YYYY-MM-DD HH:MM:SS format. If you specify a time in the past, the message will be sent immediately. An additional fee applies for scheduled email, and this feature is only available to accounts with a positive balance.

        Returns:
           array.  of structs for each recipient containing the key "email" with the email address and "status" as either "sent", "queued", or "rejected"::
               [] (struct): the sending results for a single recipient::
                   [].email (string): the email address of the recipient
                   [].status (string): the sending status of the recipient - either "sent", "queued", "scheduled", "rejected", or "invalid"
                   [].reject_reason (string): the reason for the rejection if the recipient status is "rejected"
                   []._id (string): the message's unique id


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           PaymentRequiredError: The requested feature requires payment.
           UnknownSubaccountError: The provided subaccount id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'message': message, 'async': async, 'ip_pool': ip_pool, 'send_at': send_at}
        return self.master.call('messages/send', _params)

    def send_template(self, template_name, template_content, message, async=False, ip_pool=None, send_at=None):
        """Send a new transactional message through Mandrill using a template

        Args:
           template_name (string): the immutable name or slug of a template that exists in the user's account. For backwards-compatibility, the template name may also be used but the immutable slug is preferred.
           template_content (array): an array of template content to send.  Each item in the array should be a struct with two keys - name: the name of the content block to set the content for, and content: the actual content to put into the block::
               template_content[] (struct): the injection of a single piece of content into a single editable region::
                   template_content[].name (string): the name of the mc:edit editable region to inject into
                   template_content[].content (string): the content to inject

           message (struct): the other information on the message to send - same as /messages/send, but without the html content::
               message.html (string): optional full HTML content to be sent if not in template
               message.text (string): optional full text content to be sent
               message.subject (string): the message subject
               message.from_email (string): the sender email address.
               message.from_name (string): optional from name to be used
               message.to (array): an array of recipient information.::
                   message.to[] (struct): a single recipient's information.::
                       message.to[].email (string): the email address of the recipient
                       message.to[].name (string): the optional display name to use for the recipient
                       message.to[].type (string): the header type to use for the recipient, defaults to "to" if not provided


               message.headers (struct): optional extra headers to add to the message (most headers are allowed)
               message.important (boolean): whether or not this message is important, and should be delivered ahead of non-important messages
               message.track_opens (boolean): whether or not to turn on open tracking for the message
               message.track_clicks (boolean): whether or not to turn on click tracking for the message
               message.auto_text (boolean): whether or not to automatically generate a text part for messages that are not given text
               message.auto_html (boolean): whether or not to automatically generate an HTML part for messages that are not given HTML
               message.inline_css (boolean): whether or not to automatically inline all CSS styles provided in the message HTML - only for HTML documents less than 256KB in size
               message.url_strip_qs (boolean): whether or not to strip the query string from URLs when aggregating tracked URL data
               message.preserve_recipients (boolean): whether or not to expose all recipients in to "To" header for each email
               message.view_content_link (boolean): set to false to remove content logging for sensitive emails
               message.bcc_address (string): an optional address to receive an exact copy of each recipient's email
               message.tracking_domain (string): a custom domain to use for tracking opens and clicks instead of mandrillapp.com
               message.signing_domain (string): a custom domain to use for SPF/DKIM signing instead of mandrill (for "via" or "on behalf of" in email clients)
               message.return_path_domain (string): a custom domain to use for the messages's return-path
               message.merge (boolean): whether to evaluate merge tags in the message. Will automatically be set to true if either merge_vars or global_merge_vars are provided.
               message.global_merge_vars (array): global merge variables to use for all recipients. You can override these per recipient.::
                   message.global_merge_vars[] (struct): a single global merge variable::
                       message.global_merge_vars[].name (string): the global merge variable's name. Merge variable names are case-insensitive and may not start with _
                       message.global_merge_vars[].content (string): the global merge variable's content


               message.merge_vars (array): per-recipient merge variables, which override global merge variables with the same name.::
                   message.merge_vars[] (struct): per-recipient merge variables::
                       message.merge_vars[].rcpt (string): the email address of the recipient that the merge variables should apply to
                       message.merge_vars[].vars (array): the recipient's merge variables::
                           message.merge_vars[].vars[] (struct): a single merge variable::
                               message.merge_vars[].vars[].name (string): the merge variable's name. Merge variable names are case-insensitive and may not start with _
                               message.merge_vars[].vars[].content (string): the merge variable's content




               message.tags (array): an array of string to tag the message with.  Stats are accumulated using tags, though we only store the first 100 we see, so this should not be unique or change frequently.  Tags should be 50 characters or less.  Any tags starting with an underscore are reserved for internal use and will cause errors.::
                   message.tags[] (string): a single tag - must not start with an underscore

               message.subaccount (string): the unique id of a subaccount for this message - must already exist or will fail with an error
               message.google_analytics_domains (array): an array of strings indicating for which any matching URLs will automatically have Google Analytics parameters appended to their query string automatically.
               message.google_analytics_campaign (array|string): optional string indicating the value to set for the utm_campaign tracking parameter. If this isn't provided the email's from address will be used instead.
               message.metadata (array): metadata an associative array of user metadata. Mandrill will store this metadata and make it available for retrieval. In addition, you can select up to 10 metadata fields to index and make searchable using the Mandrill search api.
               message.recipient_metadata (array): Per-recipient metadata that will override the global values specified in the metadata parameter.::
                   message.recipient_metadata[] (struct): metadata for a single recipient::
                       message.recipient_metadata[].rcpt (string): the email address of the recipient that the metadata is associated with
                       message.recipient_metadata[].values (array): an associated array containing the recipient's unique metadata. If a key exists in both the per-recipient metadata and the global metadata, the per-recipient metadata will be used.


               message.attachments (array): an array of supported attachments to add to the message::
                   message.attachments[] (struct): a single supported attachment::
                       message.attachments[].type (string): the MIME type of the attachment
                       message.attachments[].name (string): the file name of the attachment
                       message.attachments[].content (string): the content of the attachment as a base64-encoded string


               message.images (array): an array of embedded images to add to the message::
                   message.images[] (struct): a single embedded image::
                       message.images[].type (string): the MIME type of the image - must start with "image/"
                       message.images[].name (string): the Content ID of the image - use <img src="cid:THIS_VALUE"> to reference the image in your HTML content
                       message.images[].content (string): the content of the image as a base64-encoded string


           async (boolean): enable a background sending mode that is optimized for bulk sending. In async mode, messages/send will immediately return a status of "queued" for every recipient. To handle rejections when sending in async mode, set up a webhook for the 'reject' event. Defaults to false for messages with no more than 10 recipients; messages with more than 10 recipients are always sent asynchronously, regardless of the value of async.
           ip_pool (string): the name of the dedicated ip pool that should be used to send the message. If you do not have any dedicated IPs, this parameter has no effect. If you specify a pool that does not exist, your default pool will be used instead.
           send_at (string): when this message should be sent as a UTC timestamp in YYYY-MM-DD HH:MM:SS format. If you specify a time in the past, the message will be sent immediately. An additional fee applies for scheduled email, and this feature is only available to accounts with a positive balance.

        Returns:
           array.  of structs for each recipient containing the key "email" with the email address and "status" as either "sent", "queued", "scheduled", or "rejected"::
               [] (struct): the sending results for a single recipient::
                   [].email (string): the email address of the recipient
                   [].status (string): the sending status of the recipient - either "sent", "queued", "rejected", or "invalid"
                   [].reject_reason (string): the reason for the rejection if the recipient status is "rejected"
                   []._id (string): the message's unique id


        Raises:
           UnknownTemplateError: The requested template does not exist
           PaymentRequiredError: The requested feature requires payment.
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownSubaccountError: The provided subaccount id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'template_name': template_name, 'template_content': template_content, 'message': message, 'async': async, 'ip_pool': ip_pool, 'send_at': send_at}
        return self.master.call('messages/send-template', _params)

    def search(self, query='*', date_from=None, date_to=None, tags=None, senders=None, api_keys=None, limit=100):
        """Search the content of recently sent messages and optionally narrow by date range, tags and senders

        Args:
           query (string): the search terms to find matching messages for
           date_from (string): start date
           date_to (string): end date
           tags (array): an array of tag names to narrow the search to, will return messages that contain ANY of the tags
           senders (array): an array of sender addresses to narrow the search to, will return messages sent by ANY of the senders
           api_keys (array): an array of API keys to narrow the search to, will return messages sent by ANY of the keys
           limit (integer): the maximum number of results to return, defaults to 100, 1000 is the maximum

        Returns:
           array.  of structs for each matching message::
               [] (struct): the information for a single matching message::
                   [].ts (integer): the Unix timestamp from when this message was sent
                   []._id (string): the message's unique id
                   [].sender (string): the email address of the sender
                   [].template (string): the unique name of the template used, if any
                   [].subject (string): the message's subject line
                   [].email (string): the recipient email address
                   [].tags (array): list of tags on this message::
                       [].tags[] (string): individual tag on this message

                   [].opens (integer): how many times has this message been opened
                   [].opens_detail (array): list of individual opens for the message::
                       [].opens_detail[] (struct): information on an individual open::
                           [].opens_detail[].ts (integer): the unix timestamp from when the message was opened
                           [].opens_detail[].ip (string): the IP address that generated the open
                           [].opens_detail[].location (string): the approximate region and country that the opening IP is located
                           [].opens_detail[].ua (string): the email client or browser data of the open


                   [].clicks (integer): how many times has a link been clicked in this message
                   [].clicks_detail (array): list of individual clicks for the message::
                       [].clicks_detail[] (struct): information on an individual click::
                           [].clicks_detail[].ts (integer): the unix timestamp from when the message was clicked
                           [].clicks_detail[].url (string): the URL that was clicked on
                           [].clicks_detail[].ip (string): the IP address that generated the click
                           [].clicks_detail[].location (string): the approximate region and country that the clicking IP is located
                           [].clicks_detail[].ua (string): the email client or browser data of the click


                   [].state (string): sending status of this message: sent, bounced, rejected
                   [].metadata (struct): any custom metadata provided when the message was sent

               smtp_events (array): a log of up to 3 smtp events for the message::
                   smtp_events[] (struct): information about a specific smtp event::
                       smtp_events[].ts (integer): the Unix timestamp when the event occured
                       smtp_events[].type (string): the message's state as a result of this event
                       smtp_events[].diag (string): the SMTP response from the recipient's server



        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           ServiceUnavailableError: The subsystem providing this API call is down for maintenance
           Error: A general Mandrill error has occurred
        """
        _params = {'query': query, 'date_from': date_from, 'date_to': date_to, 'tags': tags, 'senders': senders, 'api_keys': api_keys, 'limit': limit}
        return self.master.call('messages/search', _params)

    def search_time_series(self, query='*', date_from=None, date_to=None, tags=None, senders=None):
        """Search the content of recently sent messages and return the aggregated hourly stats for matching messages

        Args:
           query (string): the search terms to find matching messages for
           date_from (string): start date
           date_to (string): end date
           tags (array): an array of tag names to narrow the search to, will return messages that contain ANY of the tags
           senders (array): an array of sender addresses to narrow the search to, will return messages sent by ANY of the senders

        Returns:
           array.  the array of history information::
               [] (struct): the stats for a single hour::
                   [].time (string): the hour as a UTC date string in YYYY-MM-DD HH:MM:SS format
                   [].sent (integer): the number of emails that were sent during the hour
                   [].hard_bounces (integer): the number of emails that hard bounced during the hour
                   [].soft_bounces (integer): the number of emails that soft bounced during the hour
                   [].rejects (integer): the number of emails that were rejected during the hour
                   [].complaints (integer): the number of spam complaints received during the hour
                   [].unsubs (integer): the number of unsubscribes received during the hour
                   [].opens (integer): the number of emails opened during the hour
                   [].unique_opens (integer): the number of unique opens generated by messages sent during the hour
                   [].clicks (integer): the number of tracked URLs clicked during the hour
                   [].unique_clicks (integer): the number of unique clicks generated by messages sent during the hour


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           ServiceUnavailableError: The subsystem providing this API call is down for maintenance
           Error: A general Mandrill error has occurred
        """
        _params = {'query': query, 'date_from': date_from, 'date_to': date_to, 'tags': tags, 'senders': senders}
        return self.master.call('messages/search-time-series', _params)

    def info(self, id):
        """Get the information for a single recently sent message

        Args:
           id (string): the unique id of the message to get - passed as the "_id" field in webhooks, send calls, or search calls

        Returns:
           struct.  the information for the message::
               ts (integer): the Unix timestamp from when this message was sent
               _id (string): the message's unique id
               sender (string): the email address of the sender
               template (string): the unique name of the template used, if any
               subject (string): the message's subject line
               email (string): the recipient email address
               tags (array): list of tags on this message::
                   tags[] (string): individual tag on this message

               opens (integer): how many times has this message been opened
               opens_detail (array): list of individual opens for the message::
                   opens_detail[] (struct): information on an individual open::
                       opens_detail[].ts (integer): the unix timestamp from when the message was opened
                       opens_detail[].ip (string): the IP address that generated the open
                       opens_detail[].location (string): the approximate region and country that the opening IP is located
                       opens_detail[].ua (string): the email client or browser data of the open


               clicks (integer): how many times has a link been clicked in this message
               clicks_detail (array): list of individual clicks for the message::
                   clicks_detail[] (struct): information on an individual click::
                       clicks_detail[].ts (integer): the unix timestamp from when the message was clicked
                       clicks_detail[].url (string): the URL that was clicked on
                       clicks_detail[].ip (string): the IP address that generated the click
                       clicks_detail[].location (string): the approximate region and country that the clicking IP is located
                       clicks_detail[].ua (string): the email client or browser data of the click


               state (string): sending status of this message: sent, bounced, rejected
               metadata (struct): any custom metadata provided when the message was sent
               smtp_events (array): a log of up to 3 smtp events for the message::
                   smtp_events[] (struct): information about a specific smtp event::
                       smtp_events[].ts (integer): the Unix timestamp when the event occured
                       smtp_events[].type (string): the message's state as a result of this event
                       smtp_events[].diag (string): the SMTP response from the recipient's server



        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownMessageError: The provided message id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id}
        return self.master.call('messages/info', _params)

    def content(self, id):
        """Get the full content of a recently sent message

        Args:
           id (string): the unique id of the message to get - passed as the "_id" field in webhooks, send calls, or search calls

        Returns:
           struct.  the content of the message::
               ts (integer): the Unix timestamp from when this message was sent
               _id (string): the message's unique id
               from_email (string): the email address of the sender
               from_name (string): the alias of the sender (if any)
               subject (string): the message's subject line
               to (struct): the message recipient's information::
                   to.email (string): the email address of the recipient
                   to.name (string): the alias of the recipient (if any)

               tags (array): list of tags on this message::
                   tags[] (string): individual tag on this message

               headers (struct): the key-value pairs of the custom MIME headers for the message's main document
               text (string): the text part of the message, if any
               html (string): the HTML part of the message, if any
               attachments (array): an array of any attachments that can be found in the message::
                   attachments[] (struct): information about an individual attachment::
                       attachments[].name (string): the file name of the attachment
                       attachments[].type (string): the MIME type of the attachment
                       attachments[].content (string): the content of the attachment as a base64 encoded string



        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownMessageError: The provided message id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id}
        return self.master.call('messages/content', _params)

    def parse(self, raw_message):
        """Parse the full MIME document for an email message, returning the content of the message broken into its constituent pieces

        Args:
           raw_message (string): the full MIME document of an email message

        Returns:
           struct.  the parsed message::
               subject (string): the subject of the message
               from_email (string): the email address of the sender
               from_name (string): the alias of the sender (if any)
               to (array): an array of any recipients in the message::
                   to[] (struct): the information on a single recipient::
                       to[].email (string): the email address of the recipient
                       to[].name (string): the alias of the recipient (if any)


               headers (struct): the key-value pairs of the MIME headers for the message's main document
               text (string): the text part of the message, if any
               html (string): the HTML part of the message, if any
               attachments (array): an array of any attachments that can be found in the message::
                   attachments[] (struct): information about an individual attachment::
                       attachments[].name (string): the file name of the attachment
                       attachments[].type (string): the MIME type of the attachment
                       attachments[].binary (boolean): if this is set to true, the attachment is not pure-text, and the content will be base64 encoded
                       attachments[].content (string): the content of the attachment as a text string or a base64 encoded string based on the attachment type


               images (array): an array of any embedded images that can be found in the message::
                   images[] (struct): information about an individual image::
                       images[].name (string): the Content-ID of the embedded image
                       images[].type (string): the MIME type of the image
                       images[].content (string): the content of the image as a base64 encoded string



        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'raw_message': raw_message}
        return self.master.call('messages/parse', _params)

    def send_raw(self, raw_message, from_email=None, from_name=None, to=None, async=False, ip_pool=None, send_at=None, return_path_domain=None):
        """Take a raw MIME document for a message, and send it exactly as if it were sent through Mandrill's SMTP servers

        Args:
           raw_message (string): the full MIME document of an email message
           from_email (string|null): optionally define the sender address - otherwise we'll use the address found in the provided headers
           from_name (string|null): optionally define the sender alias
           to (array|null): optionally define the recipients to receive the message - otherwise we'll use the To, Cc, and Bcc headers provided in the document::
               to[] (string): the email address of the recipient
           async (boolean): enable a background sending mode that is optimized for bulk sending. In async mode, messages/sendRaw will immediately return a status of "queued" for every recipient. To handle rejections when sending in async mode, set up a webhook for the 'reject' event. Defaults to false for messages with no more than 10 recipients; messages with more than 10 recipients are always sent asynchronously, regardless of the value of async.
           ip_pool (string): the name of the dedicated ip pool that should be used to send the message. If you do not have any dedicated IPs, this parameter has no effect. If you specify a pool that does not exist, your default pool will be used instead.
           send_at (string): when this message should be sent as a UTC timestamp in YYYY-MM-DD HH:MM:SS format. If you specify a time in the past, the message will be sent immediately.
           return_path_domain (string): a custom domain to use for the messages's return-path

        Returns:
           array.  of structs for each recipient containing the key "email" with the email address and "status" as either "sent", "queued", or "rejected"::
               [] (struct): the sending results for a single recipient::
                   [].email (string): the email address of the recipient
                   [].status (string): the sending status of the recipient - either "sent", "queued", "scheduled", "rejected", or "invalid"
                   [].reject_reason (string): the reason for the rejection if the recipient status is "rejected"
                   []._id (string): the message's unique id


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           PaymentRequiredError: The requested feature requires payment.
           UnknownTemplateError: The requested template does not exist
           UnknownSubaccountError: The provided subaccount id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'raw_message': raw_message, 'from_email': from_email, 'from_name': from_name, 'to': to, 'async': async, 'ip_pool': ip_pool, 'send_at': send_at, 'return_path_domain': return_path_domain}
        return self.master.call('messages/send-raw', _params)

    def list_scheduled(self, to=None):
        """Queries your scheduled emails by sender or recipient, or both.

        Args:
           to (string): an optional recipient address to restrict results to

        Returns:
           array.  a list of up to 1000 scheduled emails::
               [] (struct): a scheduled email::
                   []._id (string): the scheduled message id
                   [].created_at (string): the UTC timestamp when the message was created, in YYYY-MM-DD HH:MM:SS format
                   [].send_at (string): the UTC timestamp when the message will be sent, in YYYY-MM-DD HH:MM:SS format
                   [].from_email (string): the email's sender address
                   [].to (string): the email's recipient
                   [].subject (string): the email's subject


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'to': to}
        return self.master.call('messages/list-scheduled', _params)

    def cancel_scheduled(self, id):
        """Cancels a scheduled email.

        Args:
           id (string): a scheduled email id, as returned by any of the messages/send calls or messages/list-scheduled

        Returns:
           struct.  information about the scheduled email that was cancelled.::
               _id (string): the scheduled message id
               created_at (string): the UTC timestamp when the message was created, in YYYY-MM-DD HH:MM:SS format
               send_at (string): the UTC timestamp when the message will be sent, in YYYY-MM-DD HH:MM:SS format
               from_email (string): the email's sender address
               to (string): the email's recipient
               subject (string): the email's subject

        Raises:
           UnknownMessageError: The provided message id does not exist.
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id}
        return self.master.call('messages/cancel-scheduled', _params)

    def reschedule(self, id, send_at):
        """Reschedules a scheduled email.

        Args:
           id (string): a scheduled email id, as returned by any of the messages/send calls or messages/list-scheduled
           send_at (string): the new UTC timestamp when the message should sent. Mandrill can't time travel, so if you specify a time in past the message will be sent immediately

        Returns:
           struct.  information about the scheduled email that was rescheduled.::
               _id (string): the scheduled message id
               created_at (string): the UTC timestamp when the message was created, in YYYY-MM-DD HH:MM:SS format
               send_at (string): the UTC timestamp when the message will be sent, in YYYY-MM-DD HH:MM:SS format
               from_email (string): the email's sender address
               to (string): the email's recipient
               subject (string): the email's subject

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownMessageError: The provided message id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id, 'send_at': send_at}
        return self.master.call('messages/reschedule', _params)


class Whitelists(object):
    def __init__(self, master):
        self.master = master

    def add(self, email):
        """Adds an email to your email rejection whitelist. If the address is
currently on your blacklist, that blacklist entry will be removed
automatically.

        Args:
           email (string): an email address to add to the whitelist

        Returns:
           struct.  a status object containing the address and the result of the operation::
               email (string): the email address you provided
               whether (boolean): the operation succeeded

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'email': email}
        return self.master.call('whitelists/add', _params)

    def list(self, email=None):
        """Retrieves your email rejection whitelist. You can provide an email
address or search prefix to limit the results. Returns up to 1000 results.

        Args:
           email (string): an optional email address or prefix to search by

        Returns:
           array.  up to 1000 whitelist entries::
               [] (struct): the information for each whitelist entry::
                   [].email (string): the email that is whitelisted
                   [].detail (string): a description of why the email was whitelisted
                   [].created_at (string): when the email was added to the whitelist


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'email': email}
        return self.master.call('whitelists/list', _params)

    def delete(self, email):
        """Removes an email address from the whitelist.

        Args:
           email (string): the email address to remove from the whitelist

        Returns:
           struct.  a status object containing the address and whether the deletion succeeded::
               email (string): the email address that was removed from the blacklist
               deleted (boolean): whether the address was deleted successfully

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'email': email}
        return self.master.call('whitelists/delete', _params)


class Ips(object):
    def __init__(self, master):
        self.master = master

    def list(self, ):
        """Lists your dedicated IPs.

        Returns:
           array.  an array of structs for each dedicated IP::
               [] (struct): information about a single dedicated IP::
                   [].ip (string): the ip address
                   [].created_at (string): the date and time that the dedicated IP was created as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].pool (string): the name of the pool that this dedicated IP belongs to
                   [].domain (string): the domain name (reverse dns) of this dedicated IP
                   [].custom_dns (struct): information about the ip's custom dns, if it has been configured::
                       [].custom_dns.enabled (boolean): a boolean indicating whether custom dns has been configured for this ip
                       [].custom_dns.valid (boolean): whether the ip's custom dns is currently valid
                       [].custom_dns.error (string): if the ip's custom dns is invalid, this will include details about the error

                   [].warmup (struct): information about the ip's warmup status::
                       [].warmup.warming_up (boolean): whether the ip is currently in warmup mode
                       [].warmup.start_at (string): the start time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format
                       [].warmup.end_at (string): the end date and time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format



        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('ips/list', _params)

    def info(self, ip):
        """Retrieves information about a single dedicated ip.

        Args:
           ip (string): a dedicated IP address

        Returns:
           struct.  Information about the dedicated ip::
               ip (string): the ip address
               created_at (string): the date and time that the dedicated IP was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               pool (string): the name of the pool that this dedicated IP belongs to
               domain (string): the domain name (reverse dns) of this dedicated IP
               custom_dns (struct): information about the ip's custom dns, if it has been configured::
                   custom_dns.enabled (boolean): a boolean indicating whether custom dns has been configured for this ip
                   custom_dns.valid (boolean): whether the ip's custom dns is currently valid
                   custom_dns.error (string): if the ip's custom dns is invalid, this will include details about the error

               warmup (struct): information about the ip's warmup status::
                   warmup.warming_up (boolean): whether the ip is currently in warmup mode
                   warmup.start_at (string): the start time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format
                   warmup.end_at (string): the end date and time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'ip': ip}
        return self.master.call('ips/info', _params)

    def provision(self, warmup=False, pool=None):
        """Requests an additional dedicated IP for your account. Accounts may
have one outstanding request at any time, and provisioning requests
are processed within 24 hours.

        Args:
           warmup (boolean): whether to enable warmup mode for the ip
           pool (string): the id of the pool to add the dedicated ip to, or null to use your account's default pool

        Returns:
           struct.  a description of the provisioning request that was created::
               requested_at (string): the date and time that the request was created as a UTC timestamp in YYYY-MM-DD HH:MM:SS format

        Raises:
           IPProvisionLimitError: A dedicated IP cannot be provisioned while another request is pending.
           UnknownPoolError: The provided dedicated IP pool does not exist.
           PaymentRequiredError: The requested feature requires payment.
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           NoSendingHistoryError: The user hasn't started sending yet.
           PoorReputationError: The user's reputation is too low to continue.
           Error: A general Mandrill error has occurred
        """
        _params = {'warmup': warmup, 'pool': pool}
        return self.master.call('ips/provision', _params)

    def start_warmup(self, ip):
        """Begins the warmup process for a dedicated IP. During the warmup process,
Mandrill will gradually increase the percentage of your mail that is sent over
the warming-up IP, over a period of roughly 30 days. The rest of your mail
will be sent over shared IPs or other dedicated IPs in the same pool.

        Args:
           ip (string): a dedicated ip address

        Returns:
           struct.  Information about the dedicated IP::
               ip (string): the ip address
               created_at (string): the date and time that the dedicated IP was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               pool (string): the name of the pool that this dedicated IP belongs to
               domain (string): the domain name (reverse dns) of this dedicated IP
               custom_dns (struct): information about the ip's custom dns, if it has been configured::
                   custom_dns.enabled (boolean): a boolean indicating whether custom dns has been configured for this ip
                   custom_dns.valid (boolean): whether the ip's custom dns is currently valid
                   custom_dns.error (string): if the ip's custom dns is invalid, this will include details about the error

               warmup (struct): information about the ip's warmup status::
                   warmup.warming_up (boolean): whether the ip is currently in warmup mode
                   warmup.start_at (string): the start time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format
                   warmup.end_at (string): the end date and time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format


        Raises:
           UnknownIPError: The provided dedicated IP does not exist.
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'ip': ip}
        return self.master.call('ips/start-warmup', _params)

    def cancel_warmup(self, ip):
        """Cancels the warmup process for a dedicated IP.

        Args:
           ip (string): a dedicated ip address

        Returns:
           struct.  Information about the dedicated IP::
               ip (string): the ip address
               created_at (string): the date and time that the dedicated IP was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               pool (string): the name of the pool that this dedicated IP belongs to
               domain (string): the domain name (reverse dns) of this dedicated IP
               custom_dns (struct): information about the ip's custom dns, if it has been configured::
                   custom_dns.enabled (boolean): a boolean indicating whether custom dns has been configured for this ip
                   custom_dns.valid (boolean): whether the ip's custom dns is currently valid
                   custom_dns.error (string): if the ip's custom dns is invalid, this will include details about the error

               warmup (struct): information about the ip's warmup status::
                   warmup.warming_up (boolean): whether the ip is currently in warmup mode
                   warmup.start_at (string): the start time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format
                   warmup.end_at (string): the end date and time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format


        Raises:
           UnknownIPError: The provided dedicated IP does not exist.
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'ip': ip}
        return self.master.call('ips/cancel-warmup', _params)

    def set_pool(self, ip, pool, create_pool=False):
        """Moves a dedicated IP to a different pool.

        Args:
           ip (string): a dedicated ip address
           pool (string): the name of the new pool to add the dedicated ip to
           create_pool (boolean): whether to create the pool if it does not exist; if false and the pool does not exist, an Unknown_Pool will be thrown.

        Returns:
           struct.  Information about the updated state of the dedicated IP::
               ip (string): the ip address
               created_at (string): the date and time that the dedicated IP was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               pool (string): the name of the pool that this dedicated IP belongs to
               domain (string): the domain name (reverse dns) of this dedicated IP
               custom_dns (struct): information about the ip's custom dns, if it has been configured::
                   custom_dns.enabled (boolean): a boolean indicating whether custom dns has been configured for this ip
                   custom_dns.valid (boolean): whether the ip's custom dns is currently valid
                   custom_dns.error (string): if the ip's custom dns is invalid, this will include details about the error

               warmup (struct): information about the ip's warmup status::
                   warmup.warming_up (boolean): whether the ip is currently in warmup mode
                   warmup.start_at (string): the start time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format
                   warmup.end_at (string): the end date and time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format


        Raises:
           UnknownIPError: The provided dedicated IP does not exist.
           UnknownPoolError: The provided dedicated IP pool does not exist.
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           InvalidEmptyDefaultPoolError: You cannot remove the last IP from your default IP pool.
           Error: A general Mandrill error has occurred
        """
        _params = {'ip': ip, 'pool': pool, 'create_pool': create_pool}
        return self.master.call('ips/set-pool', _params)

    def delete(self, ip):
        """Deletes a dedicated IP. This is permanent and cannot be undone.

        Args:
           ip (string): the dedicated ip to remove from your account

        Returns:
           struct.  a description of the ip that was removed from your account.::
               ip (string): the ip address
               deleted (string): a boolean indicating whether the ip was successfully deleted

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'ip': ip}
        return self.master.call('ips/delete', _params)

    def list_pools(self, ):
        """Lists your dedicated IP pools.

        Returns:
           array.  the dedicated IP pools for your account, up to a maximum of 1,000::
               [] (struct): information about each dedicated IP pool::
                   [].name (string): this pool's name
                   [].created_at (string): the date and time that this pool was created as a UTC timestamp in YYYY-MM-DD HH:MM:SS format
                   [].ips (array): the dedicated IPs in this pool::
                       [].ips[] (struct): information about each dedicated IP::
                           [].ips[].ip (string): the ip address
                           [].ips[].created_at (string): the date and time that the dedicated IP was created as a UTC string in YYYY-MM-DD HH:MM:SS format
                           [].ips[].pool (string): the name of the pool that this dedicated IP belongs to
                           [].ips[].domain (string): the domain name (reverse dns) of this dedicated IP
                           [].ips[].custom_dns (struct): information about the ip's custom dns, if it has been configured::
                               [].ips[].custom_dns.enabled (boolean): a boolean indicating whether custom dns has been configured for this ip
                               [].ips[].custom_dns.valid (boolean): whether the ip's custom dns is currently valid
                               [].ips[].custom_dns.error (string): if the ip's custom dns is invalid, this will include details about the error

                           [].ips[].warmup (struct): information about the ip's warmup status::
                               [].ips[].warmup.warming_up (boolean): whether the ip is currently in warmup mode
                               [].ips[].warmup.start_at (string): the start time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format
                               [].ips[].warmup.end_at (string): the end date and time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format





        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('ips/list-pools', _params)

    def pool_info(self, pool):
        """Describes a single dedicated IP pool.

        Args:
           pool (string): a pool name

        Returns:
           struct.  Information about the dedicated ip pool::
               name (string): this pool's name
               created_at (string): the date and time that this pool was created as a UTC timestamp in YYYY-MM-DD HH:MM:SS format
               ips (array): the dedicated IPs in this pool::
                   ips[] (struct): information about each dedicated IP::
                       ips[].ip (string): the ip address
                       ips[].created_at (string): the date and time that the dedicated IP was created as a UTC string in YYYY-MM-DD HH:MM:SS format
                       ips[].pool (string): the name of the pool that this dedicated IP belongs to
                       ips[].domain (string): the domain name (reverse dns) of this dedicated IP
                       ips[].custom_dns (struct): information about the ip's custom dns, if it has been configured::
                           ips[].custom_dns.enabled (boolean): a boolean indicating whether custom dns has been configured for this ip
                           ips[].custom_dns.valid (boolean): whether the ip's custom dns is currently valid
                           ips[].custom_dns.error (string): if the ip's custom dns is invalid, this will include details about the error

                       ips[].warmup (struct): information about the ip's warmup status::
                           ips[].warmup.warming_up (boolean): whether the ip is currently in warmup mode
                           ips[].warmup.start_at (string): the start time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format
                           ips[].warmup.end_at (string): the end date and time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format




        Raises:
           UnknownPoolError: The provided dedicated IP pool does not exist.
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'pool': pool}
        return self.master.call('ips/pool-info', _params)

    def create_pool(self, pool):
        """Creates a pool and returns it. If a pool already exists with this
name, no action will be performed.

        Args:
           pool (string): the name of a pool to create

        Returns:
           struct.  Information about the dedicated ip pool::
               name (string): this pool's name
               created_at (string): the date and time that this pool was created as a UTC timestamp in YYYY-MM-DD HH:MM:SS format
               ips (array): the dedicated IPs in this pool::
                   ips[] (struct): information about each dedicated IP::
                       ips[].ip (string): the ip address
                       ips[].created_at (string): the date and time that the dedicated IP was created as a UTC string in YYYY-MM-DD HH:MM:SS format
                       ips[].pool (string): the name of the pool that this dedicated IP belongs to
                       ips[].domain (string): the domain name (reverse dns) of this dedicated IP
                       ips[].custom_dns (struct): information about the ip's custom dns, if it has been configured::
                           ips[].custom_dns.enabled (boolean): a boolean indicating whether custom dns has been configured for this ip
                           ips[].custom_dns.valid (boolean): whether the ip's custom dns is currently valid
                           ips[].custom_dns.error (string): if the ip's custom dns is invalid, this will include details about the error

                       ips[].warmup (struct): information about the ip's warmup status::
                           ips[].warmup.warming_up (boolean): whether the ip is currently in warmup mode
                           ips[].warmup.start_at (string): the start time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format
                           ips[].warmup.end_at (string): the end date and time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format




        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'pool': pool}
        return self.master.call('ips/create-pool', _params)

    def delete_pool(self, pool):
        """Deletes a pool. A pool must be empty before you can delete it, and you cannot delete your default pool.

        Args:
           pool (string): the name of the pool to delete

        Returns:
           struct.  information about the status of the pool that was deleted::
               pool (string): the name of the pool
               deleted (boolean): whether the pool was deleted

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownPoolError: The provided dedicated IP pool does not exist.
           InvalidDeleteDefaultPoolError: The default pool cannot be deleted.
           InvalidDeleteNonEmptyPoolError: Non-empty pools cannot be deleted.
           Error: A general Mandrill error has occurred
        """
        _params = {'pool': pool}
        return self.master.call('ips/delete-pool', _params)

    def check_custom_dns(self, ip, domain):
        """Tests whether a domain name is valid for use as the custom reverse
DNS for a dedicated IP.

        Args:
           ip (string): a dedicated ip address
           domain (string): the domain name to test

        Returns:
           struct.  validation results for the domain::
               valid (string): whether the domain name has a correctly-configured A record pointing to the ip address
               error (string): if valid is false, this will contain details about why the domain's A record is incorrect

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownIPError: The provided dedicated IP does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'ip': ip, 'domain': domain}
        return self.master.call('ips/check-custom-dns', _params)

    def set_custom_dns(self, ip, domain):
        """Configures the custom DNS name for a dedicated IP.

        Args:
           ip (string): a dedicated ip address
           domain (string): a domain name to set as the dedicated IP's custom dns name.

        Returns:
           struct.  information about the dedicated IP's new configuration::
               ip (string): the ip address
               created_at (string): the date and time that the dedicated IP was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               pool (string): the name of the pool that this dedicated IP belongs to
               domain (string): the domain name (reverse dns) of this dedicated IP
               custom_dns (struct): information about the ip's custom dns, if it has been configured::
                   custom_dns.enabled (boolean): a boolean indicating whether custom dns has been configured for this ip
                   custom_dns.valid (boolean): whether the ip's custom dns is currently valid
                   custom_dns.error (string): if the ip's custom dns is invalid, this will include details about the error

               warmup (struct): information about the ip's warmup status::
                   warmup.warming_up (boolean): whether the ip is currently in warmup mode
                   warmup.start_at (string): the start time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format
                   warmup.end_at (string): the end date and time for the warmup process as a UTC string in YYYY-MM-DD HH:MM:SS format


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownIPError: The provided dedicated IP does not exist.
           InvalidCustomDNSError: The domain name is not configured for use as the dedicated IP's custom reverse DNS.
           InvalidCustomDNSPendingError: A custom DNS change for this dedicated IP is currently pending.
           Error: A general Mandrill error has occurred
        """
        _params = {'ip': ip, 'domain': domain}
        return self.master.call('ips/set-custom-dns', _params)


class Internal(object):
    def __init__(self, master):
        self.master = master


class Subaccounts(object):
    def __init__(self, master):
        self.master = master

    def list(self, q=None):
        """Get the list of subaccounts defined for the account, optionally filtered by a prefix

        Args:
           q (string): an optional prefix to filter the subaccounts' ids and names

        Returns:
           array.  the subaccounts for the account, up to a maximum of 1,000::
               [] (struct): the individual subaccount info::
                   [].id (string): a unique indentifier for the subaccount
                   [].name (string): an optional display name for the subaccount
                   [].custom_quota (integer): an optional manual hourly quota for the subaccount. If not specified, the hourly quota will be managed based on reputation
                   [].status (string): the current sending status of the subaccount, one of "active" or "paused"
                   [].reputation (integer): the subaccount's current reputation on a scale from 0 to 100
                   [].created_at (string): the date and time that the subaccount was created as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].first_sent_at (string): the date and time that the subaccount first sent as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].sent_weekly (integer): the number of emails the subaccount has sent so far this week (weeks start on midnight Monday, UTC)
                   [].sent_monthly (integer): the number of emails the subaccount has sent so far this month (months start on midnight of the 1st, UTC)
                   [].sent_total (integer): the number of emails the subaccount has sent since it was created


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'q': q}
        return self.master.call('subaccounts/list', _params)

    def add(self, id, name=None, notes=None, custom_quota=None):
        """Add a new subaccount

        Args:
           id (string): a unique identifier for the subaccount to be used in sending calls
           name (string): an optional display name to further identify the subaccount
           notes (string): optional extra text to associate with the subaccount
           custom_quota (integer): an optional manual hourly quota for the subaccount. If not specified, Mandrill will manage this based on reputation

        Returns:
           struct.  the information saved about the new subaccount::
               id (string): a unique indentifier for the subaccount
               name (string): an optional display name for the subaccount
               custom_quota (integer): an optional manual hourly quota for the subaccount. If not specified, the hourly quota will be managed based on reputation
               status (string): the current sending status of the subaccount, one of "active" or "paused"
               reputation (integer): the subaccount's current reputation on a scale from 0 to 100
               created_at (string): the date and time that the subaccount was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               first_sent_at (string): the date and time that the subaccount first sent as a UTC string in YYYY-MM-DD HH:MM:SS format
               sent_weekly (integer): the number of emails the subaccount has sent so far this week (weeks start on midnight Monday, UTC)
               sent_monthly (integer): the number of emails the subaccount has sent so far this month (months start on midnight of the 1st, UTC)
               sent_total (integer): the number of emails the subaccount has sent since it was created

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id, 'name': name, 'notes': notes, 'custom_quota': custom_quota}
        return self.master.call('subaccounts/add', _params)

    def info(self, id):
        """Given the ID of an existing subaccount, return the data about it

        Args:
           id (string): the unique identifier of the subaccount to query

        Returns:
           struct.  the information about the subaccount::
               id (string): a unique indentifier for the subaccount
               name (string): an optional display name for the subaccount
               notes (string): optional extra text to associate with the subaccount
               custom_quota (integer): an optional manual hourly quota for the subaccount. If not specified, the hourly quota will be managed based on reputation
               status (string): the current sending status of the subaccount, one of "active" or "paused"
               reputation (integer): the subaccount's current reputation on a scale from 0 to 100
               created_at (string): the date and time that the subaccount was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               first_sent_at (string): the date and time that the subaccount first sent as a UTC string in YYYY-MM-DD HH:MM:SS format
               sent_weekly (integer): the number of emails the subaccount has sent so far this week (weeks start on midnight Monday, UTC)
               sent_monthly (integer): the number of emails the subaccount has sent so far this month (months start on midnight of the 1st, UTC)
               sent_total (integer): the number of emails the subaccount has sent since it was created
               sent_hourly (integer): the number of emails the subaccount has sent in the last hour
               hourly_quota (integer): the current hourly quota for the subaccount, either manual or reputation-based
               last_30_days (struct): stats for this subaccount in the last 30 days::
                   last_30_days.sent (integer): the number of emails sent for this subaccount in the last 30 days
                   last_30_days.hard_bounces (integer): the number of emails hard bounced for this subaccount in the last 30 days
                   last_30_days.soft_bounces (integer): the number of emails soft bounced for this subaccount in the last 30 days
                   last_30_days.rejects (integer): the number of emails rejected for sending this subaccount in the last 30 days
                   last_30_days.complaints (integer): the number of spam complaints for this subaccount in the last 30 days
                   last_30_days.unsubs (integer): the number of unsbuscribes for this subaccount in the last 30 days
                   last_30_days.opens (integer): the number of times emails have been opened for this subaccount in the last 30 days
                   last_30_days.unique_opens (integer): the number of unique opens for emails sent for this subaccount in the last 30 days
                   last_30_days.clicks (integer): the number of URLs that have been clicked for this subaccount in the last 30 days
                   last_30_days.unique_clicks (integer): the number of unique clicks for emails sent for this subaccount in the last 30 days


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownSubaccountError: The provided subaccount id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id}
        return self.master.call('subaccounts/info', _params)

    def update(self, id, name=None, notes=None, custom_quota=None):
        """Update an existing subaccount

        Args:
           id (string): the unique identifier of the subaccount to update
           name (string): an optional display name to further identify the subaccount
           notes (string): optional extra text to associate with the subaccount
           custom_quota (integer): an optional manual hourly quota for the subaccount. If not specified, Mandrill will manage this based on reputation

        Returns:
           struct.  the information for the updated subaccount::
               id (string): a unique indentifier for the subaccount
               name (string): an optional display name for the subaccount
               custom_quota (integer): an optional manual hourly quota for the subaccount. If not specified, the hourly quota will be managed based on reputation
               status (string): the current sending status of the subaccount, one of "active" or "paused"
               reputation (integer): the subaccount's current reputation on a scale from 0 to 100
               created_at (string): the date and time that the subaccount was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               first_sent_at (string): the date and time that the subaccount first sent as a UTC string in YYYY-MM-DD HH:MM:SS format
               sent_weekly (integer): the number of emails the subaccount has sent so far this week (weeks start on midnight Monday, UTC)
               sent_monthly (integer): the number of emails the subaccount has sent so far this month (months start on midnight of the 1st, UTC)
               sent_total (integer): the number of emails the subaccount has sent since it was created

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownSubaccountError: The provided subaccount id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id, 'name': name, 'notes': notes, 'custom_quota': custom_quota}
        return self.master.call('subaccounts/update', _params)

    def delete(self, id):
        """Delete an existing subaccount. Any email related to the subaccount will be saved, but stats will be removed and any future sending calls to this subaccount will fail.

        Args:
           id (string): the unique identifier of the subaccount to delete

        Returns:
           struct.  the information for the deleted subaccount::
               id (string): a unique indentifier for the subaccount
               name (string): an optional display name for the subaccount
               custom_quota (integer): an optional manual hourly quota for the subaccount. If not specified, the hourly quota will be managed based on reputation
               status (string): the current sending status of the subaccount, one of "active" or "paused"
               reputation (integer): the subaccount's current reputation on a scale from 0 to 100
               created_at (string): the date and time that the subaccount was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               first_sent_at (string): the date and time that the subaccount first sent as a UTC string in YYYY-MM-DD HH:MM:SS format
               sent_weekly (integer): the number of emails the subaccount has sent so far this week (weeks start on midnight Monday, UTC)
               sent_monthly (integer): the number of emails the subaccount has sent so far this month (months start on midnight of the 1st, UTC)
               sent_total (integer): the number of emails the subaccount has sent since it was created

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownSubaccountError: The provided subaccount id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id}
        return self.master.call('subaccounts/delete', _params)

    def pause(self, id):
        """Pause a subaccount's sending. Any future emails delivered to this subaccount will be queued for a maximum of 3 days until the subaccount is resumed.

        Args:
           id (string): the unique identifier of the subaccount to pause

        Returns:
           struct.  the information for the paused subaccount::
               id (string): a unique indentifier for the subaccount
               name (string): an optional display name for the subaccount
               custom_quota (integer): an optional manual hourly quota for the subaccount. If not specified, the hourly quota will be managed based on reputation
               status (string): the current sending status of the subaccount, one of "active" or "paused"
               reputation (integer): the subaccount's current reputation on a scale from 0 to 100
               created_at (string): the date and time that the subaccount was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               first_sent_at (string): the date and time that the subaccount first sent as a UTC string in YYYY-MM-DD HH:MM:SS format
               sent_weekly (integer): the number of emails the subaccount has sent so far this week (weeks start on midnight Monday, UTC)
               sent_monthly (integer): the number of emails the subaccount has sent so far this month (months start on midnight of the 1st, UTC)
               sent_total (integer): the number of emails the subaccount has sent since it was created

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownSubaccountError: The provided subaccount id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id}
        return self.master.call('subaccounts/pause', _params)

    def resume(self, id):
        """Resume a paused subaccount's sending

        Args:
           id (string): the unique identifier of the subaccount to resume

        Returns:
           struct.  the information for the resumed subaccount::
               id (string): a unique indentifier for the subaccount
               name (string): an optional display name for the subaccount
               custom_quota (integer): an optional manual hourly quota for the subaccount. If not specified, the hourly quota will be managed based on reputation
               status (string): the current sending status of the subaccount, one of "active" or "paused"
               reputation (integer): the subaccount's current reputation on a scale from 0 to 100
               created_at (string): the date and time that the subaccount was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               first_sent_at (string): the date and time that the subaccount first sent as a UTC string in YYYY-MM-DD HH:MM:SS format
               sent_weekly (integer): the number of emails the subaccount has sent so far this week (weeks start on midnight Monday, UTC)
               sent_monthly (integer): the number of emails the subaccount has sent so far this month (months start on midnight of the 1st, UTC)
               sent_total (integer): the number of emails the subaccount has sent since it was created

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownSubaccountError: The provided subaccount id does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id}
        return self.master.call('subaccounts/resume', _params)


class Urls(object):
    def __init__(self, master):
        self.master = master

    def list(self, ):
        """Get the 100 most clicked URLs

        Returns:
           array.  the 100 most clicked URLs and their stats::
               [] (struct): the individual URL stats::
                   [].url (string): the URL to be tracked
                   [].sent (integer): the number of emails that contained the URL
                   [].clicks (integer): the number of times the URL has been clicked from a tracked email
                   [].unique_clicks (integer): the number of unique emails that have generated clicks for this URL


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('urls/list', _params)

    def search(self, q):
        """Return the 100 most clicked URLs that match the search query given

        Args:
           q (string): a search query

        Returns:
           array.  the 100 most clicked URLs matching the search query::
               [] (struct): the URL matching the query::
                   [].url (string): the URL to be tracked
                   [].sent (integer): the number of emails that contained the URL
                   [].clicks (integer): the number of times the URL has been clicked from a tracked email
                   [].unique_clicks (integer): the number of unique emails that have generated clicks for this URL


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'q': q}
        return self.master.call('urls/search', _params)

    def time_series(self, url):
        """Return the recent history (hourly stats for the last 30 days) for a url

        Args:
           url (string): an existing URL

        Returns:
           array.  the array of history information::
               [] (struct): the information for a single hour::
                   [].time (string): the hour as a UTC date string in YYYY-MM-DD HH:MM:SS format
                   [].sent (integer): the number of emails that were sent with the URL during the hour
                   [].clicks (integer): the number of times the URL was clicked during the hour
                   [].unique_clicks (integer): the number of unique clicks generated for emails sent with this URL during the hour


        Raises:
           UnknownUrlError: The requested URL has not been seen in a tracked link
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'url': url}
        return self.master.call('urls/time-series', _params)

    def tracking_domains(self, ):
        """Get the list of tracking domains set up for this account

        Returns:
           array.  the tracking domains and their status::
               [] (struct): the individual tracking domain::
                   [].domain (string): the tracking domain name
                   [].created_at (string): the date and time that the tracking domain was added as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].last_tested_at (string): when the domain's DNS settings were last tested as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].cname (struct): details about the domain's CNAME record::
                       [].cname.valid (boolean): whether the domain's CNAME record is valid for use with Mandrill
                       [].cname.valid_after (string): when the domain's CNAME record will be considered valid for use with Mandrill as a UTC string in YYYY-MM-DD HH:MM:SS format. If set, this indicates that the record is valid now, but was previously invalid, and Mandrill will wait until the record's TTL elapses to start using it.
                       [].cname.error (string): an error describing the CNAME record, or null if the record is correct

                   [].valid_tracking (boolean): whether this domain can be used as a tracking domain for email.


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('urls/tracking-domains', _params)

    def add_tracking_domain(self, domain):
        """Add a tracking domain to your account

        Args:
           domain (string): a domain name

        Returns:
           struct.  information about the domain::
               domain (string): the tracking domain name
               created_at (string): the date and time that the tracking domain was added as a UTC string in YYYY-MM-DD HH:MM:SS format
               last_tested_at (string): when the domain's DNS settings were last tested as a UTC string in YYYY-MM-DD HH:MM:SS format
               cname (struct): details about the domain's CNAME record::
                   cname.valid (boolean): whether the domain's CNAME record is valid for use with Mandrill
                   cname.valid_after (string): when the domain's CNAME record will be considered valid for use with Mandrill as a UTC string in YYYY-MM-DD HH:MM:SS format. If set, this indicates that the record is valid now, but was previously invalid, and Mandrill will wait until the record's TTL elapses to start using it.
                   cname.error (string): an error describing the CNAME record, or null if the record is correct

               valid_tracking (boolean): whether this domain can be used as a tracking domain for email.

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'domain': domain}
        return self.master.call('urls/add-tracking-domain', _params)

    def check_tracking_domain(self, domain):
        """Checks the CNAME settings for a tracking domain. The domain must have been added already with the add-tracking-domain call

        Args:
           domain (string): an existing tracking domain name

        Returns:
           struct.  information about the tracking domain::
               domain (string): the tracking domain name
               created_at (string): the date and time that the tracking domain was added as a UTC string in YYYY-MM-DD HH:MM:SS format
               last_tested_at (string): when the domain's DNS settings were last tested as a UTC string in YYYY-MM-DD HH:MM:SS format
               cname (struct): details about the domain's CNAME record::
                   cname.valid (boolean): whether the domain's CNAME record is valid for use with Mandrill
                   cname.valid_after (string): when the domain's CNAME record will be considered valid for use with Mandrill as a UTC string in YYYY-MM-DD HH:MM:SS format. If set, this indicates that the record is valid now, but was previously invalid, and Mandrill will wait until the record's TTL elapses to start using it.
                   cname.error (string): an error describing the CNAME record, or null if the record is correct

               valid_tracking (boolean): whether this domain can be used as a tracking domain for email.

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownTrackingDomainError: The provided tracking domain does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'domain': domain}
        return self.master.call('urls/check-tracking-domain', _params)


class Webhooks(object):
    def __init__(self, master):
        self.master = master

    def list(self, ):
        """Get the list of all webhooks defined on the account

        Returns:
           array.  the webhooks associated with the account::
               [] (struct): the individual webhook info::
                   [].id (integer): a unique integer indentifier for the webhook
                   [].url (string): The URL that the event data will be posted to
                   [].description (string): a description of the webhook
                   [].auth_key (string): the key used to requests for this webhook
                   [].events (array): The message events that will be posted to the hook::
                       [].events[] (string): the individual message event (send, hard_bounce, soft_bounce, open, click, spam, unsub, or reject)

                   [].created_at (string): the date and time that the webhook was created as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].last_sent_at (string): the date and time that the webhook last successfully received events as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].batches_sent (integer): the number of event batches that have ever been sent to this webhook
                   [].events_sent (integer): the total number of events that have ever been sent to this webhook
                   [].last_error (string): if we've ever gotten an error trying to post to this webhook, the last error that we've seen


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('webhooks/list', _params)

    def add(self, url, description=None, events=[]):
        """Add a new webhook

        Args:
           url (string): the URL to POST batches of events
           description (string): an optional description of the webhook
           events (array): an optional list of events that will be posted to the webhook::
               events[] (string): the individual event to listen for

        Returns:
           struct.  the information saved about the new webhook::
               id (integer): a unique integer indentifier for the webhook
               url (string): The URL that the event data will be posted to
               description (string): a description of the webhook
               auth_key (string): the key used to requests for this webhook
               events (array): The message events that will be posted to the hook::
                   events[] (string): the individual message event (send, hard_bounce, soft_bounce, open, click, spam, unsub, or reject)

               created_at (string): the date and time that the webhook was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               last_sent_at (string): the date and time that the webhook last successfully received events as a UTC string in YYYY-MM-DD HH:MM:SS format
               batches_sent (integer): the number of event batches that have ever been sent to this webhook
               events_sent (integer): the total number of events that have ever been sent to this webhook
               last_error (string): if we've ever gotten an error trying to post to this webhook, the last error that we've seen

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'url': url, 'description': description, 'events': events}
        return self.master.call('webhooks/add', _params)

    def info(self, id):
        """Given the ID of an existing webhook, return the data about it

        Args:
           id (integer): the unique identifier of a webhook belonging to this account

        Returns:
           struct.  the information about the webhook::
               id (integer): a unique integer indentifier for the webhook
               url (string): The URL that the event data will be posted to
               description (string): a description of the webhook
               auth_key (string): the key used to requests for this webhook
               events (array): The message events that will be posted to the hook::
                   events[] (string): the individual message event (send, hard_bounce, soft_bounce, open, click, spam, unsub, or reject)

               created_at (string): the date and time that the webhook was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               last_sent_at (string): the date and time that the webhook last successfully received events as a UTC string in YYYY-MM-DD HH:MM:SS format
               batches_sent (integer): the number of event batches that have ever been sent to this webhook
               events_sent (integer): the total number of events that have ever been sent to this webhook
               last_error (string): if we've ever gotten an error trying to post to this webhook, the last error that we've seen

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownWebhookError: The requested webhook does not exist
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id}
        return self.master.call('webhooks/info', _params)

    def update(self, id, url, description=None, events=[]):
        """Update an existing webhook

        Args:
           id (integer): the unique identifier of a webhook belonging to this account
           url (string): the URL to POST batches of events
           description (string): an optional description of the webhook
           events (array): an optional list of events that will be posted to the webhook::
               events[] (string): the individual event to listen for

        Returns:
           struct.  the information for the updated webhook::
               id (integer): a unique integer indentifier for the webhook
               url (string): The URL that the event data will be posted to
               description (string): a description of the webhook
               auth_key (string): the key used to requests for this webhook
               events (array): The message events that will be posted to the hook::
                   events[] (string): the individual message event (send, hard_bounce, soft_bounce, open, click, spam, unsub, or reject)

               created_at (string): the date and time that the webhook was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               last_sent_at (string): the date and time that the webhook last successfully received events as a UTC string in YYYY-MM-DD HH:MM:SS format
               batches_sent (integer): the number of event batches that have ever been sent to this webhook
               events_sent (integer): the total number of events that have ever been sent to this webhook
               last_error (string): if we've ever gotten an error trying to post to this webhook, the last error that we've seen

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownWebhookError: The requested webhook does not exist
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id, 'url': url, 'description': description, 'events': events}
        return self.master.call('webhooks/update', _params)

    def delete(self, id):
        """Delete an existing webhook

        Args:
           id (integer): the unique identifier of a webhook belonging to this account

        Returns:
           struct.  the information for the deleted webhook::
               id (integer): a unique integer indentifier for the webhook
               url (string): The URL that the event data will be posted to
               description (string): a description of the webhook
               auth_key (string): the key used to requests for this webhook
               events (array): The message events that will be posted to the hook::
                   events[] (string): the individual message event (send, hard_bounce, soft_bounce, open, click, spam, unsub, or reject)

               created_at (string): the date and time that the webhook was created as a UTC string in YYYY-MM-DD HH:MM:SS format
               last_sent_at (string): the date and time that the webhook last successfully received events as a UTC string in YYYY-MM-DD HH:MM:SS format
               batches_sent (integer): the number of event batches that have ever been sent to this webhook
               events_sent (integer): the total number of events that have ever been sent to this webhook
               last_error (string): if we've ever gotten an error trying to post to this webhook, the last error that we've seen

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownWebhookError: The requested webhook does not exist
           Error: A general Mandrill error has occurred
        """
        _params = {'id': id}
        return self.master.call('webhooks/delete', _params)


class Senders(object):
    def __init__(self, master):
        self.master = master

    def list(self, ):
        """Return the senders that have tried to use this account.

        Returns:
           array.  an array of sender data, one for each sending addresses used by the account::
               [] (struct): the information on each sending address in the account::
                   [].address (string): the sender's email address
                   [].created_at (string): the date and time that the sender was first seen by Mandrill as a UTC date string in YYYY-MM-DD HH:MM:SS format
                   [].sent (integer): the total number of messages sent by this sender
                   [].hard_bounces (integer): the total number of hard bounces by messages by this sender
                   [].soft_bounces (integer): the total number of soft bounces by messages by this sender
                   [].rejects (integer): the total number of rejected messages by this sender
                   [].complaints (integer): the total number of spam complaints received for messages by this sender
                   [].unsubs (integer): the total number of unsubscribe requests received for messages by this sender
                   [].opens (integer): the total number of times messages by this sender have been opened
                   [].clicks (integer): the total number of times tracked URLs in messages by this sender have been clicked
                   [].unique_opens (integer): the number of unique opens for emails sent for this sender
                   [].unique_clicks (integer): the number of unique clicks for emails sent for this sender


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('senders/list', _params)

    def domains(self, ):
        """Returns the sender domains that have been added to this account.

        Returns:
           array.  an array of sender domain data, one for each sending domain used by the account::
               [] (struct): the information on each sending domain for the account::
                   [].domain (string): the sender domain name
                   [].created_at (string): the date and time that the sending domain was first seen as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].last_tested_at (string): when the domain's DNS settings were last tested as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].spf (struct): details about the domain's SPF record::
                       [].spf.valid (boolean): whether the domain's SPF record is valid for use with Mandrill
                       [].spf.valid_after (string): when the domain's SPF record will be considered valid for use with Mandrill as a UTC string in YYYY-MM-DD HH:MM:SS format. If set, this indicates that the record is valid now, but was previously invalid, and Mandrill will wait until the record's TTL elapses to start using it.
                       [].spf.error (string): an error describing the spf record, or null if the record is correct

                   [].dkim (struct): details about the domain's DKIM record::
                       [].dkim.valid (boolean): whether the domain's DKIM record is valid for use with Mandrill
                       [].dkim.valid_after (string): when the domain's DKIM record will be considered valid for use with Mandrill as a UTC string in YYYY-MM-DD HH:MM:SS format. If set, this indicates that the record is valid now, but was previously invalid, and Mandrill will wait until the record's TTL elapses to start using it.
                       [].dkim.error (string): an error describing the DKIM record, or null if the record is correct

                   [].verified_at (string): if the domain has been verified, this indicates when that verification occurred as a UTC string in YYYY-MM-DD HH:MM:SS format
                   [].valid_signing (boolean): whether this domain can be used to authenticate mail, either for itself or as a custom signing domain. If this is false but spf and dkim are both valid, you will need to verify the domain before using it to authenticate mail


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('senders/domains', _params)

    def add_domain(self, domain):
        """Adds a sender domain to your account. Sender domains are added automatically as you
send, but you can use this call to add them ahead of time.

        Args:
           domain (string): a domain name

        Returns:
           struct.  information about the domain::
               domain (string): the sender domain name
               created_at (string): the date and time that the sending domain was first seen as a UTC string in YYYY-MM-DD HH:MM:SS format
               last_tested_at (string): when the domain's DNS settings were last tested as a UTC string in YYYY-MM-DD HH:MM:SS format
               spf (struct): details about the domain's SPF record::
                   spf.valid (boolean): whether the domain's SPF record is valid for use with Mandrill
                   spf.valid_after (string): when the domain's SPF record will be considered valid for use with Mandrill as a UTC string in YYYY-MM-DD HH:MM:SS format. If set, this indicates that the record is valid now, but was previously invalid, and Mandrill will wait until the record's TTL elapses to start using it.
                   spf.error (string): an error describing the spf record, or null if the record is correct

               dkim (struct): details about the domain's DKIM record::
                   dkim.valid (boolean): whether the domain's DKIM record is valid for use with Mandrill
                   dkim.valid_after (string): when the domain's DKIM record will be considered valid for use with Mandrill as a UTC string in YYYY-MM-DD HH:MM:SS format. If set, this indicates that the record is valid now, but was previously invalid, and Mandrill will wait until the record's TTL elapses to start using it.
                   dkim.error (string): an error describing the DKIM record, or null if the record is correct

               verified_at (string): if the domain has been verified, this indicates when that verification occurred as a UTC string in YYYY-MM-DD HH:MM:SS format
               valid_signing (boolean): whether this domain can be used to authenticate mail, either for itself or as a custom signing domain. If this is false but spf and dkim are both valid, you will need to verify the domain before using it to authenticate mail

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'domain': domain}
        return self.master.call('senders/add-domain', _params)

    def check_domain(self, domain):
        """Checks the SPF and DKIM settings for a domain. If you haven't already added this domain to your
account, it will be added automatically.

        Args:
           domain (string): a domain name

        Returns:
           struct.  information about the sender domain::
               domain (string): the sender domain name
               created_at (string): the date and time that the sending domain was first seen as a UTC string in YYYY-MM-DD HH:MM:SS format
               last_tested_at (string): when the domain's DNS settings were last tested as a UTC string in YYYY-MM-DD HH:MM:SS format
               spf (struct): details about the domain's SPF record::
                   spf.valid (boolean): whether the domain's SPF record is valid for use with Mandrill
                   spf.valid_after (string): when the domain's SPF record will be considered valid for use with Mandrill as a UTC string in YYYY-MM-DD HH:MM:SS format. If set, this indicates that the record is valid now, but was previously invalid, and Mandrill will wait until the record's TTL elapses to start using it.
                   spf.error (string): an error describing the spf record, or null if the record is correct

               dkim (struct): details about the domain's DKIM record::
                   dkim.valid (boolean): whether the domain's DKIM record is valid for use with Mandrill
                   dkim.valid_after (string): when the domain's DKIM record will be considered valid for use with Mandrill as a UTC string in YYYY-MM-DD HH:MM:SS format. If set, this indicates that the record is valid now, but was previously invalid, and Mandrill will wait until the record's TTL elapses to start using it.
                   dkim.error (string): an error describing the DKIM record, or null if the record is correct

               verified_at (string): if the domain has been verified, this indicates when that verification occurred as a UTC string in YYYY-MM-DD HH:MM:SS format
               valid_signing (boolean): whether this domain can be used to authenticate mail, either for itself or as a custom signing domain. If this is false but spf and dkim are both valid, you will need to verify the domain before using it to authenticate mail

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'domain': domain}
        return self.master.call('senders/check-domain', _params)

    def verify_domain(self, domain, mailbox):
        """Sends a verification email in order to verify ownership of a domain.
Domain verification is an optional step to confirm ownership of a domain. Once a
domain has been verified in a Mandrill account, other accounts may not have their
messages signed by that domain unless they also verify the domain. This prevents
other Mandrill accounts from sending mail signed by your domain.

        Args:
           domain (string): a domain name at which you can receive email
           mailbox (string): a mailbox at the domain where the verification email should be sent

        Returns:
           struct.  information about the verification that was sent::
               status (string): "sent" indicates that the verification has been sent, "already_verified" indicates that the domain has already been verified with your account
               domain (string): the domain name you provided
               email (string): the email address the verification email was sent to

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'domain': domain, 'mailbox': mailbox}
        return self.master.call('senders/verify-domain', _params)

    def info(self, address):
        """Return more detailed information about a single sender, including aggregates of recent stats

        Args:
           address (string): the email address of the sender

        Returns:
           struct.  the detailed information on the sender::
               address (string): the sender's email address
               created_at (string): the date and time that the sender was first seen by Mandrill as a UTC date string in YYYY-MM-DD HH:MM:SS format
               sent (integer): the total number of messages sent by this sender
               hard_bounces (integer): the total number of hard bounces by messages by this sender
               soft_bounces (integer): the total number of soft bounces by messages by this sender
               rejects (integer): the total number of rejected messages by this sender
               complaints (integer): the total number of spam complaints received for messages by this sender
               unsubs (integer): the total number of unsubscribe requests received for messages by this sender
               opens (integer): the total number of times messages by this sender have been opened
               clicks (integer): the total number of times tracked URLs in messages by this sender have been clicked
               stats (struct): an aggregate summary of the sender's sending stats::
                   stats.today (struct): stats for this sender so far today::
                       stats.today.sent (integer): the number of emails sent for this sender so far today
                       stats.today.hard_bounces (integer): the number of emails hard bounced for this sender so far today
                       stats.today.soft_bounces (integer): the number of emails soft bounced for this sender so far today
                       stats.today.rejects (integer): the number of emails rejected for sending this sender so far today
                       stats.today.complaints (integer): the number of spam complaints for this sender so far today
                       stats.today.unsubs (integer): the number of unsubscribes for this sender so far today
                       stats.today.opens (integer): the number of times emails have been opened for this sender so far today
                       stats.today.unique_opens (integer): the number of unique opens for emails sent for this sender so far today
                       stats.today.clicks (integer): the number of URLs that have been clicked for this sender so far today
                       stats.today.unique_clicks (integer): the number of unique clicks for emails sent for this sender so far today

                   stats.last_7_days (struct): stats for this sender in the last 7 days::
                       stats.last_7_days.sent (integer): the number of emails sent for this sender in the last 7 days
                       stats.last_7_days.hard_bounces (integer): the number of emails hard bounced for this sender in the last 7 days
                       stats.last_7_days.soft_bounces (integer): the number of emails soft bounced for this sender in the last 7 days
                       stats.last_7_days.rejects (integer): the number of emails rejected for sending this sender in the last 7 days
                       stats.last_7_days.complaints (integer): the number of spam complaints for this sender in the last 7 days
                       stats.last_7_days.unsubs (integer): the number of unsubscribes for this sender in the last 7 days
                       stats.last_7_days.opens (integer): the number of times emails have been opened for this sender in the last 7 days
                       stats.last_7_days.unique_opens (integer): the number of unique opens for emails sent for this sender in the last 7 days
                       stats.last_7_days.clicks (integer): the number of URLs that have been clicked for this sender in the last 7 days
                       stats.last_7_days.unique_clicks (integer): the number of unique clicks for emails sent for this sender in the last 7 days

                   stats.last_30_days (struct): stats for this sender in the last 30 days::
                       stats.last_30_days.sent (integer): the number of emails sent for this sender in the last 30 days
                       stats.last_30_days.hard_bounces (integer): the number of emails hard bounced for this sender in the last 30 days
                       stats.last_30_days.soft_bounces (integer): the number of emails soft bounced for this sender in the last 30 days
                       stats.last_30_days.rejects (integer): the number of emails rejected for sending this sender in the last 30 days
                       stats.last_30_days.complaints (integer): the number of spam complaints for this sender in the last 30 days
                       stats.last_30_days.unsubs (integer): the number of unsubscribes for this sender in the last 30 days
                       stats.last_30_days.opens (integer): the number of times emails have been opened for this sender in the last 30 days
                       stats.last_30_days.unique_opens (integer): the number of unique opens for emails sent for this sender in the last 30 days
                       stats.last_30_days.clicks (integer): the number of URLs that have been clicked for this sender in the last 30 days
                       stats.last_30_days.unique_clicks (integer): the number of unique clicks for emails sent for this sender in the last 30 days

                   stats.last_60_days (struct): stats for this sender in the last 60 days::
                       stats.last_60_days.sent (integer): the number of emails sent for this sender in the last 60 days
                       stats.last_60_days.hard_bounces (integer): the number of emails hard bounced for this sender in the last 60 days
                       stats.last_60_days.soft_bounces (integer): the number of emails soft bounced for this sender in the last 60 days
                       stats.last_60_days.rejects (integer): the number of emails rejected for sending this sender in the last 60 days
                       stats.last_60_days.complaints (integer): the number of spam complaints for this sender in the last 60 days
                       stats.last_60_days.unsubs (integer): the number of unsubscribes for this sender in the last 60 days
                       stats.last_60_days.opens (integer): the number of times emails have been opened for this sender in the last 60 days
                       stats.last_60_days.unique_opens (integer): the number of unique opens for emails sent for this sender in the last 60 days
                       stats.last_60_days.clicks (integer): the number of URLs that have been clicked for this sender in the last 60 days
                       stats.last_60_days.unique_clicks (integer): the number of unique clicks for emails sent for this sender in the last 60 days

                   stats.last_90_days (struct): stats for this sender in the last 90 days::
                       stats.last_90_days.sent (integer): the number of emails sent for this sender in the last 90 days
                       stats.last_90_days.hard_bounces (integer): the number of emails hard bounced for this sender in the last 90 days
                       stats.last_90_days.soft_bounces (integer): the number of emails soft bounced for this sender in the last 90 days
                       stats.last_90_days.rejects (integer): the number of emails rejected for sending this sender in the last 90 days
                       stats.last_90_days.complaints (integer): the number of spam complaints for this sender in the last 90 days
                       stats.last_90_days.unsubs (integer): the number of unsubscribes for this sender in the last 90 days
                       stats.last_90_days.opens (integer): the number of times emails have been opened for this sender in the last 90 days
                       stats.last_90_days.unique_opens (integer): the number of unique opens for emails sent for this sender in the last 90 days
                       stats.last_90_days.clicks (integer): the number of URLs that have been clicked for this sender in the last 90 days
                       stats.last_90_days.unique_clicks (integer): the number of unique clicks for emails sent for this sender in the last 90 days



        Raises:
           UnknownSenderError: The requested sender does not exist
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'address': address}
        return self.master.call('senders/info', _params)

    def time_series(self, address):
        """Return the recent history (hourly stats for the last 30 days) for a sender

        Args:
           address (string): the email address of the sender

        Returns:
           array.  the array of history information::
               [] (struct): the stats for a single hour::
                   [].time (string): the hour as a UTC date string in YYYY-MM-DD HH:MM:SS format
                   [].sent (integer): the number of emails that were sent during the hour
                   [].hard_bounces (integer): the number of emails that hard bounced during the hour
                   [].soft_bounces (integer): the number of emails that soft bounced during the hour
                   [].rejects (integer): the number of emails that were rejected during the hour
                   [].complaints (integer): the number of spam complaints received during the hour
                   [].opens (integer): the number of emails opened during the hour
                   [].unique_opens (integer): the number of unique opens generated by messages sent during the hour
                   [].clicks (integer): the number of tracked URLs clicked during the hour
                   [].unique_clicks (integer): the number of unique clicks generated by messages sent during the hour


        Raises:
           UnknownSenderError: The requested sender does not exist
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {'address': address}
        return self.master.call('senders/time-series', _params)


class Metadata(object):
    def __init__(self, master):
        self.master = master

    def list(self, ):
        """Get the list of custom metadata fields indexed for the account.

        Returns:
           array.  the custom metadata fields for the account::
               [] (struct): the individual custom metadata field info::
                   [].name (string): the unique identifier of the metadata field to update
                   [].state (string): the current state of the metadata field, one of "active", "delete", or "index"
                   [].view_template (string): Mustache template to control how the metadata is rendered in your activity log


        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           Error: A general Mandrill error has occurred
        """
        _params = {}
        return self.master.call('metadata/list', _params)

    def add(self, name, view_template=None):
        """Add a new custom metadata field to be indexed for the account.

        Args:
           name (string): a unique identifier for the metadata field
           view_template (string): optional Mustache template to control how the metadata is rendered in your activity log

        Returns:
           struct.  the information saved about the new metadata field::
               name (string): the unique identifier of the metadata field to update
               state (string): the current state of the metadata field, one of "active", "delete", or "index"
               view_template (string): Mustache template to control how the metadata is rendered in your activity log

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           MetadataFieldLimitError: Custom metadata field limit reached.
           Error: A general Mandrill error has occurred
        """
        _params = {'name': name, 'view_template': view_template}
        return self.master.call('metadata/add', _params)

    def update(self, name, view_template):
        """Update an existing custom metadata field.

        Args:
           name (string): the unique identifier of the metadata field to update
           view_template (string): optional Mustache template to control how the metadata is rendered in your activity log

        Returns:
           struct.  the information for the updated metadata field::
               name (string): the unique identifier of the metadata field to update
               state (string): the current state of the metadata field, one of "active", "delete", or "index"
               view_template (string): Mustache template to control how the metadata is rendered in your activity log

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownMetadataFieldError: The provided metadata field name does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'name': name, 'view_template': view_template}
        return self.master.call('metadata/update', _params)

    def delete(self, name):
        """Delete an existing custom metadata field. Deletion isn't instataneous, and /metadata/list will continue to return the field until the asynchronous deletion process is complete.

        Args:
           name (string): the unique identifier of the metadata field to update

        Returns:
           struct.  the information for the deleted metadata field::
               name (string): the unique identifier of the metadata field to update
               state (string): the current state of the metadata field, one of "active", "delete", or "index"
               view_template (string): Mustache template to control how the metadata is rendered in your activity log

        Raises:
           InvalidKeyError: The provided API key is not a valid Mandrill API key
           UnknownMetadataFieldError: The provided metadata field name does not exist.
           Error: A general Mandrill error has occurred
        """
        _params = {'name': name}
        return self.master.call('metadata/delete', _params)



