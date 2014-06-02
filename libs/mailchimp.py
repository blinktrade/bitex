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
class ServerMethodUnknownError(Error):
    pass
class ServerInvalidParametersError(Error):
    pass
class UnknownExceptionError(Error):
    pass
class RequestTimedOutError(Error):
    pass
class ZendUriExceptionError(Error):
    pass
class PDOExceptionError(Error):
    pass
class AvestaDbExceptionError(Error):
    pass
class XMLRPC2ExceptionError(Error):
    pass
class XMLRPC2FaultExceptionError(Error):
    pass
class TooManyConnectionsError(Error):
    pass
class ParseExceptionError(Error):
    pass
class UserUnknownError(Error):
    pass
class UserDisabledError(Error):
    pass
class UserDoesNotExistError(Error):
    pass
class UserNotApprovedError(Error):
    pass
class InvalidApiKeyError(Error):
    pass
class UserUnderMaintenanceError(Error):
    pass
class InvalidAppKeyError(Error):
    pass
class InvalidIPError(Error):
    pass
class UserDoesExistError(Error):
    pass
class UserInvalidRoleError(Error):
    pass
class UserInvalidActionError(Error):
    pass
class UserMissingEmailError(Error):
    pass
class UserCannotSendCampaignError(Error):
    pass
class UserMissingModuleOutboxError(Error):
    pass
class UserModuleAlreadyPurchasedError(Error):
    pass
class UserModuleNotPurchasedError(Error):
    pass
class UserNotEnoughCreditError(Error):
    pass
class MCInvalidPaymentError(Error):
    pass
class ListDoesNotExistError(Error):
    pass
class ListInvalidInterestFieldTypeError(Error):
    pass
class ListInvalidOptionError(Error):
    pass
class ListInvalidUnsubMemberError(Error):
    pass
class ListInvalidBounceMemberError(Error):
    pass
class ListAlreadySubscribedError(Error):
    pass
class ListNotSubscribedError(Error):
    pass
class ListInvalidImportError(Error):
    pass
class MCPastedListDuplicateError(Error):
    pass
class MCPastedListInvalidImportError(Error):
    pass
class EmailAlreadySubscribedError(Error):
    pass
class EmailAlreadyUnsubscribedError(Error):
    pass
class EmailNotExistsError(Error):
    pass
class EmailNotSubscribedError(Error):
    pass
class ListMergeFieldRequiredError(Error):
    pass
class ListCannotRemoveEmailMergeError(Error):
    pass
class ListMergeInvalidMergeIDError(Error):
    pass
class ListTooManyMergeFieldsError(Error):
    pass
class ListInvalidMergeFieldError(Error):
    pass
class ListInvalidInterestGroupError(Error):
    pass
class ListTooManyInterestGroupsError(Error):
    pass
class CampaignDoesNotExistError(Error):
    pass
class CampaignStatsNotAvailableError(Error):
    pass
class CampaignInvalidAbsplitError(Error):
    pass
class CampaignInvalidContentError(Error):
    pass
class CampaignInvalidOptionError(Error):
    pass
class CampaignInvalidStatusError(Error):
    pass
class CampaignNotSavedError(Error):
    pass
class CampaignInvalidSegmentError(Error):
    pass
class CampaignInvalidRssError(Error):
    pass
class CampaignInvalidAutoError(Error):
    pass
class MCContentImportInvalidArchiveError(Error):
    pass
class CampaignBounceMissingError(Error):
    pass
class CampaignInvalidTemplateError(Error):
    pass
class InvalidEcommOrderError(Error):
    pass
class AbsplitUnknownError(Error):
    pass
class AbsplitUnknownSplitTestError(Error):
    pass
class AbsplitUnknownTestTypeError(Error):
    pass
class AbsplitUnknownWaitUnitError(Error):
    pass
class AbsplitUnknownWinnerTypeError(Error):
    pass
class AbsplitWinnerNotSelectedError(Error):
    pass
class InvalidAnalyticsError(Error):
    pass
class InvalidDateTimeError(Error):
    pass
class InvalidEmailError(Error):
    pass
class InvalidSendTypeError(Error):
    pass
class InvalidTemplateError(Error):
    pass
class InvalidTrackingOptionsError(Error):
    pass
class InvalidOptionsError(Error):
    pass
class InvalidFolderError(Error):
    pass
class InvalidURLError(Error):
    pass
class ModuleUnknownError(Error):
    pass
class MonthlyPlanUnknownError(Error):
    pass
class OrderTypeUnknownError(Error):
    pass
class InvalidPagingLimitError(Error):
    pass
class InvalidPagingStartError(Error):
    pass
class MaxSizeReachedError(Error):
    pass
class MCSearchExceptionError(Error):
    pass

ROOT = 'https://api.mailchimp.com/2.0/'
ERROR_MAP = {
    'ValidationError': ValidationError,
    'ServerError_MethodUnknown': ServerMethodUnknownError,
    'ServerError_InvalidParameters': ServerInvalidParametersError,
    'Unknown_Exception': UnknownExceptionError,
    'Request_TimedOut': RequestTimedOutError,
    'Zend_Uri_Exception': ZendUriExceptionError,
    'PDOException': PDOExceptionError,
    'Avesta_Db_Exception': AvestaDbExceptionError,
    'XML_RPC2_Exception': XMLRPC2ExceptionError,
    'XML_RPC2_FaultException': XMLRPC2FaultExceptionError,
    'Too_Many_Connections': TooManyConnectionsError,
    'Parse_Exception': ParseExceptionError,
    'User_Unknown': UserUnknownError,
    'User_Disabled': UserDisabledError,
    'User_DoesNotExist': UserDoesNotExistError,
    'User_NotApproved': UserNotApprovedError,
    'Invalid_ApiKey': InvalidApiKeyError,
    'User_UnderMaintenance': UserUnderMaintenanceError,
    'Invalid_AppKey': InvalidAppKeyError,
    'Invalid_IP': InvalidIPError,
    'User_DoesExist': UserDoesExistError,
    'User_InvalidRole': UserInvalidRoleError,
    'User_InvalidAction': UserInvalidActionError,
    'User_MissingEmail': UserMissingEmailError,
    'User_CannotSendCampaign': UserCannotSendCampaignError,
    'User_MissingModuleOutbox': UserMissingModuleOutboxError,
    'User_ModuleAlreadyPurchased': UserModuleAlreadyPurchasedError,
    'User_ModuleNotPurchased': UserModuleNotPurchasedError,
    'User_NotEnoughCredit': UserNotEnoughCreditError,
    'MC_InvalidPayment': MCInvalidPaymentError,
    'List_DoesNotExist': ListDoesNotExistError,
    'List_InvalidInterestFieldType': ListInvalidInterestFieldTypeError,
    'List_InvalidOption': ListInvalidOptionError,
    'List_InvalidUnsubMember': ListInvalidUnsubMemberError,
    'List_InvalidBounceMember': ListInvalidBounceMemberError,
    'List_AlreadySubscribed': ListAlreadySubscribedError,
    'List_NotSubscribed': ListNotSubscribedError,
    'List_InvalidImport': ListInvalidImportError,
    'MC_PastedList_Duplicate': MCPastedListDuplicateError,
    'MC_PastedList_InvalidImport': MCPastedListInvalidImportError,
    'Email_AlreadySubscribed': EmailAlreadySubscribedError,
    'Email_AlreadyUnsubscribed': EmailAlreadyUnsubscribedError,
    'Email_NotExists': EmailNotExistsError,
    'Email_NotSubscribed': EmailNotSubscribedError,
    'List_MergeFieldRequired': ListMergeFieldRequiredError,
    'List_CannotRemoveEmailMerge': ListCannotRemoveEmailMergeError,
    'List_Merge_InvalidMergeID': ListMergeInvalidMergeIDError,
    'List_TooManyMergeFields': ListTooManyMergeFieldsError,
    'List_InvalidMergeField': ListInvalidMergeFieldError,
    'List_InvalidInterestGroup': ListInvalidInterestGroupError,
    'List_TooManyInterestGroups': ListTooManyInterestGroupsError,
    'Campaign_DoesNotExist': CampaignDoesNotExistError,
    'Campaign_StatsNotAvailable': CampaignStatsNotAvailableError,
    'Campaign_InvalidAbsplit': CampaignInvalidAbsplitError,
    'Campaign_InvalidContent': CampaignInvalidContentError,
    'Campaign_InvalidOption': CampaignInvalidOptionError,
    'Campaign_InvalidStatus': CampaignInvalidStatusError,
    'Campaign_NotSaved': CampaignNotSavedError,
    'Campaign_InvalidSegment': CampaignInvalidSegmentError,
    'Campaign_InvalidRss': CampaignInvalidRssError,
    'Campaign_InvalidAuto': CampaignInvalidAutoError,
    'MC_ContentImport_InvalidArchive': MCContentImportInvalidArchiveError,
    'Campaign_BounceMissing': CampaignBounceMissingError,
    'Campaign_InvalidTemplate': CampaignInvalidTemplateError,
    'Invalid_EcommOrder': InvalidEcommOrderError,
    'Absplit_UnknownError': AbsplitUnknownError,
    'Absplit_UnknownSplitTest': AbsplitUnknownSplitTestError,
    'Absplit_UnknownTestType': AbsplitUnknownTestTypeError,
    'Absplit_UnknownWaitUnit': AbsplitUnknownWaitUnitError,
    'Absplit_UnknownWinnerType': AbsplitUnknownWinnerTypeError,
    'Absplit_WinnerNotSelected': AbsplitWinnerNotSelectedError,
    'Invalid_Analytics': InvalidAnalyticsError,
    'Invalid_DateTime': InvalidDateTimeError,
    'Invalid_Email': InvalidEmailError,
    'Invalid_SendType': InvalidSendTypeError,
    'Invalid_Template': InvalidTemplateError,
    'Invalid_TrackingOptions': InvalidTrackingOptionsError,
    'Invalid_Options': InvalidOptionsError,
    'Invalid_Folder': InvalidFolderError,
    'Invalid_URL': InvalidURLError,
    'Module_Unknown': ModuleUnknownError,
    'MonthlyPlan_Unknown': MonthlyPlanUnknownError,
    'Order_TypeUnknown': OrderTypeUnknownError,
    'Invalid_PagingLimit': InvalidPagingLimitError,
    'Invalid_PagingStart': InvalidPagingStartError,
    'Max_Size_Reached': MaxSizeReachedError,
    'MC_SearchException': MCSearchExceptionError
}

logger = logging.getLogger('mailchimp')
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler(sys.stderr))

class Mailchimp(object):
    def __init__(self, apikey=None, debug=False):
        '''Initialize the API client

        Args:
           apikey (str|None): provide your MailChimp API key.  If this is left as None, we will attempt to get the API key from the following locations::
               - MAILCHIMP_APIKEY in the environment vars
               - ~/.mailchimp.key for the user executing the script
               - /etc/mailchimp.key
           debug (bool): set to True to log all the request and response information to the "mailchimp" logger at the INFO level.  When set to false, it will log at the DEBUG level.  By default it will write log entries to STDERR
       '''

        self.session = requests.session()
        if debug:
            self.level = logging.INFO
        else:
            self.level = logging.DEBUG
        self.last_request = None

        if apikey is None:
            if 'MAILCHIMP_APIKEY' in os.environ:
                apikey = os.environ['MAILCHIMP_APIKEY']
            else:
                apikey = self.read_configs()

        if apikey is None: raise Error('You must provide a MailChimp API key')
        self.apikey = apikey
        dc = 'us1'
        if apikey.find('-'):
            dc = apikey.split('-')[1]
        global ROOT
        ROOT = ROOT.replace('https://api.', 'https://'+dc+'.api.')

        self.folders = Folders(self)
        self.templates = Templates(self)
        self.users = Users(self)
        self.helper = Helper(self)
        self.mobile = Mobile(self)
        self.ecomm = Ecomm(self)
        self.neapolitan = Neapolitan(self)
        self.lists = Lists(self)
        self.campaigns = Campaigns(self)
        self.vip = Vip(self)
        self.reports = Reports(self)
        self.gallery = Gallery(self)

    def call(self, url, params=None):
        '''Actually make the API call with the given params - this should only be called by the namespace methods - use the helpers in regular usage like m.helper.ping()'''
        if params is None: params = {}
        params['apikey'] = self.apikey
        params = json.dumps(params)
        self.log('POST to %s%s.json: %s' % (ROOT, url, params))
        start = time.time()
        r = self.session.post('%s%s.json' % (ROOT, url), data=params, headers={'content-type': 'application/json', 'user-agent': 'MailChimp-Python/2.0.7'})
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
        '''Take a result representing an error and cast it to a specific exception if possible (use a generic mailchimp.Error exception for unknown cases)'''
        if not 'status' in result or result['status'] != 'error' or not 'name' in result:
            raise Error('We received an unexpected error: %r' % result)

        if result['name'] in ERROR_MAP:
            return ERROR_MAP[result['name']](result['error'])
        return Error(result['error'])

    def read_configs(self):
        '''Try to read the API key from a series of files if it's not provided in code'''
        paths = [os.path.expanduser('~/.mailchimp.key'), '/etc/mailchimp.key']
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
        '''Proxy access to the mailchimp logger, changing the level based on the debug setting'''
        logger.log(self.level, *args, **kwargs)

    def __repr__(self):
        return '<Mailchimp %s>' % self.apikey

class Folders(object):
    def __init__(self, master):
        self.master = master

    def add(self, name, type):
        """Add a new folder to file campaigns, autoresponders, or templates in

        Args:
           name (string): a unique name for a folder (max 100 bytes)
           type (string): the type of folder to create - one of "campaign", "autoresponder", or "template".

        Returns:
           struct.  with a single value:::
               folder_id (int): the folder_id of the newly created folder.

        Raises:
           InvalidFolderError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'name': name, 'type': type}
        return self.master.call('folders/add', _params)

    def delete(self, fid, type):
        """Delete a campaign, autoresponder, or template folder. Note that this will simply make whatever was in the folder appear unfiled, no other data is removed

        Args:
           fid (int): the folder id to delete - retrieve from folders/list()
           type (string): the type of folder to delete - either "campaign", "autoresponder", or "template"

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           InvalidFolderError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'fid': fid, 'type': type}
        return self.master.call('folders/del', _params)

    def list(self, type):
        """List all the folders of a certain type

        Args:
           type (string): the type of folders to return "campaign", "autoresponder", or "template"

        Returns:
           array.  structs for each folder, including:::
               folder_id (int): Folder Id for the given folder, this can be used in the campaigns/list() function to filter on.
               name (string): Name of the given folder
               date_created (string): The date/time the folder was created
               type (string): The type of the folders being returned, just to make sure you know.
               cnt (int): number of items in the folder.

        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'type': type}
        return self.master.call('folders/list', _params)

    def update(self, fid, name, type):
        """Update the name of a folder for campaigns, autoresponders, or templates

        Args:
           fid (int): the folder id to update - retrieve from folders/list()
           name (string): a new, unique name for the folder (max 100 bytes)
           type (string): the type of folder to update - one of "campaign", "autoresponder", or "template".

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           InvalidFolderError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'fid': fid, 'name': name, 'type': type}
        return self.master.call('folders/update', _params)


class Templates(object):
    def __init__(self, master):
        self.master = master

    def add(self, name, html, folder_id=None):
        """Create a new user template, <strong>NOT</strong> campaign content. These templates can then be applied while creating campaigns.

        Args:
           name (string): the name for the template - names must be unique and a max of 50 bytes
           html (string): a string specifying the entire template to be created. This is <strong>NOT</strong> campaign content. They are intended to utilize our <a href="http://www.mailchimp.com/resources/email-template-language/" target="_blank">template language</a>.
           folder_id (int): the folder to put this template in.

        Returns:
           struct.  with a single element:::
               template_id (int): the new template id, otherwise an error is thrown.

        Raises:
           InvalidOptionsError:
           InvalidFolderError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'name': name, 'html': html, 'folder_id': folder_id}
        return self.master.call('templates/add', _params)

    def delete(self, template_id):
        """Delete (deactivate) a user template

        Args:
           template_id (int): the id of the user template to delete

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           InvalidTemplateError:
           InvalidOptionsError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'template_id': template_id}
        return self.master.call('templates/del', _params)

    def info(self, template_id, type='user'):
        """Pull details for a specific template to help support editing

        Args:
           template_id (int): the template id - get from templates/list()
           type (string): optional the template type to load - one of 'user', 'gallery', 'base', defaults to user.

        Returns:
           struct.  info to be used when editing::
               default_content (struct): the default content broken down into the named editable sections for the template - dependant upon template, so not documented
               sections (struct): the valid editable section names - dependant upon template, so not documented
               source (string): the full source of the template as if you exported it via our template editor
               preview (string): similar to the source, but the rendered version of the source from our popup preview

        Raises:
           InvalidTemplateError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'template_id': template_id, 'type': type}
        return self.master.call('templates/info', _params)

    def list(self, types=[], filters=[]):
        """Retrieve various templates available in the system, allowing some thing similar to our template gallery to be created.

        Args:
           types (struct): optional the types of templates to return::
               types.user (boolean): Custom templates for this user account. Defaults to true.
               types.gallery (boolean): Templates from our Gallery. Note that some templates that require extra configuration are withheld. (eg, the Etsy template). Defaults to false.
               types.base (boolean): Our "start from scratch" extremely basic templates. Defaults to false.
           filters (struct): optional options to control how inactive templates are returned, if at all::
               filters.category (string): optional for Gallery templates only, limit to a specific template category
               filters.folder_id (string): user templates, limit to this folder_id
               filters.include_inactive (boolean): user templates are not deleted, only set inactive. defaults to false.
               filters.inactive_only (boolean): only include inactive user templates. defaults to false.

        Returns:
           struct.  for each type::
               user (array): matching user templates, if requested.::
                   user.id (int): Id of the template
                   user.name (string): Name of the template
                   user.layout (string): General description of the layout of the template
                   user.category (string): The category for the template, if there is one.
                   user.preview_image (string): If we've generated it, the url of the preview image for the template. We do out best to keep these up to date, but Preview image urls are not guaranteed to be available
                   user.date_created (string): The date/time the template was created
                   user.active (boolean): whether or not the template is active and available for use.
                   user.edit_source (boolean): Whether or not you are able to edit the source of a template.
                   user.folder_id (boolean): if it's in one, the folder id

               gallery (array): matching gallery templates, if requested.::
                   gallery.id (int): Id of the template
                   gallery.name (string): Name of the template
                   gallery.layout (string): General description of the layout of the template
                   gallery.category (string): The category for the template, if there is one.
                   gallery.preview_image (string): If we've generated it, the url of the preview image for the template. We do out best to keep these up to date, but Preview image urls are not guaranteed to be available
                   gallery.date_created (string): The date/time the template was created
                   gallery.active (boolean): whether or not the template is active and available for use.
                   gallery.edit_source (boolean): Whether or not you are able to edit the source of a template.

               base (array): matching base templates, if requested.::
                   base.id (int): Id of the template
                   base.name (string): Name of the template
                   base.layout (string): General description of the layout of the template
                   base.category (string): The category for the template, if there is one.
                   base.preview_image (string): If we've generated it, the url of the preview image for the template. We do out best to keep these up to date, but Preview image urls are not guaranteed to be available
                   base.active (boolean): whether or not the template is active and available for use.
                   base.date_created (string): The date/time the template was created
                   base.edit_source (boolean): Whether or not you are able to edit the source of a template.


        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'types': types, 'filters': filters}
        return self.master.call('templates/list', _params)

    def undel(self, template_id):
        """Undelete (reactivate) a user template

        Args:
           template_id (int): the id of the user template to reactivate

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           InvalidTemplateError:
           InvalidOptionsError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'template_id': template_id}
        return self.master.call('templates/undel', _params)

    def update(self, template_id, values):
        """Replace the content of a user template, <strong>NOT</strong> campaign content.

        Args:
           template_id (int): the id of the user template to update
           values (struct): the values to updates - while both are optional, at least one should be provided. Both can be updated at the same time.::
               values.name (string): the name for the template - names must be unique and a max of 50 bytes
               values.html (string): a string specifying the entire template to be created. This is <strong>NOT</strong> campaign content. They are intended to utilize our <a href="http://www.mailchimp.com/resources/email-template-language/" target="_blank">template language</a>.
               values.folder_id (int): the folder to put this template in - 0 or a blank values will remove it from a folder.

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           InvalidTemplateError:
           InvalidOptionsError:
           InvalidFolderError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'template_id': template_id, 'values': values}
        return self.master.call('templates/update', _params)


class Users(object):
    def __init__(self, master):
        self.master = master

    def invite(self, email, role='viewer', msg=''):
        """Invite a user to your account

        Args:
           email (string): A valid email address to send the invitation to
           role (string): the role to assign to the user - one of viewer, author, manager, admin. defaults to viewer. More details <a href="http://kb.mailchimp.com/article/can-we-have-multiple-users-on-our-account-with-limited-access" target="_blank">here</a>
           msg (string): an optional message to include. Plain text any HTML tags will be stripped.

        Returns:
           struct.  the method completion status::
               status (string): The status (success) of the call if it completed. Otherwise an error is thrown.

        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'email': email, 'role': role, 'msg': msg}
        return self.master.call('users/invite', _params)

    def invite_resend(self, email):
        """Resend an invite a user to your account. Note, if the same address has been invited multiple times, this will simpy re-send the most recent invite

        Args:
           email (string): A valid email address to resend an invitation to

        Returns:
           struct.  the method completion status::
               status (string): The status (success) of the call if it completed. Otherwise an error is thrown.

        Raises:
           UserInvalidActionError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'email': email}
        return self.master.call('users/invite-resend', _params)

    def invite_revoke(self, email):
        """Revoke an invitation sent to a user to your account. Note, if the same address has been invited multiple times, this will simpy revoke the most recent invite

        Args:
           email (string): A valid email address to send the invitation to

        Returns:
           struct.  the method completion status::
               status (string): The status (success) of the call if it completed. Otherwise an error is thrown.

        Raises:
           UserInvalidActionError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'email': email}
        return self.master.call('users/invite-revoke', _params)

    def invites(self, ):
        """Retrieve the list of pending users invitations have been sent for.

        Returns:
           array.  structs for each invitation, including:::
               email (string): the email address the invitation was sent to
               role (string): the role that will be assigned if they accept
               sent_at (string): the time the invitation was sent. this will change if it's resent.
               expiration (string): the expiration time for the invitation. this will change if it's resent.
               msg (string): the welcome message included with the invitation

        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {}
        return self.master.call('users/invites', _params)

    def login_revoke(self, username):
        """Revoke access for a specified login

        Args:
           username (string): The username of the login to revoke access of

        Returns:
           struct.  the method completion status::
               status (string): The status (success) of the call if it completed. Otherwise an error is thrown.

        Raises:
           UserInvalidActionError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'username': username}
        return self.master.call('users/login-revoke', _params)

    def logins(self, ):
        """Retrieve the list of active logins.

        Returns:
           array.  structs for each user, including:::
               id (int): the login id for this login
               username (string): the username used to log in
               name (string): a display name for the account - empty first/last names will return the username
               email (string): the email tied to the account used for passwords resets and the ilk
               role (string): the role assigned to the account
               avatar (string): if available, the url for the login's avatar

        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {}
        return self.master.call('users/logins', _params)

    def profile(self, ):
        """Retrieve the profile for the login owning the provided API Key

        Returns:
           struct.  the current user's details, including:::
               id (int): the login id for this login
               username (string): the username used to log in
               name (string): a display name for the account - empty first/last names will return the username
               email (string): the email tied to the account used for passwords resets and the ilk
               role (string): the role assigned to the account
               avatar (string): if available, the url for the login's avatar

        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {}
        return self.master.call('users/profile', _params)


class Helper(object):
    def __init__(self, master):
        self.master = master

    def account_details(self, exclude=[]):
        """Retrieve lots of account information including payments made, plan info, some account stats, installed modules,
contact info, and more. No private information like Credit Card numbers is available.

        Args:
           exclude (array): defaults to nothing for backwards compatibility. Allows controlling which extra arrays are returned since they can slow down calls. Valid keys are "modules", "orders", "rewards-credits", "rewards-inspections", "rewards-referrals", "rewards-applied", "integrations". Hint: "rewards-referrals" is typically the culprit. To avoid confusion, if data is excluded, the corresponding key <strong>will not be returned at all</strong>.

        Returns:
           struct.  containing the details for the account tied to this API Key::
               username (string): The Account username
               user_id (string): The Account user unique id (for building some links)
               is_trial (bool): Whether the Account is in Trial mode (can only send campaigns to less than 100 emails)
               is_approved (bool): Whether the Account has been approved for purchases
               has_activated (bool): Whether the Account has been activated
               timezone (string): The timezone for the Account - default is "US/Eastern"
               plan_type (string): Plan Type - "monthly", "payasyougo", or "free"
               plan_low (int): <em>only for Monthly plans</em> - the lower tier for list size
               plan_high (int): <em>only for Monthly plans</em> - the upper tier for list size
               plan_start_date (string): <em>only for Monthly plans</em> - the start date for a monthly plan
               emails_left (int): <em>only for Free and Pay-as-you-go plans</em> emails credits left for the account
               pending_monthly (bool): Whether the account is finishing Pay As You Go credits before switching to a Monthly plan
               first_payment (string): date of first payment
               last_payment (string): date of most recent payment
               times_logged_in (int): total number of times the account has been logged into via the web
               last_login (string): date/time of last login via the web
               affiliate_link (string): Monkey Rewards link for our Affiliate program
               industry (string): the user's selected industry
               contact (struct): Contact details for the account::
                   contact.fname (string): First Name
                   contact.lname (string): Last Name
                   contact.email (string): Email Address
                   contact.company (string): Company Name
                   contact.address1 (string): Address Line 1
                   contact.address2 (string): Address Line 2
                   contact.city (string): City
                   contact.state (string): State or Province
                   contact.zip (string): Zip or Postal Code
                   contact.country (string): Country name
                   contact.url (string): Website URL
                   contact.phone (string): Phone number
                   contact.fax (string): Fax number

               modules (array): a struct for each addon module installed in the account::
                   modules.id (string): An internal module id
                   modules.name (string): The module name
                   modules.added (string): The date the module was added
                   modules.data (struct): Any extra data associated with this module as key=>value pairs

               orders (array): a struct for each order for the account::
                   orders.order_id (int): The order id
                   orders.type (string): The order type - either "monthly" or "credits"
                   orders.amount (double): The order amount
                   orders.date (string): The order date
                   orders.credits_used (double): The total credits used

               rewards (struct): Rewards details for the account including credits & inspections earned, number of referrals, referral details, and rewards used::
                   rewards.referrals_this_month (int): the total number of referrals this month
                   rewards.notify_on (string): whether or not we notify the user when rewards are earned
                   rewards.notify_email (string): the email address address used for rewards notifications
                   rewards.credits (struct): Email credits earned:::
                       rewards.credits.this_month (int): credits earned this month
                       rewards.credits.total_earned (int): credits earned all time
                       rewards.credits.remaining (int): credits remaining

                   rewards.inspections (struct): Inbox Inspections earned:::
                       rewards.inspections.this_month (int): credits earned this month
                       rewards.inspections.total_earned (int): credits earned all time
                       rewards.inspections.remaining (int): credits remaining

                   rewards.referrals (array): a struct for each referral, including:::
                       rewards.referrals.name (string): the name of the account
                       rewards.referrals.email (string): the email address associated with the account
                       rewards.referrals.signup_date (string): the signup date for the account
                       rewards.referrals.type (string): the source for the referral

                   rewards.applied (array): a struct for each applied rewards, including:::
                       rewards.applied.value (int): the number of credits user
                       rewards.applied.date (string): the date applied
                       rewards.applied.order_id (int): the order number credits were applied to
                       rewards.applied.order_desc (string): the order description


               integrations (array): a struct for each connected integrations that can be used with campaigns, including:::
                   integrations.id (int): an internal id for the integration
                   integrations.name (string): the integration name
                   integrations.list_id (string): either "_any_" when globally accessible or the list id it's valid for use against
                   integrations.user_id (string): if applicable, the user id for the integrated system
                   integrations.account (string): if applicable, the user/account name for the integrated system
                   integrations.profiles (array): For Facebook, users/page that can be posted to.::
                       integrations.profiles.id (string): the user or page id
                       integrations.profiles.name (string): the user or page name
                       integrations.profiles.is_page (bool): whether this is a user or a page



        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'exclude': exclude}
        return self.master.call('helper/account-details', _params)

    def campaigns_for_email(self, email, options=None):
        """Retrieve minimal data for all Campaigns a member was sent

        Args:
           email (struct): a struct with one fo the following keys - failing to provide anything will produce an error relating to the email address::
               email.email (string): an email address
               email.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               email.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes
           options (struct): optional extra options to modify the returned data.::
               options.list_id (string): optional A list_id to limit the campaigns to

        Returns:
           array.  an array of structs containing campaign data for each matching campaign (ordered by send time ascending), including:::
               id (string): the campaign unique id
               title (string): the campaign's title
               subject (string): the campaign's subject
               send_time (string): the time the campaign was sent
               type (string): the campaign type

        Raises:
           ListDoesNotExistError:
           EmailNotExistsError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'email': email, 'options': options}
        return self.master.call('helper/campaigns-for-email', _params)

    def chimp_chatter(self, ):
        """Return the current Chimp Chatter messages for an account.

        Returns:
           array.  An array of structs containing data for each chatter message::
               message (string): The chatter message
               type (string): The type of the message - one of lists:new-subscriber, lists:unsubscribes, lists:profile-updates, campaigns:facebook-likes, campaigns:facebook-comments, campaigns:forward-to-friend, lists:imports, or campaigns:inbox-inspections
               url (string): a url into the web app that the message could link to, if applicable
               list_id (string): the list_id a message relates to, if applicable. Deleted lists will return -DELETED-
               campaign_id (string): the list_id a message relates to, if applicable. Deleted campaigns will return -DELETED-
               update_time (string): The date/time the message was last updated

        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {}
        return self.master.call('helper/chimp-chatter', _params)

    def generate_text(self, type, content):
        """Have HTML content auto-converted to a text-only format. You can send: plain HTML, an existing Campaign Id, or an existing Template Id. Note that this will <strong>not</strong> save anything to or update any of your lists, campaigns, or templates.
It's also not just Lynx and is very fine tuned for our template layouts - your mileage may vary.

        Args:
           type (string): The type of content to parse. Must be one of: "html", "url", "cid" (Campaign Id), "user_template_id", "base_template_id", "gallery_template_id"
           content (struct): The content to use. The key names should be the same as type and while listed as optional, may cause errors if the content is obviously required (ie, html)::
               content.html (string): optional a single string value,
               content.cid (string): a valid Campaign Id
               content.user_template_id (string): the id of a user template
               content.base_template_id (string): the id of a built in base/basic template
               content.gallery_template_id (string): the id of a built in gallery template
               content.url (string): a valid & public URL to pull html content from

        Returns:
           struct.  the content pass in converted to text.::
               text (string): the converted html

        Raises:
           InvalidOptionsError:
           CampaignInvalidTemplateError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'type': type, 'content': content}
        return self.master.call('helper/generate-text', _params)

    def inline_css(self, html, strip_css=False):
        """Send your HTML content to have the CSS inlined and optionally remove the original styles.

        Args:
           html (string): Your HTML content
           strip_css (bool): optional Whether you want the CSS &lt;style&gt; tags stripped from the returned document. Defaults to false.

        Returns:
           struct.  with a "html" key::
               html (string): Your HTML content with all CSS inlined, just like if we sent it.

        Raises:
           CampaignInvalidContentError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'html': html, 'strip_css': strip_css}
        return self.master.call('helper/inline-css', _params)

    def lists_for_email(self, email):
        """Retrieve minimal List data for all lists a member is subscribed to.

        Args:
           email (struct): a struct with one fo the following keys - failing to provide anything will produce an error relating to the email address::
               email.email (string): an email address
               email.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               email.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes

        Returns:
           array.  An array of structs with info on the  list_id the member is subscribed to.::
               id (string): the list unique id
               the (web_id): id referenced in web interface urls
               the (name): list name

        Raises:
           ListNotSubscribedError:
           EmailNotExistsError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'email': email}
        return self.master.call('helper/lists-for-email', _params)

    def ping(self, ):
        """"Ping" the MailChimp API - a simple method you can call that will return a constant value as long as everything is good. Note
than unlike most all of our methods, we don't throw an Exception if we are having issues. You will simply receive a different
string back that will explain our view on what is going on.

        Returns:
           struct.  a with a "msg" key::
               msg (string): containing "Everything's Chimpy!" if everything is chimpy, otherwise returns an error message

        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {}
        return self.master.call('helper/ping', _params)

    def search_campaigns(self, query, offset=0, snip_start=None, snip_end=None):
        """Search all campaigns for the specified query terms

        Args:
           query (string): terms to search on
           offset (int): optional the paging offset to use if more than 100 records match
           snip_start (string): optional by default clear text is returned. To have the match highlighted with something (like a strong HTML tag), <strong>both</strong> this and "snip_end" must be passed. You're on your own to not break the tags - 25 character max.
           snip_end (string): optional see "snip_start" above.

        Returns:
           struct.  containing the total matches and current results::
               total (int): total campaigns matching
               results (array): matching campaigns and snippets
               snippet (string): the matching snippet for the campaign
               campaign (struct): the matching campaign's details - will return same data as single campaign from campaigns/list()
               summary (struct): if available, the matching campaign's report/summary data, other wise empty

        Raises:
           InvalidOptionsError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'query': query, 'offset': offset, 'snip_start': snip_start, 'snip_end': snip_end}
        return self.master.call('helper/search-campaigns', _params)

    def search_members(self, query, id=None, offset=0):
        """Search account wide or on a specific list using the specified query terms

        Args:
           query (string): terms to search on, <a href="http://kb.mailchimp.com/article/i-cant-find-a-recipient-on-my-list" target="_blank">just like you do in the app</a>
           id (string): optional the list id to limit the search to. Get by calling lists/list()
           offset (int): optional the paging offset to use if more than 100 records match

        Returns:
           struct.  An array of both exact matches and partial matches over a full search::
               exact_matches (struct): containing the total matches and current results
               total (int): total members matching
               members (array): each entry will be struct matching the data format for a single member as returned by lists/member-info()
               full_search (struct): containing the total matches and current results
               total (int): total members matching
               members (array): each entry will be struct matching  the data format for a single member as returned by lists/member-info()

        Raises:
           InvalidOptionsError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'query': query, 'id': id, 'offset': offset}
        return self.master.call('helper/search-members', _params)

    def verified_domains(self, ):
        """Retrieve all domain verification records for an account

        Returns:
           array.  structs for each domain verification has been attempted for::
               domain (string): the verified domain
               status (string): the status of the verification - either "verified" or "pending"
               email (string): the email address used for verification - "pre-existing" if we automatically backfilled it at some point

        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {}
        return self.master.call('helper/verified-domains', _params)


class Mobile(object):
    def __init__(self, master):
        self.master = master


class Ecomm(object):
    def __init__(self, master):
        self.master = master

    def order_add(self, order):
        """Import Ecommerce Order Information to be used for Segmentation. This will generally be used by ecommerce package plugins
<a href="http://connect.mailchimp.com/category/ecommerce" target="_blank">provided by us or by 3rd part system developers</a>.

        Args:
           order (struct): information pertaining to the order that has completed. Use the following keys:::
               order.id (string): the Order Id
               order.campaign_id (string): optional the Campaign Id to track this order against (see the "mc_cid" query string variable a campaign passes)
               order.email_id (string): optional (kind of) the Email Id of the subscriber we should attach this order to (see the "mc_eid" query string variable a campaign passes) - required if campaign_id is passed, otherwise either this or <strong>email</strong> is required. If both are provided, email_id takes precedence
               order.email (string): optional (kind of) the Email Address we should attach this order to - either this or <strong>email_id</strong> is required. If both are provided, email_id takes precedence
               order.total (double): The Order Total (ie, the full amount the customer ends up paying)
               order.order_date (string): optional the date of the order - if this is not provided, we will default the date to now. Should be in the format of 2012-12-30
               order.shipping (double): optional the total paid for Shipping Fees
               order.tax (double): optional the total tax paid
               order.store_id (string): a unique id for the store sending the order in (32 bytes max)
               order.store_name (string): optional a "nice" name for the store - typically the base web address (ie, "store.mailchimp.com"). We will automatically update this if it changes (based on store_id)
               order.items (array): structs for each individual line item including:::
                   order.items.line_num (int): optional the line number of the item on the order. We will generate these if they are not passed
                   order.items.product_id (int): the store's internal Id for the product. Lines that do no contain this will be skipped
                   order.items.sku (string): optional the store's internal SKU for the product. (max 30 bytes)
                   order.items.product_name (string): the product name for the product_id associated with this item. We will auto update these as they change (based on product_id)
                   order.items.category_id (int): the store's internal Id for the (main) category associated with this product. Our testing has found this to be a "best guess" scenario
                   order.items.category_name (string): the category name for the category_id this product is in. Our testing has found this to be a "best guess" scenario. Our plugins walk the category heirarchy up and send "Root - SubCat1 - SubCat4", etc.
                   order.items.qty (double): optional the quantity of the item ordered - defaults to 1
                   order.items.cost (double): optional the cost of a single item (ie, not the extended cost of the line) - defaults to 0


        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListDoesNotExistError:
           InvalidEmailError:
           InvalidEcommOrderError:
           InvalidDateTimeError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'order': order}
        return self.master.call('ecomm/order-add', _params)

    def order_del(self, store_id, order_id):
        """Delete Ecommerce Order Information used for segmentation. This will generally be used by ecommerce package plugins
<a href="/plugins/ecomm360.phtml">that we provide</a> or by 3rd part system developers.

        Args:
           store_id (string): the store id the order belongs to
           order_id (string): the order id (generated by the store) to delete

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           InvalidEcommOrderError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'store_id': store_id, 'order_id': order_id}
        return self.master.call('ecomm/order-del', _params)

    def orders(self, cid=None, start=0, limit=100, since=None):
        """Retrieve the Ecommerce Orders for an account

        Args:
           cid (string): if set, limit the returned orders to a particular campaign
           start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
           limit (int): optional for large data sets, the number of results to return - defaults to 100, upper limit set at 500
           since (string): optional pull only messages since this time - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00"

        Returns:
           struct.  the total matching orders and the specific orders for the requested page::
               total (int): the total matching orders
               data (array): structs for each order being returned::
                   data.store_id (string): the store id generated by the plugin used to uniquely identify a store
                   data.store_name (string): the store name collected by the plugin - often the domain name
                   data.order_id (string): the internal order id the store tracked this order by
                   data.email (string): the email address that received this campaign and is associated with this order
                   data.order_total (double): the order total
                   data.tax_total (double): the total tax for the order (if collected)
                   data.ship_total (double): the shipping total for the order (if collected)
                   data.order_date (string): the date the order was tracked - from the store if possible, otherwise the GMT time we received it
                   data.items (array): structs for each line item on this order.:::
                       data.items.line_num (int): the line number
                       data.items.product_id (int): the product id
                       data.items.product_name (string): the product name
                       data.items.product_sku (string): the sku for the product
                       data.items.product_category_id (int): the category id for the product
                       data.items.product_category_name (string): the category name for the product
                       data.items.qty (int): the quantity ordered
                       data.items.cost (double): the cost of the item



        Raises:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           InvalidDateTimeError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'start': start, 'limit': limit, 'since': since}
        return self.master.call('ecomm/orders', _params)


class Neapolitan(object):
    def __init__(self, master):
        self.master = master


class Lists(object):
    def __init__(self, master):
        self.master = master

    def abuse_reports(self, id, start=0, limit=500, since=None):
        """Get all email addresses that complained about a campaign sent to a list

        Args:
           id (string): the list id to pull abuse reports for (can be gathered using lists/list())
           start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
           limit (int): optional for large data sets, the number of results to return - defaults to 500, upper limit set at 1000
           since (string): optional pull only messages since this time - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00"

        Returns:
           struct.  the total of all reports and the specific reports reports this page::
               total (int): the total number of matching abuse reports
               data (array): structs for the actual data for each reports, including:::
                   data.date (string): date+time the abuse report was received and processed
                   data.email (string): the email address that reported abuse
                   data.campaign_id (string): the unique id for the campaign that report was made against
                   data.type (string): an internal type generally specifying the originating mail provider - may not be useful outside of filling report views


        Raises:
           ListDoesNotExistError:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           InvalidDateTimeError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'start': start, 'limit': limit, 'since': since}
        return self.master.call('lists/abuse-reports', _params)

    def activity(self, id):
        """Access up to the previous 180 days of daily detailed aggregated activity stats for a given list. Does not include AutoResponder activity.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()

        Returns:
           array.  of structs containing daily values, each containing:

        Raises:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id}
        return self.master.call('lists/activity', _params)

    def batch_subscribe(self, id, batch, double_optin=True, update_existing=False, replace_interests=True):
        """Subscribe a batch of email addresses to a list at once. If you are using a serialized version of the API, we strongly suggest that you
only run this method as a POST request, and <em>not</em> a GET request. Maximum batch sizes vary based on the amount of data in each record,
though you should cap them at 5k - 10k records, depending on your experience. These calls are also long, so be sure you increase your timeout values.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           batch (array): an array of structs for each address using the following keys:::
               batch.email (struct): a struct with one of the following keys - failing to provide anything will produce an error relating to the email address. Provide multiples and we'll use the first we see in this same order.::
                   batch.email.email (string): an email address
                   batch.email.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
                   batch.email.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes

               batch.email_type (string): for the email type option (html or text)
               batch.merge_vars (struct): data for the various list specific and special merge vars documented in lists/subscribe
           double_optin (boolean): flag to control whether to send an opt-in confirmation email - defaults to true
           update_existing (boolean): flag to control whether to update members that are already subscribed to the list or to return an error, defaults to false (return error)
           replace_interests (boolean): flag to determine whether we replace the interest groups with the updated groups provided, or we add the provided groups to the member's interest groups (optional, defaults to true)

        Returns:
           struct.  struct of result counts and associated data::
               add_count (int): Number of email addresses that were successfully added
               adds (array): array of structs for each add::
                   adds.email (string): the email address added
                   adds.euid (string): the email unique id
                   adds.leid (string): the list member's truly unique id

               update_count (int): Number of email addresses that were successfully updated
               updates (array): array of structs for each update::
                   updates.email (string): the email address added
                   updates.euid (string): the email unique id
                   updates.leid (string): the list member's truly unique id

               error_count (int): Number of email addresses that failed during addition/updating
               errors (array): array of error structs including:::
                   errors.email (string): whatever was passed in the batch record's email parameter::
                       errors.email.email (string): the email address added
                       errors.email.euid (string): the email unique id
                       errors.email.leid (string): the list member's truly unique id

                   errors.code (int): the error code
                   errors.error (string): the full error message
                   errors.row (struct): the row from the batch that caused the error


        Raises:
           InvalidOptionsError:
           ListDoesNotExistError:
           ListAlreadySubscribedError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'batch': batch, 'double_optin': double_optin, 'update_existing': update_existing, 'replace_interests': replace_interests}
        return self.master.call('lists/batch-subscribe', _params)

    def batch_unsubscribe(self, id, batch, delete_member=False, send_goodbye=True, send_notify=False):
        """Unsubscribe a batch of email addresses from a list

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           batch (array): array of structs to unsubscribe, each with one of the following keys - failing to provide anything will produce an error relating to the email address. Provide multiples and we'll use the first we see in this same order.::
               batch.email (string): an email address
               batch.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               batch.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes
           delete_member (boolean): flag to completely delete the member from your list instead of just unsubscribing, default to false
           send_goodbye (boolean): flag to send the goodbye email to the email addresses, defaults to true
           send_notify (boolean): flag to send the unsubscribe notification email to the address defined in the list email notification settings, defaults to false

        Returns:
           array.  Array of structs containing results and any errors that occurred::
               success_count (int): Number of email addresses that were successfully removed
               error_count (int): Number of email addresses that failed during addition/updating
               of (array): structs contain error details including:
               errors (array): array of error structs including:::
                   errors.email (string): whatever was passed in the batch record's email parameter::
                       errors.email.email (string): the email address added
                       errors.email.euid (string): the email unique id
                       errors.email.leid (string): the list member's truly unique id

                   errors.code (int): the error code
                   errors.error (string): the full error message


        Raises:
           InvalidOptionsError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'batch': batch, 'delete_member': delete_member, 'send_goodbye': send_goodbye, 'send_notify': send_notify}
        return self.master.call('lists/batch-unsubscribe', _params)

    def clients(self, id):
        """Retrieve the clients that the list's subscribers have been tagged as being used based on user agents seen. Made possible by <a href="http://user-agent-string.info" target="_blank">user-agent-string.info</a>

        Args:
           id (string): the list id to connect to. Get by calling lists/list()

        Returns:
           struct.  the desktop and mobile user agents in use on the list::
               desktop (struct): desktop user agents and percentages::
                   desktop.penetration (double): the percent of desktop clients in use
                   desktop.clients (array): array of structs for each client including:::
                       desktop.clients.client (string): the common name for the client
                       desktop.clients.icon (string): a url to an image representing this client
                       desktop.clients.percent (string): percent of list using the client
                       desktop.clients.members (string): total members using the client


               mobile (struct): mobile user agents and percentages::
                   mobile.penetration (double): the percent of mobile clients in use
                   mobile.clients (array): array of structs for each client including:::
                       mobile.clients.client (string): the common name for the client
                       mobile.clients.icon (string): a url to an image representing this client
                       mobile.clients.percent (string): percent of list using the client
                       mobile.clients.members (string): total members using the client



        Raises:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id}
        return self.master.call('lists/clients', _params)

    def growth_history(self, id=None):
        """Access the Growth History by Month in aggregate or for a given list.

        Args:
           id (string): optional - if provided, the list id to connect to. Get by calling lists/list(). Otherwise the aggregate for the account.

        Returns:
           array.  array of structs containing months and growth data::
               month (string): The Year and Month in question using YYYY-MM format
               existing (int): number of existing subscribers to start the month
               imports (int): number of subscribers imported during the month
               optins (int): number of subscribers who opted-in during the month

        Raises:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id}
        return self.master.call('lists/growth-history', _params)

    def interest_groupings(self, id, counts=False):
        """Get the list of interest groupings for a given list, including the label, form information, and included groups for each

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           counts (bool): optional whether or not to return subscriber counts for each group. defaults to false since that slows this call down a ton for large lists.

        Returns:
           array.  array of structs of the interest groupings for the list::
               id (int): The id for the Grouping
               name (string): Name for the Interest groups
               form_field (string): Gives the type of interest group: checkbox,radio,select
               groups (array): Array structs of the grouping options (interest groups) including:::
                   groups.bit (string): the bit value - not really anything to be done with this
                   groups.name (string): the name of the group
                   groups.display_order (string): the display order of the group, if set
                   groups.subscribers (int): total number of subscribers who have this group if "counts" is true. otherwise empty


        Raises:
           ListInvalidOptionError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'counts': counts}
        return self.master.call('lists/interest-groupings', _params)

    def interest_group_add(self, id, group_name, grouping_id=None):
        """Add a single Interest Group - if interest groups for the List are not yet enabled, adding the first
group will automatically turn them on.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           group_name (string): the interest group to add - group names must be unique within a grouping
           grouping_id (int): optional The grouping to add the new group to - get using lists/interest-groupings() . If not supplied, the first grouping on the list is used.

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'group_name': group_name, 'grouping_id': grouping_id}
        return self.master.call('lists/interest-group-add', _params)

    def interest_group_del(self, id, group_name, grouping_id=None):
        """Delete a single Interest Group - if the last group for a list is deleted, this will also turn groups for the list off.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           group_name (string): the interest group to delete
           grouping_id (int): The grouping to delete the group from - get using lists/interest-groupings() . If not supplied, the first grouping on the list is used.

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListInvalidOptionError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'group_name': group_name, 'grouping_id': grouping_id}
        return self.master.call('lists/interest-group-del', _params)

    def interest_group_update(self, id, old_name, new_name, grouping_id=None):
        """Change the name of an Interest Group

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           old_name (string): the interest group name to be changed
           new_name (string): the new interest group name to be set
           grouping_id (int): optional The grouping to delete the group from - get using lists/interest-groupings() . If not supplied, the first grouping on the list is used.

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListInvalidOptionError:
           ListInvalidInterestGroupError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'old_name': old_name, 'new_name': new_name, 'grouping_id': grouping_id}
        return self.master.call('lists/interest-group-update', _params)

    def interest_grouping_add(self, id, name, type, groups):
        """Add a new Interest Grouping - if interest groups for the List are not yet enabled, adding the first
grouping will automatically turn them on.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           name (string): the interest grouping to add - grouping names must be unique
           type (string): The type of the grouping to add - one of "checkboxes", "hidden", "dropdown", "radio"
           groups (array): The lists of initial group names to be added - at least 1 is required and the names must be unique within a grouping. If the number takes you over the 60 group limit, an error will be thrown.

        Returns:
           struct.  with a single entry:::
               id (int): the new grouping id if the request succeeds, otherwise an error will be thrown

        Raises:
           ListInvalidOptionError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'name': name, 'type': type, 'groups': groups}
        return self.master.call('lists/interest-grouping-add', _params)

    def interest_grouping_del(self, grouping_id):
        """Delete an existing Interest Grouping - this will permanently delete all contained interest groups and will remove those selections from all list members

        Args:
           grouping_id (int): the interest grouping id - get from lists/interest-groupings()

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListInvalidOptionError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'grouping_id': grouping_id}
        return self.master.call('lists/interest-grouping-del', _params)

    def interest_grouping_update(self, grouping_id, name, value):
        """Update an existing Interest Grouping

        Args:
           grouping_id (int): the interest grouping id - get from lists/interest-groupings()
           name (string): The name of the field to update - either "name" or "type". Groups within the grouping should be manipulated using the standard listInterestGroup* methods
           value (string): The new value of the field. Grouping names must be unique - only "hidden" and "checkboxes" grouping types can be converted between each other.

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListInvalidOptionError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'grouping_id': grouping_id, 'name': name, 'value': value}
        return self.master.call('lists/interest-grouping-update', _params)

    def locations(self, id):
        """Retrieve the locations (countries) that the list's subscribers have been tagged to based on geocoding their IP address

        Args:
           id (string): the list id to connect to. Get by calling lists/list()

        Returns:
           array.  array of locations::
               country (string): the country name
               cc (string): the ISO 3166 2 digit country code
               percent (double): the percent of subscribers in the country
               total (double): the total number of subscribers in the country

        Raises:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id}
        return self.master.call('lists/locations', _params)

    def member_activity(self, id, emails):
        """Get the most recent 100 activities for particular list members (open, click, bounce, unsub, abuse, sent to, etc.)

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           emails (array): an array of up to 50 email structs, each with with one of the following keys::
               emails.email (string): an email address - for new subscribers obviously this should be used
               emails.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               emails.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes

        Returns:
           struct.  of data and success/error counts::
               success_count (int): the number of subscribers successfully found on the list
               error_count (int): the number of subscribers who were not found on the list
               errors (array): array of error structs including:::
                   errors.email (string): whatever was passed in the email parameter::
                       errors.email.email (string): the email address added
                       errors.email.euid (string): the email unique id
                       errors.email.leid (string): the list member's truly unique id

                   errors.error (string): the error message
                   errors.code (string): the error code

               data (array): an array of structs where each activity record has:::
                   data.email (string): whatever was passed in the email parameter::
                       data.email.email (string): the email address added
                       data.email.euid (string): the email unique id
                       data.email.leid (string): the list member's truly unique id

                   data.activity (array): an array of structs containing the activity, including:::
                       data.activity.action (string): The action name, one of: open, click, bounce, unsub, abuse, sent, queued, ecomm, mandrill_send, mandrill_hard_bounce, mandrill_soft_bounce, mandrill_open, mandrill_click, mandrill_spam, mandrill_unsub, mandrill_reject
                       data.activity.timestamp (string): The date+time of the action (GMT)
                       data.activity.url (string): For click actions, the url clicked, otherwise this is empty
                       data.activity.type (string): If there's extra bounce, unsub, etc data it will show up here.
                       data.activity.campaign_id (string): The campaign id the action was related to, if it exists - otherwise empty (ie, direct unsub from list)
                       data.activity.campaign_data (struct): If not deleted, the campaigns/list data for the campaign



        Raises:
           InvalidOptionsError:
           EmailNotExistsError:
           ListDoesNotExistError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'emails': emails}
        return self.master.call('lists/member-activity', _params)

    def member_info(self, id, emails):
        """Get all the information for particular members of a list

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           emails (array): an array of up to 50 email structs, each with with one of the following keys::
               emails.email (string): an email address - for new subscribers obviously this should be used
               emails.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               emails.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes

        Returns:
           struct.  of data and success/error counts::
               success_count (int): the number of subscribers successfully found on the list
               error_count (int): the number of subscribers who were not found on the list
               errors (array): array of error structs including:::
                   errors.email (struct): whatever was passed in the email parameter::
                       errors.email.email (string): the email address added
                       errors.email.euid (string): the email unique id
                       errors.email.leid (string): the list member's truly unique id

                   errors.error (string): the error message

               data (array): array of structs for each valid list member::
                   data.id (string): The unique id (euid) for this email address on an account
                   data.email (string): The email address associated with this record
                   data.email_type (string): The type of emails this customer asked to get: html or text
                   data.merges (struct): a struct containing a key for each merge tags and the data for those tags for this email address, plus:::
                       data.merges.GROUPINGS (array): if Interest groupings are enabled, this will exist with structs for each grouping:::
                           data.merges.GROUPINGS.id (int): the grouping id
                           data.merges.GROUPINGS.name (string): the interest group name
                           data.merges.GROUPINGS.groups (array): structs for each group in the grouping::
                               data.merges.GROUPINGS.groups.name (string): the group name
                               data.merges.GROUPINGS.groups.interested (bool): whether the member has this group selected



                   data.status (string): The subscription status for this email address, either pending, subscribed, unsubscribed, or cleaned
                   data.ip_signup (string): IP Address this address signed up from. This may be blank if single optin is used.
                   data.timestamp_signup (string): The date+time the double optin was initiated. This may be blank if single optin is used.
                   data.ip_opt (string): IP Address this address opted in from.
                   data.timestamp_opt (string): The date+time the optin completed
                   data.member_rating (int): the rating of the subscriber. This will be 1 - 5 as described <a href="http://eepurl.com/f-2P" target="_blank">here</a>
                   data.campaign_id (string): If the user is unsubscribed and they unsubscribed from a specific campaign, that campaign_id will be listed, otherwise this is not returned.
                   data.lists (array): An array of structs for the other lists this member belongs to::
                       data.lists.id (string): the list id
                       data.lists.status (string): the members status on that list

                   data.timestamp (string): The date+time this email address entered it's current status
                   data.info_changed (string): The last time this record was changed. If the record is old enough, this may be blank.
                   data.web_id (int): The Member id used in our web app, allows you to create a link directly to it
                   data.leid (int): The Member id used in our web app, allows you to create a link directly to it
                   data.list_id (string): The list id the for the member record being returned
                   data.list_name (string): The list name the for the member record being returned
                   data.language (string): if set/detected, a language code from <a href="http://kb.mailchimp.com/article/can-i-see-what-languages-my-subscribers-use#code" target="_blank">here</a>
                   data.is_gmonkey (bool): Whether the member is a <a href="http://mailchimp.com/features/golden-monkeys/" target="_blank">Golden Monkey</a> or not.
                   data.geo (struct): the geographic information if we have it. including:::
                       data.geo.latitude (string): the latitude
                       data.geo.longitude (string): the longitude
                       data.geo.gmtoff (string): GMT offset
                       data.geo.dstoff (string): GMT offset during daylight savings (if DST not observered, will be same as gmtoff)
                       data.geo.timezone (string): the timezone we've place them in
                       data.geo.cc (string): 2 digit ISO-3166 country code
                       data.geo.region (string): generally state, province, or similar

                   data.clients (struct): the client we've tracked the address as using with two keys:::
                       data.clients.name (string): the common name of the client
                       data.clients.icon_url (string): a url representing a path to an icon representing this client

                   data.static_segments (array): structs for each static segments the member is a part of including:::
                       data.static_segments.id (int): the segment id
                       data.static_segments.name (string): the name given to the segment
                       data.static_segments.added (string): the date the member was added

                   data.notes (array): structs for each note entered for this member. For each note:::
                       data.notes.id (int): the note id
                       data.notes.note (string): the text entered
                       data.notes.created (string): the date the note was created
                       data.notes.updated (string): the date the note was last updated
                       data.notes.created_by_name (string): the name of the user who created the note. This can change as users update their profile.



        Raises:
           InvalidOptionsError:
           EmailNotExistsError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'emails': emails}
        return self.master.call('lists/member-info', _params)

    def members(self, id, status='subscribed', opts=[]):
        """Get all of the list members for a list that are of a particular status and potentially matching a segment. This will cause locking, so don't run multiples at once. Are you trying to get a dump including lots of merge
data or specific members of a list? If so, checkout the <a href="/export/1.0/list.func.php">List Export API</a>

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           status (string): the status to get members for - one of(subscribed, unsubscribed, <a target="_blank" href="http://eepurl.com/gWOO">cleaned</a>), defaults to subscribed
           opts (struct): various options for controlling returned data::
               opts.start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
               opts.limit (int): optional for large data sets, the number of results to return - defaults to 25, upper limit set at 100
               opts.sort_field (string): optional the data field to sort by - mergeX (1-30), your custom merge tags, "email", "rating","last_update_time", or "optin_time" - invalid fields will be ignored
               opts.sort_dir (string): optional the direct - ASC or DESC. defaults to ASC (case insensitive)
               opts.segment (struct): a properly formatted segment that works with campaigns/segment-test

        Returns:
           struct.  of the total records matched and limited list member data for this page::
               total (int): the total matching records
               data (array): structs for each member as returned by member-info

        Raises:
           ListInvalidMergeFieldError:
           ListInvalidInterestGroupError:
           ListDoesNotExistError:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           InvalidOptionsError:
           InvalidDateTimeError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'status': status, 'opts': opts}
        return self.master.call('lists/members', _params)

    def merge_var_add(self, id, tag, name, options=[]):
        """Add a new merge tag to a given list

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           tag (string): The merge tag to add, e.g. FNAME. 10 bytes max, valid characters: "A-Z 0-9 _" no spaces, dashes, etc. Some tags and prefixes are <a href="http://kb.mailchimp.com/article/i-got-a-message-saying-that-my-list-field-name-is-reserved-and-cant-be-used" target="_blank">reserved</a>
           name (string): The long description of the tag being added, used for user displays - max 50 bytes
           options (struct): optional Various options for this merge var::
               options.field_type (string): optional one of: text, number, radio, dropdown, date, address, phone, url, imageurl, zip, birthday - defaults to text
               options.req (boolean): optional indicates whether the field is required - defaults to false
               options.public (boolean): optional indicates whether the field is displayed in public - defaults to true
               options.show (boolean): optional indicates whether the field is displayed in the app's list member view - defaults to true
               options.order (int): The order this merge tag should be displayed in - this will cause existing values to be reset so this fits
               options.default_value (string): optional the default value for the field. See lists/subscribe() for formatting info. Defaults to blank - max 255 bytes
               options.helptext (string): optional the help text to be used with some newer forms. Defaults to blank - max 255 bytes
               options.choices (array): optional kind of - an array of strings to use as the choices for radio and dropdown type fields
               options.dateformat (string): optional only valid for birthday and date fields. For birthday type, must be "MM/DD" (default) or "DD/MM". For date type, must be "MM/DD/YYYY" (default) or "DD/MM/YYYY". Any other values will be converted to the default.
               options.phoneformat (string): optional "US" is the default - any other value will cause them to be unformatted (international)
               options.defaultcountry (string): optional the <a href="http://www.iso.org/iso/english_country_names_and_code_elements" target="_blank">ISO 3166 2 digit character code</a> for the default country. Defaults to "US". Anything unrecognized will be converted to the default.

        Returns:
           struct.  the full data for the new merge var, just like merge-vars returns::
               name (string): Name/description of the merge field
               req (bool): Denotes whether the field is required (true) or not (false)
               field_type (string): The "data type" of this merge var. One of: email, text, number, radio, dropdown, date, address, phone, url, imageurl
               public (bool): Whether or not this field is visible to list subscribers
               show (bool): Whether the field is displayed in thelist dashboard
               order (string): The order this field displays in on forms
               default (string): The default value for this field
               helptext (string): The helptext for this field
               size (string): The width of the field to be used
               tag (string): The merge tag that's used for forms and lists/subscribe() and lists/update-member()
               choices (array): the options available for radio and dropdown field types
               id (int): an unchanging id for the merge var

        Raises:
           ListInvalidMergeFieldError:
           InvalidOptionsError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'tag': tag, 'name': name, 'options': options}
        return self.master.call('lists/merge-var-add', _params)

    def merge_var_del(self, id, tag):
        """Delete a merge tag from a given list and all its members. Seriously - the data is removed from all members as well!
Note that on large lists this method may seem a bit slower than calls you typically make.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           tag (string): The merge tag to delete

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListInvalidMergeFieldError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'tag': tag}
        return self.master.call('lists/merge-var-del', _params)

    def merge_var_reset(self, id, tag):
        """Completely resets all data stored in a merge var on a list. All data is removed and this action can not be undone.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           tag (string): The merge tag to reset

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListInvalidMergeFieldError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'tag': tag}
        return self.master.call('lists/merge-var-reset', _params)

    def merge_var_set(self, id, tag, value):
        """Sets a particular merge var to the specified value for every list member. Only merge var ids 1 - 30 may be modified this way. This is generally a dirty method
unless you're fixing data since you should probably be using default_values and/or conditional content. as with lists/merge-var-reset(), this can not be undone.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           tag (string): The merge tag to reset
           value (string): The value to set - see lists/subscribe() for formatting. Must validate to something non-empty.

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListInvalidMergeFieldError:
           InvalidOptionsError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'tag': tag, 'value': value}
        return self.master.call('lists/merge-var-set', _params)

    def merge_var_update(self, id, tag, options):
        """Update most parameters for a merge tag on a given list. You cannot currently change the merge type

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           tag (string): The merge tag to update
           options (struct): The options to change for a merge var. See lists/merge-var-add() for valid options. "tag" and "name" may also be used here.

        Returns:
           struct.  the full data for the new merge var, just like merge-vars returns::
               name (string): Name/description of the merge field
               req (bool): Denotes whether the field is required (true) or not (false)
               field_type (string): The "data type" of this merge var. One of: email, text, number, radio, dropdown, date, address, phone, url, imageurl
               public (bool): Whether or not this field is visible to list subscribers
               show (bool): Whether the field is displayed in thelist dashboard
               order (string): The order this field to displays in on forms
               default (string): The default value for this field
               helptext (string): The helptext for this field
               size (string): The width of the field to be used
               tag (string): The merge tag that's used for forms and lists/subscribe() and lists/update-member()
               choices (array): the options available for radio and dropdown field types
               id (int): an unchanging id for the merge var

        Raises:
           ListInvalidMergeFieldError:
           InvalidOptionsError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'tag': tag, 'options': options}
        return self.master.call('lists/merge-var-update', _params)

    def merge_vars(self, id):
        """Get the list of merge tags for a given list, including their name, tag, and required setting

        Args:
           id (array): the list ids to retrieve merge vars for. Get by calling lists/list() - max of 100

        Returns:
           struct.  of data and success/error counts::
               success_count (int): the number of subscribers successfully found on the list
               error_count (int): the number of subscribers who were not found on the list
               data (array): of structs for the merge tags on each list::
                   data.id (string): the list id
                   data.name (string): the list name
                   data.merge_vars (array): of structs for each merge var::
                       data.merge_vars.name (string): Name of the merge field
                       data.merge_vars.req (bool): Denotes whether the field is required (true) or not (false)
                       data.merge_vars.field_type (string): The "data type" of this merge var. One of the options accepted by field_type in lists/merge-var-add
                       data.merge_vars.public (bool): Whether or not this field is visible to list subscribers
                       data.merge_vars.show (bool): Whether the list owner has this field displayed on their list dashboard
                       data.merge_vars.order (string): The order the list owner has set this field to display in
                       data.merge_vars.default (string): The default value the list owner has set for this field
                       data.merge_vars.helptext (string): The helptext for this field
                       data.merge_vars.size (string): The width of the field to be used
                       data.merge_vars.tag (string): The merge tag that's used for forms and lists/subscribe() and listUpdateMember()
                       data.merge_vars.choices (array): For radio and dropdown field types, an array of the options available
                       data.merge_vars.id (int): an unchanging id for the merge var


               errors (array): of error structs::
                   errors.id (string): the passed list id that failed
                   errors.code (int): the resulting error code
                   errors.msg (string): the resulting error message


        Raises:
           InvalidOptionsError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id}
        return self.master.call('lists/merge-vars', _params)

    def segments(self, id, type=None):
        """Retrieve all of Segments for a list.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           type (string): optional, if specified should be "static" or "saved" and will limit the returned entries to that type

        Returns:
           struct.  with 2 keys:::
               static.id (int): the id of the segment
               created_date (string): the date+time the segment was created
               last_update (string): the date+time the segment was last updated (add or del)

        Raises:
           ListInvalidOptionError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'type': type}
        return self.master.call('lists/segments', _params)

    def segment_add(self, id, opts):
        """Save a segment against a list for later use. There is no limit to the number of segments which can be saved. Static Segments <strong>are not</strong> tied
to any merge data, interest groups, etc. They essentially allow you to configure an unlimited number of custom segments which will have standard performance.
When using proper segments, Static Segments are one of the available options for segmentation just as if you used a merge var (and they can be used with other segmentation
options), though performance may degrade at that point. Saved Segments (called "auto-updating" in the app) are essentially just the match+conditions typically
used.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           opts (struct): various options for the new segment::
               opts.type (string): either "static" or "saved"
               opts.name (string): a unique name per list for the segment - 100 byte maximum length, anything longer will throw an error
               opts.segment_opts (struct): for "saved" only, the standard segment match+conditions, just like campaigns/segment-test::
                   opts.segment_opts.match (string): "any" or "all"
                   opts.segment_opts.conditions (array): structs for each condition, just like campaigns/segment-test


        Returns:
           struct.  with a single entry:::
               id (int): the id of the new segment, otherwise an error will be thrown.

        Raises:
           ListInvalidOptionError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'opts': opts}
        return self.master.call('lists/segment-add', _params)

    def segment_del(self, id, seg_id):
        """Delete a segment. Note that this will, of course, remove any member affiliations with any static segments deleted

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           seg_id (int): the id of the static segment to delete - get from lists/static-segments()

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListInvalidOptionError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'seg_id': seg_id}
        return self.master.call('lists/segment-del', _params)

    def segment_test(self, list_id, options):
        """Allows one to test their segmentation rules before creating a campaign using them - this is no different from campaigns/segment-test() and will eventually replace it.
For the time being, the crazy segmenting condition documentation will continue to live over there.

        Args:
           list_id (string): the list to test segmentation on - get lists using lists/list()
           options (struct): with 1 or 2 keys:::
               options.saved_segment_id (string): a saved segment id from lists/segments() - this will take precendence, otherwise the match+conditions are required.
               options.match (string): controls whether to use AND or OR when applying your options - expects "<strong>any</strong>" (for OR) or "<strong>all</strong>" (for AND)
               options.conditions (array): of up to 5 structs for different criteria to apply while segmenting. Each criteria row must contain 3 keys - "<strong>field</strong>", "<strong>op</strong>", and "<strong>value</strong>" - and possibly a fourth, "<strong>extra</strong>", based on these definitions:

        Returns:
           struct.  with a single entry:::
               total (int): The total number of subscribers matching your segmentation options

        Raises:
           ListInvalidMergeFieldError:
           ListInvalidInterestGroupError:
           ListDoesNotExistError:
           InvalidOptionsError:
           InvalidDateTimeError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'list_id': list_id, 'options': options}
        return self.master.call('lists/segment-test', _params)

    def segment_update(self, id, seg_id, opts):
        """Update an existing segment. The list and type can not be changed.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           seg_id (int): the segment to updated. Get by calling lists/segments()
           opts (struct): various options to update::
               opts.name (string): a unique name per list for the segment - 100 byte maximum length, anything longer will throw an error
               opts.segment_opts (struct): for "saved" only, the standard segment match+conditions, just like campaigns/segment-test::
                   opts.segment_opts.match (struct): "any" or "all"
                   opts.segment_opts.conditions (array): structs for each condition, just like campaigns/segment-test


        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListInvalidOptionError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'seg_id': seg_id, 'opts': opts}
        return self.master.call('lists/segment-update', _params)

    def static_segment_add(self, id, name):
        """Save a segment against a list for later use. There is no limit to the number of segments which can be saved. Static Segments <strong>are not</strong> tied
to any merge data, interest groups, etc. They essentially allow you to configure an unlimited number of custom segments which will have standard performance.
When using proper segments, Static Segments are one of the available options for segmentation just as if you used a merge var (and they can be used with other segmentation
options), though performance may degrade at that point.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           name (string): a unique name per list for the segment - 100 byte maximum length, anything longer will throw an error

        Returns:
           struct.  with a single entry:::
               id (int): the id of the new segment, otherwise an error will be thrown.

        Raises:
           ListInvalidOptionError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'name': name}
        return self.master.call('lists/static-segment-add', _params)

    def static_segment_del(self, id, seg_id):
        """Delete a static segment. Note that this will, of course, remove any member affiliations with the segment

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           seg_id (int): the id of the static segment to delete - get from lists/static-segments()

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListInvalidOptionError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'seg_id': seg_id}
        return self.master.call('lists/static-segment-del', _params)

    def static_segment_members_add(self, id, seg_id, batch):
        """Add list members to a static segment. It is suggested that you limit batch size to no more than 10,000 addresses per call. Email addresses must exist on the list
in order to be included - this <strong>will not</strong> subscribe them to the list!

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           seg_id (int): the id of the static segment to modify - get from lists/static-segments()
           batch (array): an array of structs for   each address using the following keys:::
               batch.email (string): an email address
               batch.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               batch.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes

        Returns:
           struct.  an array with the results of the operation::
               success_count (int): the total number of successful updates (will include members already in the segment)
               errors (array): structs for each error including:::
                   errors.email (string): whatever was passed in the email parameter::
                       errors.email.email (string): the email address added
                       errors.email.euid (string): the email unique id
                       errors.email.leid (string): the list member's truly unique id

                   errors.code (string): the error code
                   errors.error (string): the full error message


        Raises:
           ListInvalidOptionError:
           ListNotSubscribedError:
           ListDoesNotExistError:
           EmailNotExistsError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'seg_id': seg_id, 'batch': batch}
        return self.master.call('lists/static-segment-members-add', _params)

    def static_segment_members_del(self, id, seg_id, batch):
        """Remove list members from a static segment. It is suggested that you limit batch size to no more than 10,000 addresses per call. Email addresses must exist on the list
in order to be removed - this <strong>will not</strong> unsubscribe them from the list!

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           seg_id (int): the id of the static segment to delete - get from lists/static-segments()
           batch (array): an array of structs for each address using one of the following keys:::
               batch.email (string): an email address
               batch.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               batch.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes

        Returns:
           struct.  an array with the results of the operation::
               success_count (int): the total number of successful removals
               error_count (int): the total number of unsuccessful removals
               errors (array): structs for each error including:::
                   errors.email (string): whatever was passed in the email parameter::
                       errors.email.email (string): the email address added
                       errors.email.euid (string): the email unique id
                       errors.email.leid (string): the list member's truly unique id

                   errors.code (string): the error code
                   errors.error (string): the full error message


        Raises:
           ListNotSubscribedError:
           ListInvalidOptionError:
           ListDoesNotExistError:
           EmailNotExistsError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'seg_id': seg_id, 'batch': batch}
        return self.master.call('lists/static-segment-members-del', _params)

    def static_segment_reset(self, id, seg_id):
        """Resets a static segment - removes <strong>all</strong> members from the static segment. Note: does not actually affect list member data

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           seg_id (int): the id of the static segment to reset  - get from lists/static-segments()

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListInvalidOptionError:
           ListNotSubscribedError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'seg_id': seg_id}
        return self.master.call('lists/static-segment-reset', _params)

    def static_segments(self, id):
        """Retrieve all of the Static Segments for a list.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()

        Returns:
           array.  an of structs with data for each static segment::
               id (int): the id of the segment
               name (string): the name for the segment
               member_count (int): the total number of subscribed members currently in a segment
               created_date (string): the date+time the segment was created
               last_update (string): the date+time the segment was last updated (add or del)
               last_reset (string): the date+time the segment was last reset (ie had all members cleared from it)

        Raises:
           ListInvalidOptionError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id}
        return self.master.call('lists/static-segments', _params)

    def subscribe(self, id, email, merge_vars=None, email_type='html', double_optin=True, update_existing=False, replace_interests=True, send_welcome=False):
        """Subscribe the provided email to a list. By default this sends a confirmation email - you will not see new members until the link contained in it is clicked!

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           email (struct): a struct with one of the following keys - failing to provide anything will produce an error relating to the email address. Providing multiples and will use the first we see in this same order.::
               email.email (string): an email address - for new subscribers obviously this should be used
               email.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               email.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes
           merge_vars (struct): optional merges for the email (FNAME, LNAME, <a href="http://kb.mailchimp.com/article/where-can-i-find-my-lists-merge-tags target="_blank">etc.</a>) (see examples below for handling "blank" arrays). Note that a merge field can only hold up to 255 bytes. Also, there are a few "special" keys:::
               merge_vars.new-email (string): set this to change the email address. This is only respected on calls using update_existing or when passed to listUpdateMember().
               merge_vars.groupings (array): of Interest Grouping structs. Each should contain:::
                   merge_vars.groupings.id (int): Grouping "id" from lists/interest-groupings (either this or name must be present) - this id takes precedence and can't change (unlike the name)
                   merge_vars.groupings.name (string): Grouping "name" from lists/interest-groupings (either this or id must be present)
                   merge_vars.groupings.groups (array): an array of valid group names for this grouping.

               merge_vars.optin_ip (string): Set the Opt-in IP field. <em>Abusing this may cause your account to be suspended.</em> We do validate this and it must not be a private IP address.
               merge_vars.optin_time (string): Set the Opt-in Time field. <em>Abusing this may cause your account to be suspended.</em> We do validate this and it must be a valid date. Use  - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00" to be safe. Generally, though, anything strtotime() understands we'll understand - <a href="http://us2.php.net/strtotime" target="_blank">http://us2.php.net/strtotime</a>
               merge_vars.mc_location (struct): Set the member's geographic location either by optin_ip or geo data.::
                   merge_vars.mc_location.latitude (string): use the specified latitude (longitude must exist for this to work)
                   merge_vars.mc_location.longitude (string): use the specified longitude (latitude must exist for this to work)
                   merge_vars.mc_location.anything (string): if this (or any other key exists here) we'll try to use the optin ip. NOTE - this will slow down each subscribe call a bit, especially for lat/lng pairs in sparsely populated areas. Currently our automated background processes can and will overwrite this based on opens and clicks.

               merge_vars.mc_language (string): Set the member's language preference. Supported codes are fully case-sensitive and can be found <a href="http://kb.mailchimp.com/article/can-i-see-what-languages-my-subscribers-use#code" target="_new">here</a>.
               merge_vars.mc_notes (array): of structs for managing notes - it may contain:::
                   merge_vars.mc_notes.note (string): the note to set. this is required unless you're deleting a note
                   merge_vars.mc_notes.id (int): the note id to operate on. not including this (or using an invalid id) causes a new note to be added
                   merge_vars.mc_notes.action (string): if the "id" key exists and is valid, an "update" key may be set to "append" (default), "prepend", "replace", or "delete" to handle how we should update existing notes. "delete", obviously, will only work with a valid "id" - passing that along with "note" and an invalid "id" is wrong and will be ignored.

           email_type (string): optional email type preference for the email (html or text - defaults to html)
           double_optin (bool): optional flag to control whether a double opt-in confirmation message is sent, defaults to true. <em>Abusing this may cause your account to be suspended.</em>
           update_existing (bool): optional flag to control whether existing subscribers should be updated instead of throwing an error, defaults to false
           replace_interests (bool): optional flag to determine whether we replace the interest groups with the groups provided or we add the provided groups to the member's interest groups (optional, defaults to true)
           send_welcome (bool): optional if your double_optin is false and this is true, we will send your lists Welcome Email if this subscribe succeeds - this will *not* fire if we end up updating an existing subscriber. If double_optin is true, this has no effect. defaults to false.

        Returns:
           struct.  the ids for this subscriber::
               email (string): the email address added
               euid (string): the email unique id
               leid (string): the list member's truly unique id

        Raises:
           ListDoesNotExistError:
           EmailNotExistsError:
           ListAlreadySubscribedError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'email': email, 'merge_vars': merge_vars, 'email_type': email_type, 'double_optin': double_optin, 'update_existing': update_existing, 'replace_interests': replace_interests, 'send_welcome': send_welcome}
        return self.master.call('lists/subscribe', _params)

    def unsubscribe(self, id, email, delete_member=False, send_goodbye=True, send_notify=True):
        """Unsubscribe the given email address from the list

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           email (struct): a struct with one of the following keys - failing to provide anything will produce an error relating to the email address. Providing multiples and will use the first we see in this same order.::
               email.email (string): an email address
               email.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               email.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes
           delete_member (boolean): flag to completely delete the member from your list instead of just unsubscribing, default to false
           send_goodbye (boolean): flag to send the goodbye email to the email address, defaults to true
           send_notify (boolean): flag to send the unsubscribe notification email to the address defined in the list email notification settings, defaults to true

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           ListDoesNotExistError:
           EmailNotExistsError:
           ListAlreadySubscribedError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'email': email, 'delete_member': delete_member, 'send_goodbye': send_goodbye, 'send_notify': send_notify}
        return self.master.call('lists/unsubscribe', _params)

    def update_member(self, id, email, merge_vars, email_type='', replace_interests=True):
        """Edit the email address, merge fields, and interest groups for a list member. If you are doing a batch update on lots of users,
consider using lists/batch-subscribe() with the update_existing and possible replace_interests parameter.

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           email (struct): a struct with one of the following keys - failing to provide anything will produce an error relating to the email address. Providing multiples and will use the first we see in this same order.::
               email.email (string): an email address
               email.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               email.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes
           merge_vars (array): array of new field values to update the member with.  See merge_vars in lists/subscribe() for details.
           email_type (string): change the email type preference for the member ("html" or "text").  Leave blank to keep the existing preference (optional)
           replace_interests (boolean): flag to determine whether we replace the interest groups with the updated groups provided, or we add the provided groups to the member's interest groups (optional, defaults to true)

        Returns:
           struct.  the ids for this subscriber::
               email (string): the email address added
               euid (string): the email unique id
               leid (string): the list member's truly unique id

        Raises:
           ListNotSubscribedError:
           ListAlreadySubscribedError:
           InvalidSendTypeError:
           InvalidEmailError:
           ListMergeFieldRequiredError:
           ListInvalidMergeFieldError:
           ListInvalidInterestGroupError:
           ListDoesNotExistError:
           EmailNotExistsError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'email': email, 'merge_vars': merge_vars, 'email_type': email_type, 'replace_interests': replace_interests}
        return self.master.call('lists/update-member', _params)

    def webhook_add(self, id, url, actions=[], sources=[]):
        """Add a new Webhook URL for the given list

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           url (string): a valid URL for the Webhook - it will be validated. note that a url may only exist on a list once.
           actions (struct): optional a hash of actions to fire this Webhook for::
               actions.subscribe (bool): optional as subscribes occur, defaults to true
               actions.unsubscribe (bool): optional as subscribes occur, defaults to true
               actions.profile (bool): optional as profile updates occur, defaults to true
               actions.cleaned (bool): optional as emails are cleaned from the list, defaults to true
               actions.upemail (bool): optional when  subscribers change their email address, defaults to true
               actions.campaign (bool): option when a campaign is sent or canceled, defaults to true
           sources (struct): optional  sources to fire this Webhook for::
               sources.user (bool): optional user/subscriber initiated actions, defaults to true
               sources.admin (bool): optional admin actions in our web app, defaults to true
               sources.api (bool): optional actions that happen via API calls, defaults to false

        Returns:
           struct.  with a single entry:::
               id (int): the id of the new webhook, otherwise an error will be thrown.

        Raises:
           InvalidURLError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'url': url, 'actions': actions, 'sources': sources}
        return self.master.call('lists/webhook-add', _params)

    def webhook_del(self, id, url):
        """Delete an existing Webhook URL from a given list

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           url (string): the URL of a Webhook on this list

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           InvalidURLError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'url': url}
        return self.master.call('lists/webhook-del', _params)

    def webhooks(self, id):
        """Return the Webhooks configured for the given list

        Args:
           id (string): the list id to connect to. Get by calling lists/list()

        Returns:
           array.  of structs for each webhook::
               url (string): the URL for this Webhook
               actions (struct): the possible actions and whether they are enabled::
                   actions.subscribe (bool): triggered when subscribes happen
                   actions.unsubscribe (bool): triggered when unsubscribes happen
                   actions.profile (bool): triggered when profile updates happen
                   actions.cleaned (bool): triggered when a subscriber is cleaned (bounced) from a list
                   actions.upemail (bool): triggered when a subscriber's email address is changed
                   actions.campaign (bool): triggered when a campaign is sent or canceled

               sources (struct): the possible sources and whether they are enabled::
                   sources.user (bool): whether user/subscriber triggered actions are returned
                   sources.admin (bool): whether admin (manual, in-app) triggered actions are returned
                   sources.api (bool): whether api triggered actions are returned


        Raises:
           ListDoesNotExistError:
           InvalidURLError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id}
        return self.master.call('lists/webhooks', _params)

    def list(self, filters=[], start=0, limit=25, sort_field='created', sort_dir='DESC'):
        """Retrieve all of the lists defined for your user account

        Args:
           filters (struct): filters to apply to this query - all are optional:::
               filters.list_id (string): optional - return a single list using a known list_id. Accepts multiples separated by commas when not using exact matching
               filters.list_name (string): optional - only lists that match this name
               filters.from_name (string): optional - only lists that have a default from name matching this
               filters.from_email (string): optional - only lists that have a default from email matching this
               filters.from_subject (string): optional - only lists that have a default from email matching this
               filters.created_before (string): optional - only show lists that were created before this date+time  - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00"
               filters.created_after (string): optional - only show lists that were created since this date+time  - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00"
               filters.exact (boolean): optional - flag for whether to filter on exact values when filtering, or search within content for filter values - defaults to true
           start (int): optional - control paging of lists, start results at this list #, defaults to 1st page of data  (page 0)
           limit (int): optional - control paging of lists, number of lists to return with each call, defaults to 25 (max=100)
           sort_field (string): optional - "created" (the created date, default) or "web" (the display order in the web app). Invalid values will fall back on "created" - case insensitive.
           sort_dir (string): optional - "DESC" for descending (default), "ASC" for Ascending.  Invalid values will fall back on "created" - case insensitive. Note: to get the exact display order as the web app you'd use "web" and "ASC"

        Returns:
           struct.  result of the operation including valid data and any errors::
               total (int): the total number of lists which matched the provided filters
               data (array): structs for the lists which matched the provided filters, including the following::
                   data.id (string): The list id for this list. This will be used for all other list management functions.
                   data.web_id (int): The list id used in our web app, allows you to create a link directly to it
                   data.name (string): The name of the list.
                   data.date_created (string): The date that this list was created.
                   data.email_type_option (boolean): Whether or not the List supports multiple formats for emails or just HTML
                   data.use_awesomebar (boolean): Whether or not campaigns for this list use the Awesome Bar in archives by default
                   data.default_from_name (string): Default From Name for campaigns using this list
                   data.default_from_email (string): Default From Email for campaigns using this list
                   data.default_subject (string): Default Subject Line for campaigns using this list
                   data.default_language (string): Default Language for this list's forms
                   data.list_rating (double): An auto-generated activity score for the list (0 - 5)
                   data.subscribe_url_short (string): Our eepurl shortened version of this list's subscribe form (will not change)
                   data.subscribe_url_long (string): The full version of this list's subscribe form (host will vary)
                   data.beamer_address (string): The email address to use for this list's <a href="http://kb.mailchimp.com/article/how-do-i-import-a-campaign-via-email-email-beamer/">Email Beamer</a>
                   data.visibility (string): Whether this list is Public (pub) or Private (prv). Used internally for projects like <a href="http://blog.mailchimp.com/introducing-wavelength/" target="_blank">Wavelength</a>
                   data.stats (struct): various stats and counts for the list - many of these are cached for at least 5 minutes::
                       data.stats.member_count (double): The number of active members in the given list.
                       data.stats.unsubscribe_count (double): The number of members who have unsubscribed from the given list.
                       data.stats.cleaned_count (double): The number of members cleaned from the given list.
                       data.stats.member_count_since_send (double): The number of active members in the given list since the last campaign was sent
                       data.stats.unsubscribe_count_since_send (double): The number of members who have unsubscribed from the given list since the last campaign was sent
                       data.stats.cleaned_count_since_send (double): The number of members cleaned from the given list since the last campaign was sent
                       data.stats.campaign_count (double): The number of campaigns in any status that use this list
                       data.stats.grouping_count (double): The number of Interest Groupings for this list
                       data.stats.group_count (double): The number of Interest Groups (regardless of grouping) for this list
                       data.stats.merge_var_count (double): The number of merge vars for this list (not including the required EMAIL one)
                       data.stats.avg_sub_rate (double): the average number of subscribe per month for the list (empty value if we haven't calculated this yet)
                       data.stats.avg_unsub_rate (double): the average number of unsubscribe per month for the list (empty value if we haven't calculated this yet)
                       data.stats.target_sub_rate (double): the target subscription rate for the list to keep it growing (empty value if we haven't calculated this yet)
                       data.stats.open_rate (double): the average open rate per campaign for the list  (empty value if we haven't calculated this yet)
                       data.stats.click_rate (double): the average click rate per campaign for the list  (empty value if we haven't calculated this yet)

                   data.modules (array): Any list specific modules installed for this list (example is SocialPro)

               errors (array): structs of any errors found while loading lists - usually just from providing invalid list ids::
                   errors.param (string): the data that caused the failure
                   errors.code (int): the error code
                   errors.error (int): the error message


        Raises:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           InvalidDateTimeError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'filters': filters, 'start': start, 'limit': limit, 'sort_field': sort_field, 'sort_dir': sort_dir}
        return self.master.call('lists/list', _params)


class Campaigns(object):
    def __init__(self, master):
        self.master = master

    def content(self, cid, options=[]):
        """Get the content (both html and text) for a campaign either as it would appear in the campaign archive or as the raw, original content

        Args:
           cid (string): the campaign id to get content for (can be gathered using campaigns/list())
           options (struct): various options to control this call::
               options.view (string): optional one of "archive" (default), "preview" (like our popup-preview) or "raw"
               options.email (struct): optional if provided, view is "archive" or "preview", the campaign's list still exists, and the requested record is subscribed to the list. the returned content will be populated with member data populated. a struct with one of the following keys - failing to provide anything will produce an error relating to the email address. Providing multiples and will use the first we see in this same order.::
                   options.email.email (string): an email address
                   options.email.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
                   options.email.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes


        Returns:
           struct.  containing all content for the campaign::
               html (string): The HTML content used for the campaign with merge tags intact
               text (string): The Text content used for the campaign with merge tags intact

        Raises:
           ListNotSubscribedError:
           ListDoesNotExistError:
           InvalidOptionsError:
           CampaignNotSavedError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'options': options}
        return self.master.call('campaigns/content', _params)

    def create(self, type, options, content, segment_opts=None, type_opts=None):
        """Create a new draft campaign to send. You <strong>can not</strong> have more than 32,000 campaigns in your account.

        Args:
           type (string): the Campaign Type to create - one of "regular", "plaintext", "absplit", "rss", "auto"
           options (struct): a struct of the standard options for this campaign :::
               options.list_id (string): the list to send this campaign to- get lists using lists/list()
               options.subject (string): the subject line for your campaign message
               options.from_email (string): the From: email address for your campaign message
               options.from_name (string): the From: name for your campaign message (not an email address)
               options.to_name (string): the To: name recipients will see (not email address)
               options.template_id (int): optional - use this user-created template to generate the HTML content of the campaign (takes precendence over other template options)
               options.gallery_template_id (int): optional - use a template from the public gallery to generate the HTML content of the campaign (takes precendence over base template options)
               options.base_template_id (int): optional - use this a base/start-from-scratch template to generate the HTML content of the campaign
               options.folder_id (int): optional - automatically file the new campaign in the folder_id passed. Get using folders/list() - note that Campaigns and Autoresponders have separate folder setups
               options.tracking (struct): optional - set which recipient actions will be tracked. Click tracking can not be disabled for Free accounts.::
                   options.tracking.opens (bool): whether to track opens, defaults to true
                   options.tracking.html_clicks (bool): whether to track clicks in HTML content, defaults to true
                   options.tracking.text_clicks (bool): whether to track clicks in Text content, defaults to false

               options.title (string): optional - an internal name to use for this campaign.  By default, the campaign subject will be used.
               options.authenticate (boolean): optional - set to true to enable SenderID, DomainKeys, and DKIM authentication, defaults to false.
               options.analytics (struct): optional - one or more of these keys set to the tag to use - that can be any custom text (up to 50 bytes)::
                   options.analytics.google (string): for Google Analytics  tracking
                   options.analytics.clicktale (string): for ClickTale  tracking
                   options.analytics.gooal (string): for Goo.al tracking

               options.auto_footer (boolean): optional Whether or not we should auto-generate the footer for your content. Mostly useful for content from URLs or Imports
               options.inline_css (boolean): optional Whether or not css should be automatically inlined when this campaign is sent, defaults to false.
               options.generate_text (boolean): optional Whether of not to auto-generate your Text content from the HTML content. Note that this will be ignored if the Text part of the content passed is not empty, defaults to false.
               options.auto_tweet (boolean): optional If set, this campaign will be auto-tweeted when it is sent - defaults to false. Note that if a Twitter account isn't linked, this will be silently ignored.
               options.auto_fb_post (array): optional If set, this campaign will be auto-posted to the page_ids contained in the array. If a Facebook account isn't linked or the account does not have permission to post to the page_ids requested, those failures will be silently ignored.
               options.fb_comments (boolean): optional If true, the Facebook comments (and thus the <a href="http://kb.mailchimp.com/article/i-dont-want-an-archiave-of-my-campaign-can-i-turn-it-off/" target="_blank">archive bar</a> will be displayed. If false, Facebook comments will not be enabled (does not imply no archive bar, see previous link). Defaults to "true".
               options.timewarp (boolean): optional If set, this campaign must be scheduled 24 hours in advance of sending - default to false. Only valid for "regular" campaigns and "absplit" campaigns that split on schedule_time.
               options.ecomm360 (boolean): optional If set, our <a href="http://www.mailchimp.com/blog/ecommerce-tracking-plugin/" target="_blank">Ecommerce360 tracking</a> will be enabled for links in the campaign
               options.crm_tracking (array): optional If set, an array of structs to enable CRM tracking for:::
                   options.crm_tracking.salesforce (struct): optional Enable SalesForce push back::
                       options.crm_tracking.salesforce.campaign (bool): optional - if true, create a Campaign object and update it with aggregate stats
                       options.crm_tracking.salesforce.notes (bool): optional - if true, attempt to update Contact notes based on email address

                   options.crm_tracking.highrise (struct): optional Enable Highrise push back::
                       options.crm_tracking.highrise.campaign (bool): optional - if true, create a Kase object and update it with aggregate stats
                       options.crm_tracking.highrise.notes (bool): optional - if true, attempt to update Contact notes based on email address

                   options.crm_tracking.capsule (struct): optional Enable Capsule push back (only notes are supported)::
                       options.crm_tracking.capsule.notes (bool): optional - if true, attempt to update Contact notes based on email address


           content (struct): the content for this campaign - use a struct with the one of the following keys:::
               content.html (string): for raw/pasted HTML content
               content.sections (struct): when using a template instead of raw HTML, each key should be the unique mc:edit area name from the template.
               content.text (string): for the plain-text version
               content.url (string): to have us pull in content from a URL. Note, this will override any other content options - for lists with Email Format options, you'll need to turn on generate_text as well
               content.archive (string): to send a Base64 encoded archive file for us to import all media from. Note, this will override any other content options - for lists with Email Format options, you'll need to turn on generate_text as well
               content.archive_type (string): optional - only necessary for the "archive" option. Supported formats are: zip, tar.gz, tar.bz2, tar, tgz, tbz . If not included, we will default to zip
           segment_opts (struct): if you wish to do Segmentation with this campaign this array should contain: see campaigns/segment-test(). It's suggested that you test your options against campaigns/segment-test().
           type_opts (struct): various extra options based on the campaign type::
               type_opts.rss (struct): For RSS Campaigns this, struct should contain:::
                   type_opts.rss.url (string): the URL to pull RSS content from - it will be verified and must exist
                   type_opts.rss.schedule (string): optional one of "daily", "weekly", "monthly" - defaults to "daily"
                   type_opts.rss.schedule_hour (string): optional an hour between 0 and 24 - default to 4 (4am <em>local time</em>) - applies to all schedule types
                   type_opts.rss.schedule_weekday (string): optional for "weekly" only, a number specifying the day of the week to send: 0 (Sunday) - 6 (Saturday) - defaults to 1 (Monday)
                   type_opts.rss.schedule_monthday (string): optional for "monthly" only, a number specifying the day of the month to send (1 - 28) or "last" for the last day of a given month. Defaults to the 1st day of the month
                   type_opts.rss.days (struct): optional used for "daily" schedules only, an array of the <a href="http://en.wikipedia.org/wiki/ISO-8601#Week_dates" target="_blank">ISO-8601 weekday numbers</a> to send on::
                       type_opts.rss.days.1 (bool): optional Monday, defaults to true
                       type_opts.rss.days.2 (bool): optional Tuesday, defaults to true
                       type_opts.rss.days.3 (bool): optional Wednesday, defaults to true
                       type_opts.rss.days.4 (bool): optional Thursday, defaults to true
                       type_opts.rss.days.5 (bool): optional Friday, defaults to true
                       type_opts.rss.days.6 (bool): optional Saturday, defaults to true
                       type_opts.rss.days.7 (bool): optional Sunday, defaults to true


               type_opts.absplit (struct): For A/B Split campaigns, this struct should contain:::
                   type_opts.absplit.split_test (string): The values to segment based on. Currently, one of: "subject", "from_name", "schedule". NOTE, for "schedule", you will need to call campaigns/schedule() separately!
                   type_opts.absplit.pick_winner (string): How the winner will be picked, one of: "opens" (by the open_rate), "clicks" (by the click rate), "manual" (you pick manually)
                   type_opts.absplit.wait_units (int): optional the default time unit to wait before auto-selecting a winner - use "3600" for hours, "86400" for days. Defaults to 86400.
                   type_opts.absplit.wait_time (int): optional the number of units to wait before auto-selecting a winner - defaults to 1, so if not set, a winner will be selected after 1 Day.
                   type_opts.absplit.split_size (int): optional this is a percentage of what size the Campaign's List plus any segmentation options results in. "schedule" type forces 50%, all others default to 10%
                   type_opts.absplit.from_name_a (string): optional sort of, required when split_test is "from_name"
                   type_opts.absplit.from_name_b (string): optional sort of, required when split_test is "from_name"
                   type_opts.absplit.from_email_a (string): optional sort of, required when split_test is "from_name"
                   type_opts.absplit.from_email_b (string): optional sort of, required when split_test is "from_name"
                   type_opts.absplit.subject_a (string): optional sort of, required when split_test is "subject"
                   type_opts.absplit.subject_b (string): optional sort of, required when split_test is "subject"

               type_opts.auto (struct): For AutoResponder campaigns, this struct should contain:::
                   type_opts.auto.offset-units (string): one of "hourly", "day", "week", "month", "year" - required
                   type_opts.auto.offset-time (string): optional, sort of - the number of units must be a number greater than 0 for signup based autoresponders, ignored for "hourly"
                   type_opts.auto.offset-dir (string): either "before" or "after", ignored for "hourly"
                   type_opts.auto.event (string): optional "signup" (default) to base this members added to a list, "date", "annual", or "birthday" to base this on merge field in the list, "campaignOpen" or "campaignClicka" to base this on any activity for a campaign, "campaignClicko" to base this on clicks on a specific URL in a campaign, "mergeChanged" to base this on a specific merge field being changed to a specific value
                   type_opts.auto.event-datemerge (string): optional sort of, this is required if the event is "date", "annual", "birthday", or "mergeChanged"
                   type_opts.auto.campaign_id (string): optional sort of, required for "campaignOpen", "campaignClicka", or "campaignClicko"
                   type_opts.auto.campaign_url (string): optional sort of, required for "campaignClicko"
                   type_opts.auto.schedule_hour (int): The hour of the day - 24 hour format in GMT - the autoresponder should be triggered, ignored for "hourly"
                   type_opts.auto.use_import_time (boolean): whether or not imported subscribers (ie, <em>any</em> non-double optin subscribers) will receive
                   type_opts.auto.days (struct): optional used for "daily" schedules only, an array of the <a href="http://en.wikipedia.org/wiki/ISO-8601#Week_dates" target="_blank">ISO-8601 weekday numbers</a> to send on<::
                       type_opts.auto.days.1 (bool): optional Monday, defaults to true
                       type_opts.auto.days.2 (bool): optional Tuesday, defaults to true
                       type_opts.auto.days.3 (bool): optional Wednesday, defaults to true
                       type_opts.auto.days.4 (bool): optional Thursday, defaults to true
                       type_opts.auto.days.5 (bool): optional Friday, defaults to true
                       type_opts.auto.days.6 (bool): optional Saturday, defaults to true
                       type_opts.auto.days.7 (bool): optional Sunday, defaults to true



        Returns:
           struct.  the new campaign's details - will return same data as single campaign from campaigns/list()

        Raises:
           InvalidOptionsError:
           CampaignInvalidRssError:
           CampaignInvalidContentError:
           CampaignInvalidAbsplitError:
           ListInvalidMergeFieldError:
           ListInvalidInterestGroupError:
           ListDoesNotExistError:
           InvalidTrackingOptionsError:
           InvalidTemplateError:
           InvalidFolderError:
           InvalidDateTimeError:
           InvalidAnalyticsError:
           CampaignDoesNotExistError:
           AbsplitUnknownTestTypeError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'type': type, 'options': options, 'content': content, 'segment_opts': segment_opts, 'type_opts': type_opts}
        return self.master.call('campaigns/create', _params)

    def delete(self, cid):
        """Delete a campaign. Seriously, "poof, gone!" - be careful! Seriously, no one can undelete these.

        Args:
           cid (string): the Campaign Id to delete

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           CampaignInvalidStatusError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('campaigns/delete', _params)

    def list(self, filters=[], start=0, limit=25, sort_field='create_time', sort_dir='DESC'):
        """Get the list of campaigns and their details matching the specified filters

        Args:
           filters (struct): a struct of filters to apply to this query - all are optional:::
               filters.campaign_id (string): optional - return the campaign using a know campaign_id.  Accepts multiples separated by commas when not using exact matching.
               filters.parent_id (string): optional - return the child campaigns using a known parent campaign_id.  Accepts multiples separated by commas when not using exact matching.
               filters.list_id (string): optional - the list to send this campaign to - get lists using lists/list(). Accepts multiples separated by commas when not using exact matching.
               filters.folder_id (int): optional - only show campaigns from this folder id - get folders using folders/list(). Accepts multiples separated by commas when not using exact matching.
               filters.template_id (int): optional - only show campaigns using this template id - get templates using templates/list(). Accepts multiples separated by commas when not using exact matching.
               filters.status (string): optional - return campaigns of a specific status - one of "sent", "save", "paused", "schedule", "sending". Accepts multiples separated by commas when not using exact matching.
               filters.type (string): optional - return campaigns of a specific type - one of "regular", "plaintext", "absplit", "rss", "auto". Accepts multiples separated by commas when not using exact matching.
               filters.from_name (string): optional - only show campaigns that have this "From Name"
               filters.from_email (string): optional - only show campaigns that have this "Reply-to Email"
               filters.title (string): optional - only show campaigns that have this title
               filters.subject (string): optional - only show campaigns that have this subject
               filters.sendtime_start (string): optional - only show campaigns that have been sent since this date/time (in GMT) -  - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00" - if this is invalid the whole call fails
               filters.sendtime_end (string): optional - only show campaigns that have been sent before this date/time (in GMT) -  - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00" - if this is invalid the whole call fails
               filters.uses_segment (boolean): - whether to return just campaigns with or without segments
               filters.exact (boolean): optional - flag for whether to filter on exact values when filtering, or search within content for filter values - defaults to true. Using this disables the use of any filters that accept multiples.
           start (int): optional - control paging of campaigns, start results at this campaign #, defaults to 1st page of data  (page 0)
           limit (int): optional - control paging of campaigns, number of campaigns to return with each call, defaults to 25 (max=1000)
           sort_field (string): optional - one of "create_time", "send_time", "title", "subject" . Invalid values will fall back on "create_time" - case insensitive.
           sort_dir (string): optional - "DESC" for descending (default), "ASC" for Ascending.  Invalid values will fall back on "DESC" - case insensitive.

        Returns:
           struct.  containing a count of all matching campaigns, the specific ones for the current page, and any errors from the filters provided::
               total (int): the total number of campaigns matching the filters passed in
               data (array): structs for each campaign being returned::
                   data.id (string): Campaign Id (used for all other campaign functions)
                   data.web_id (int): The Campaign id used in our web app, allows you to create a link directly to it
                   data.list_id (string): The List used for this campaign
                   data.folder_id (int): The Folder this campaign is in
                   data.template_id (int): The Template this campaign uses
                   data.content_type (string): How the campaign's content is put together - one of 'template', 'html', 'url'
                   data.title (string): Title of the campaign
                   data.type (string): The type of campaign this is (regular,plaintext,absplit,rss,inspection,auto)
                   data.create_time (string): Creation time for the campaign
                   data.send_time (string): Send time for the campaign - also the scheduled time for scheduled campaigns.
                   data.emails_sent (int): Number of emails email was sent to
                   data.status (string): Status of the given campaign (save,paused,schedule,sending,sent)
                   data.from_name (string): From name of the given campaign
                   data.from_email (string): Reply-to email of the given campaign
                   data.subject (string): Subject of the given campaign
                   data.to_name (string): Custom "To:" email string using merge variables
                   data.archive_url (string): Archive link for the given campaign
                   data.inline_css (boolean): Whether or not the campaign content's css was auto-inlined
                   data.analytics (string): Either "google" if enabled or "N" if disabled
                   data.analytics_tag (string): The name/tag the campaign's links were tagged with if analytics were enabled.
                   data.authenticate (boolean): Whether or not the campaign was authenticated
                   data.ecomm360 (boolean): Whether or not ecomm360 tracking was appended to links
                   data.auto_tweet (boolean): Whether or not the campaign was auto tweeted after sending
                   data.auto_fb_post (string): A comma delimited list of Facebook Profile/Page Ids the campaign was posted to after sending. If not used, blank.
                   data.auto_footer (boolean): Whether or not the auto_footer was manually turned on
                   data.timewarp (boolean): Whether or not the campaign used Timewarp
                   data.timewarp_schedule (string): The time, in GMT, that the Timewarp campaign is being sent. For A/B Split campaigns, this is blank and is instead in their schedule_a and schedule_b in the type_opts array
                   data.parent_id (string): the unique id of the parent campaign (currently only valid for rss children)
                   data.tests_sent (string): tests sent
                   data.tests_remain (string): test sends remaining
                   data.tracking (struct): the various tracking options used::
                       data.tracking.html_clicks (boolean): whether or not tracking for html clicks was enabled.
                       data.tracking.text_clicks (boolean): whether or not tracking for text clicks was enabled.
                       data.tracking.opens (boolean): whether or not opens tracking was enabled.

                   data.segment_text (string): a string marked-up with HTML explaining the segment used for the campaign in plain English
                   data.segment_opts (array): the segment used for the campaign - can be passed to campaigns/segment-test or campaigns/create()
                   data.saved_segment (struct): if a saved segment was used (match+conditions returned above):::
                       data.saved_segment.id (struct): the saved segment id
                       data.saved_segment.type (struct): the saved segment type
                       data.saved_segment.name (struct): the saved segment name

                   data.type_opts (struct): the type-specific options for the campaign - can be passed to campaigns/create()
                   data.comments_total (int): total number of comments left on this campaign
                   data.comments_unread (int): total number of unread comments for this campaign based on the login the apikey belongs to
                   data.summary (struct): if available, the basic aggregate stats returned by reports/summary

               errors (array): structs of any errors found while loading lists - usually just from providing invalid list ids::
                   errors.filter (string): the filter that caused the failure
                   errors.value (string): the filter value that caused the failure
                   errors.code (int): the error code
                   errors.error (int): the error message


        Raises:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           InvalidDateTimeError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'filters': filters, 'start': start, 'limit': limit, 'sort_field': sort_field, 'sort_dir': sort_dir}
        return self.master.call('campaigns/list', _params)

    def pause(self, cid):
        """Pause an AutoResponder or RSS campaign from sending

        Args:
           cid (string): the id of the campaign to pause

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           CampaignInvalidStatusError:
           CampaignInvalidOptionError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('campaigns/pause', _params)

    def ready(self, cid):
        """Returns information on whether a campaign is ready to send and possible issues we may have detected with it - very similar to the confirmation step in the app.

        Args:
           cid (string): the Campaign Id to replicate

        Returns:
           struct.  containing:::
               is_ready (bool): whether or not you're going to be able to send this campaign
               items (array): an array of structs explaining basically what the app's confirmation step would::
                   items.type (string): the item type - generally success, warning, or error
                   items.heading (string): the item's heading in the app
                   items.details (string): the item's details from the app, sans any html tags/links


        Raises:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('campaigns/ready', _params)

    def replicate(self, cid):
        """Replicate a campaign.

        Args:
           cid (string): the Campaign Id to replicate

        Returns:
           struct.  the matching campaign's details - will return same data as single campaign from campaigns/list()

        Raises:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('campaigns/replicate', _params)

    def resume(self, cid):
        """Resume sending an AutoResponder or RSS campaign

        Args:
           cid (string): the id of the campaign to pause

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           CampaignInvalidOptionError:
           CampaignInvalidStatusError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('campaigns/resume', _params)

    def schedule(self, cid, schedule_time, schedule_time_b=None):
        """Schedule a campaign to be sent in the future

        Args:
           cid (string): the id of the campaign to schedule
           schedule_time (string): the time to schedule the campaign. For A/B Split "schedule" campaigns, the time for Group A - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00"
           schedule_time_b (string): optional -the time to schedule Group B of an A/B Split "schedule" campaign  - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00"

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           InvalidOptionsError:
           CampaignInvalidOptionError:
           UserCannotSendCampaignError:
           InvalidDateTimeError:
           CampaignInvalidStatusError:
           CampaignDoesNotExistError:
           UnknownExceptionError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'schedule_time': schedule_time, 'schedule_time_b': schedule_time_b}
        return self.master.call('campaigns/schedule', _params)

    def schedule_batch(self, cid, schedule_time, num_batches=2, stagger_mins=5):
        """Schedule a campaign to be sent in batches sometime in the future. Only valid for "regular" campaigns

        Args:
           cid (string): the id of the campaign to schedule
           schedule_time (string): the time to schedule the campaign.
           num_batches (int): optional - the number of batches between 2 and 26 to send. defaults to 2
           stagger_mins (int): optional - the number of minutes between each batch - 5, 10, 15, 20, 25, 30, or 60. defaults to 5

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           UnknownExceptionError:
           CampaignInvalidOptionError:
           UserCannotSendCampaignError:
           InvalidDateTimeError:
           CampaignInvalidStatusError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'schedule_time': schedule_time, 'num_batches': num_batches, 'stagger_mins': stagger_mins}
        return self.master.call('campaigns/schedule-batch', _params)

    def segment_test(self, list_id, options):
        """Allows one to test their segmentation rules before creating a campaign using them

        Args:
           list_id (string): the list to test segmentation on - get lists using lists/list()
           options (struct): with 1 or 2 keys:::
               options.saved_segment_id (string): a saved segment id from lists/segments() - this will take precendence, otherwise the match+conditions are required.
               options.match (string): controls whether to use AND or OR when applying your options - expects "<strong>any</strong>" (for OR) or "<strong>all</strong>" (for AND)
               options.conditions (array): of up to 5 structs for different criteria to apply while segmenting. Each criteria row must contain 3 keys - "<strong>field</strong>", "<strong>op</strong>", and "<strong>value</strong>" - and possibly a fourth, "<strong>extra</strong>", based on these definitions:

        Returns:
           struct.  with a single entry:::
               total (int): The total number of subscribers matching your segmentation options

        Raises:
           ListInvalidMergeFieldError:
           ListInvalidInterestGroupError:
           ListDoesNotExistError:
           InvalidOptionsError:
           InvalidDateTimeError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'list_id': list_id, 'options': options}
        return self.master.call('campaigns/segment-test', _params)

    def send(self, cid):
        """Send a given campaign immediately. For RSS campaigns, this will "start" them.

        Args:
           cid (string): the id of the campaign to send

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           CampaignInvalidOptionError:
           ListInvalidMergeFieldError:
           ListInvalidInterestGroupError:
           ListDoesNotExistError:
           InvalidOptionsError:
           InvalidDateTimeError:
           CampaignDoesNotExistError:
           UserCannotSendCampaignError:
           CampaignInvalidStatusError:
           UnknownExceptionError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('campaigns/send', _params)

    def send_test(self, cid, test_emails=[], send_type='html'):
        """Send a test of this campaign to the provided email addresses

        Args:
           cid (string): the id of the campaign to test
           test_emails (array): an array of email address to receive the test message
           send_type (string): by default just html is sent - can be "html" or "text" send specify the format

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           UnknownExceptionError:
           InvalidEmailError:
           InvalidSendTypeError:
           CampaignInvalidContentError:
           CampaignDoesNotExistError:
           UserCannotSendCampaignError:
           CampaignInvalidStatusError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'test_emails': test_emails, 'send_type': send_type}
        return self.master.call('campaigns/send-test', _params)

    def template_content(self, cid):
        """Get the HTML template content sections for a campaign. Note that this <strong>will</strong> return very jagged, non-standard results based on the template
a campaign is using. You only want to use this if you want to allow editing template sections in your application.

        Args:
           cid (string): the campaign id to get content for (can be gathered using campaigns/list())

        Returns:
           struct.  content containing all content section for the campaign - section name are dependent upon the template used and thus can't be documented

        Raises:
           UnknownExceptionError:
           InvalidSendTypeError:
           CampaignNotSavedError:
           CampaignInvalidContentError:
           UserCannotSendCampaignError:
           CampaignInvalidStatusError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('campaigns/template-content', _params)

    def unschedule(self, cid):
        """Unschedule a campaign that is scheduled to be sent in the future

        Args:
           cid (string): the id of the campaign to unschedule

        Returns:
           struct.  with a single entry:::
               complete (bool): whether the call worked. reallistically this will always be true as errors will be thrown otherwise.

        Raises:
           CampaignInvalidContentError:
           CampaignInvalidOptionError:
           CampaignDoesNotExistError:
           CampaignInvalidStatusError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('campaigns/unschedule', _params)

    def update(self, cid, name, value):
        """Update just about any setting besides type for a campaign that has <em>not</em> been sent. See campaigns/create() for details.
Caveats:<br/><ul class='bullets'>
<li>If you set a new list_id, all segmentation options will be deleted and must be re-added.</li>
<li>If you set template_id, you need to follow that up by setting it's 'content'</li>
<li>If you set segment_opts, you should have tested your options against campaigns/segment-test().</li>
<li>To clear/unset segment_opts, pass an empty string or array as the value. Various wrappers may require one or the other.</li>
</ul>

        Args:
           cid (string): the Campaign Id to update
           name (string): the parameter name ( see campaigns/create() ). This will be that parameter name (options, content, segment_opts) except "type_opts", which will be the name of the type - rss, auto, etc. The campaign "type" can not be changed.
           value (array): an appropriate set of values for the parameter ( see campaigns/create() ). For additional parameters, this is the same value passed to them.

        Returns:
           struct.  updated campaign details and any errors::
               data (struct): the update campaign details - will return same data as single campaign from campaigns/list()
               errors (array): for "options" only - structs containing:::
                   errors.code (int): the error code
                   errors.message (string): the full error message
                   errors.name (string): the parameter name that failed


        Raises:
           InvalidOptionsError:
           CampaignInvalidStatusError:
           CampaignInvalidRssError:
           CampaignInvalidOptionError:
           CampaignInvalidContentError:
           CampaignInvalidAutoError:
           CampaignInvalidAbsplitError:
           ListInvalidMergeFieldError:
           ListInvalidInterestGroupError:
           ListDoesNotExistError:
           InvalidTrackingOptionsError:
           InvalidTemplateError:
           InvalidFolderError:
           InvalidDateTimeError:
           InvalidAnalyticsError:
           CampaignDoesNotExistError:
           AbsplitUnknownTestTypeError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'name': name, 'value': value}
        return self.master.call('campaigns/update', _params)


class Vip(object):
    def __init__(self, master):
        self.master = master

    def activity(self, ):
        """Retrieve all Activity (opens/clicks) for VIPs over the past 10 days

        Returns:
           array.  structs for each activity recorded.::
               action (string): The action taken - either "open" or "click"
               timestamp (string): The datetime the action occurred in GMT
               url (string): IF the action is a click, the url that was clicked
               unique_id (string): The campaign_id of the List the Member appears on
               title (string): The campaign title
               list_name (string): The name of the List the Member appears on
               list_id (string): The id of the List the Member appears on
               email (string): The email address of the member
               fname (string): IF a FNAME merge field exists on the list, that value for the member
               lname (string): IF a LNAME merge field exists on the list, that value for the member
               member_rating (int): the rating of the subscriber. This will be 1 - 5 as described <a href="http://eepurl.com/f-2P" target="_blank">here</a>
               member_since (string): the datetime the member was added and/or confirmed
               geo (struct): the geographic information if we have it. including:::
                   geo.latitude (string): the latitude
                   geo.longitude (string): the longitude
                   geo.gmtoff (string): GMT offset
                   geo.dstoff (string): GMT offset during daylight savings (if DST not observered, will be same as gmtoff
                   geo.timezone (string): the timezone we've place them in
                   geo.cc (string): 2 digit ISO-3166 country code
                   geo.region (string): generally state, province, or similar


        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {}
        return self.master.call('vip/activity', _params)

    def add(self, id, emails):
        """Add VIPs (previously called Golden Monkeys)

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           emails (array): an array of up to 50 email address structs to add, each with with one of the following keys::
               emails.email (string): an email address - for new subscribers obviously this should be used
               emails.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               emails.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes

        Returns:
           struct.  of data and success/error counts::
               success_count (int): the number of successful adds
               error_count (int): the number of unsuccessful adds
               errors (array): array of error structs including:::
                   errors.email (struct): whatever was passed in the email parameter::
                       errors.email.email (string): the email address added
                       errors.email.euid (string): the email unique id
                       errors.email.leid (string): the list member's truly unique id

                   errors.code (string): the error code
                   errors.error (string): the error message

               data (array): array of structs for each member added::
                   data.email (struct): whatever was passed in the email parameter::
                       data.email.email (string): the email address added
                       data.email.euid (string): the email unique id
                       data.email.leid (string): the list member's truly unique id



        Raises:
           InvalidOptionsError:
           EmailNotExistsError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'emails': emails}
        return self.master.call('vip/add', _params)

    def delete(self, id, emails):
        """Remove VIPs - this does not affect list membership

        Args:
           id (string): the list id to connect to. Get by calling lists/list()
           emails (array): an array of up to 50 email address structs to remove, each with with one of the following keys::
               emails.email (string): an email address - for new subscribers obviously this should be used
               emails.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               emails.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes

        Returns:
           struct.  of data and success/error counts::
               success_count (int): the number of successful deletions
               error_count (int): the number of unsuccessful deletions
               errors (array): array of error structs including:::
                   errors.email (struct): whatever was passed in the email parameter::
                       errors.email.email (string): the email address
                       errors.email.euid (string): the email unique id
                       errors.email.leid (string): the list member's truly unique id

                   errors.code (string): the error code
                   errors.msg (string): the error message

               data (array): array of structs for each member deleted::
                   data.email (struct): whatever was passed in the email parameter::
                       data.email.email (string): the email address
                       data.email.euid (string): the email unique id
                       data.email.leid (string): the list member's truly unique id



        Raises:
           InvalidOptionsError:
           EmailNotExistsError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'id': id, 'emails': emails}
        return self.master.call('vip/del', _params)

    def members(self, ):
        """Retrieve all Golden Monkey(s) for an account

        Returns:
           array.  structs for each Golden Monkey, including:::
               list_id (string): The id of the List the Member appears on
               list_name (string): The name of the List the Member appears on
               email (string): The email address of the member
               fname (string): IF a FNAME merge field exists on the list, that value for the member
               lname (string): IF a LNAME merge field exists on the list, that value for the member
               member_rating (int): the rating of the subscriber. This will be 1 - 5 as described <a href="http://eepurl.com/f-2P" target="_blank">here</a>
               member_since (string): the datetime the member was added and/or confirmed

        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {}
        return self.master.call('vip/members', _params)


class Reports(object):
    def __init__(self, master):
        self.master = master

    def abuse(self, cid, opts=[]):
        """Get all email addresses that complained about a given campaign

        Args:
           cid (string): the campaign id to pull abuse reports for (can be gathered using campaigns/list())
           opts (struct): various options for controlling returned data::
               opts.start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
               opts.limit (int): optional for large data sets, the number of results to return - defaults to 25, upper limit set at 100
               opts.since (string): optional pull only messages since this time - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00"

        Returns:
           struct.  abuse report data for this campaign::
               total (int): the total reports matched
               data (array): a struct for the each report, including:::
                   data.date (string): date/time the abuse report was received and processed
                   data.member (string): the email address that reported abuse - will only contain email if the list or member has been removed
                   data.type (string): an internal type generally specifying the originating mail provider - may not be useful outside of filling report views


        Raises:
           ListDoesNotExistError:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           InvalidDateTimeError:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'opts': opts}
        return self.master.call('reports/abuse', _params)

    def advice(self, cid):
        """Retrieve the text presented in our app for how a campaign performed and any advice we may have for you - best
suited for display in customized reports pages. Note: some messages will contain HTML - clean tags as necessary

        Args:
           cid (string): the campaign id to pull advice text for (can be gathered using campaigns/list())

        Returns:
           array.  of structs for advice on the campaign's performance, each containing:::
               msg (string): the advice message
               type (string): the "type" of the message. one of: negative, positive, or neutral

        Raises:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('reports/advice', _params)

    def bounce_message(self, cid, email):
        """Retrieve the most recent full bounce message for a specific email address on the given campaign.
Messages over 30 days old are subject to being removed

        Args:
           cid (string): the campaign id to pull bounces for (can be gathered using campaigns/list())
           email (struct): a struct with one of the following keys - failing to provide anything will produce an error relating to the email address. Providing multiples and will use the first we see in this same order.::
               email.email (string): an email address - this is recommended for this method
               email.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               email.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes

        Returns:
           struct.  the full bounce message for this email+campaign along with some extra data.::
               date (string): date the bounce was received and processed
               member (struct): the member record as returned by lists/member-info()
               message (string): the entire bounce message received

        Raises:
           CampaignBounceMissingError:
           ListDoesNotExistError:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'email': email}
        return self.master.call('reports/bounce-message', _params)

    def bounce_messages(self, cid, opts=[]):
        """Retrieve the full bounce messages for the given campaign. Note that this can return very large amounts
of data depending on how large the campaign was and how much cruft the bounce provider returned. Also,
messages over 30 days old are subject to being removed

        Args:
           cid (string): the campaign id to pull bounces for (can be gathered using campaigns/list())
           opts (struct): various options for controlling returned data::
               opts.start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
               opts.limit (int): optional for large data sets, the number of results to return - defaults to 25, upper limit set at 100
               opts.since (string): optional pull only messages since this time - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00"

        Returns:
           struct.  data for the full bounce messages for this campaign::
               total (int): that total number of bounce messages for the campaign
               data (array): structs containing the data for this page::
                   data.date (string): date the bounce was received and processed
                   data.member (struct): the member record as returned by lists/member-info()
                   data.message (string): the entire bounce message received


        Raises:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           InvalidDateTimeError:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'opts': opts}
        return self.master.call('reports/bounce-messages', _params)

    def click_detail(self, cid, tid, opts=[]):
        """Return the list of email addresses that clicked on a given url, and how many times they clicked

        Args:
           cid (string): the campaign id to get click stats for (can be gathered using campaigns/list())
           tid (int): the "tid" for the URL from reports/clicks
           opts (struct): various options for controlling returned data::
               opts.start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
               opts.limit (int): optional for large data sets, the number of results to return - defaults to 25, upper limit set at 100
               opts.sort_field (string): optional the data to sort by - "clicked" (order clicks occurred, default) or "clicks" (total number of opens). Invalid fields will fall back on the default.
               opts.sort_dir (string): optional the direct - ASC or DESC. defaults to ASC (case insensitive)

        Returns:
           struct.  containing the total records matched and the specific records for this page::
               total (int): the total number of records matched
               data (array): structs for each email addresses that click the requested url::
                   data.member (struct): the member record as returned by lists/member-info()
                   data.clicks (int): Total number of times the URL was clicked by this email address


        Raises:
           CampaignStatsNotAvailableError:
           CampaignInvalidOptionError:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'tid': tid, 'opts': opts}
        return self.master.call('reports/click-detail', _params)

    def clicks(self, cid):
        """The urls tracked and their click counts for a given campaign.

        Args:
           cid (string): the campaign id to pull stats for (can be gathered using campaigns/list())

        Returns:
           struct.  including:::
               total (array): structs for each url tracked for the full campaign::
                   total.url (string): the url being tracked - urls are tracked individually, so duplicates can exist with vastly different stats
                   total.clicks (int): Number of times the specific link was clicked
                   total.clicks_percent (double): the percentage of total clicks "clicks" represents
                   total.unique (int): Number of unique people who clicked on the specific link
                   total.unique_percent (double): the percentage of unique clicks "unique" represents
                   total.tid (int): the tracking id used in campaign links - used primarily for reports/click-activity. also can be used to order urls by the order they appeared in the campaign to recreate our heat map.

               a (array): if this was an absplit campaign, stat structs for the a group::
                   a.url (string): the url being tracked - urls are tracked individually, so duplicates can exist with vastly different stats
                   a.clicks (int): Number of times the specific link was clicked
                   a.clicks_percent (double): the percentage of total clicks "clicks" represents
                   a.unique (int): Number of unique people who clicked on the specific link
                   a.unique_percent (double): the percentage of unique clicks "unique" represents
                   a.tid (int): the tracking id used in campaign links - used primarily for reports/click-activity. also can be used to order urls by the order they appeared in the campaign to recreate our heat map.

               b (array): if this was an absplit campaign, stat structs for the b group::
                   b.url (string): the url being tracked - urls are tracked individually, so duplicates can exist with vastly different stats
                   b.clicks (int): Number of times the specific link was clicked
                   b.clicks_percent (double): the percentage of total clicks "clicks" represents
                   b.unique (int): Number of unique people who clicked on the specific link
                   b.unique_percent (double): the percentage of unique clicks "unique" represents
                   b.tid (int): the tracking id used in campaign links - used primarily for reports/click-activity. also can be used to order urls by the order they appeared in the campaign to recreate our heat map.


        Raises:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('reports/clicks', _params)

    def ecomm_orders(self, cid, opts=[]):
        """Retrieve the Ecommerce Orders tracked by ecomm/order-add()

        Args:
           cid (string): the campaign id to pull orders for for (can be gathered using campaigns/list())
           opts (struct): various options for controlling returned data::
               opts.start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
               opts.limit (int): optional for large data sets, the number of results to return - defaults to 25, upper limit set at 100
               opts.since (string): optional pull only messages since this time - 24 hour format in <strong>GMT</strong>, eg "2013-12-30 20:30:00"

        Returns:
           struct.  the total matching orders and the specific orders for the requested page::
               total (int): the total matching orders
               data (array): structs for the actual data for each order being returned
               store_id (string): the store id generated by the plugin used to uniquely identify a store
               store_name (string): the store name collected by the plugin - often the domain name
               order_id (string): the internal order id the store tracked this order by
               member (struct): the member record as returned by lists/member-info() that received this campaign and is associated with this order
               order_total (double): the order total
               tax_total (double): the total tax for the order (if collected)
               ship_total (double): the shipping total for the order (if collected)
               order_date (string): the date the order was tracked - from the store if possible, otherwise the GMT time we received it
               lines (array): structs containing details of the order:::
                   lines.line_num (int): the line number assigned to this line
                   lines.product_id (int): the product id assigned to this item
                   lines.product_name (string): the product name
                   lines.product_sku (string): the sku for the product
                   lines.product_category_id (int): the id for the product category
                   lines.product_category_name (string): the product category name
                   lines.qty (double): optional the quantity of the item ordered - defaults to 1
                   lines.cost (double): optional the cost of a single item (ie, not the extended cost of the line) - defaults to 0


        Raises:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           InvalidDateTimeError:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           ListDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'opts': opts}
        return self.master.call('reports/ecomm-orders', _params)

    def eepurl(self, cid):
        """Retrieve the eepurl stats from the web/Twitter mentions for this campaign

        Args:
           cid (string): the campaign id to pull stats for (can be gathered using campaigns/list())

        Returns:
           struct.  containing tweets, retweets, clicks, and referrer related to using the campaign's eepurl::
               twitter (struct): various Twitter related stats::
                   twitter.tweets (int): Total number of tweets seen
                   twitter.first_tweet (string): date and time of the first tweet seen
                   twitter.last_tweet (string): date and time of the last tweet seen
                   twitter.retweets (int): Total number of retweets seen
                   twitter.first_retweet (string): date and time of the first retweet seen
                   twitter.last_retweet (string): date and time of the last retweet seen
                   twitter.statuses (array): an structs for statuses recorded including:::
                       twitter.statuses.status (string): the text of the tweet/update
                       twitter.statuses.screen_name (string): the screen name as recorded when first seen
                       twitter.statuses.status_id (string): the status id of the tweet (they are really unsigned 64 bit ints)
                       twitter.statuses.datetime (string): the date/time of the tweet
                       twitter.statuses.is_retweet (bool): whether or not this was a retweet


               clicks (struct): stats related to click-throughs on the eepurl::
                   clicks.clicks (int): Total number of clicks seen
                   clicks.first_click (string): date and time of the first click seen
                   clicks.last_click (string): date and time of the first click seen
                   clicks.locations (array): structs for geographic locations including:::
                       clicks.locations.country (string): the country name the click was tracked to
                       clicks.locations.region (string): the region in the country the click was tracked to (if available)


               referrers (array): structs for referrers, including::
                   referrers.referrer (string): the referrer, truncated to 100 bytes
                   referrers.clicks (int): Total number of clicks seen from this referrer
                   referrers.first_click (string): date and time of the first click seen from this referrer
                   referrers.last_click (string): date and time of the first click seen from this referrer


        Raises:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('reports/eepurl', _params)

    def member_activity(self, cid, emails):
        """Given a campaign and email address, return the entire click and open history with timestamps, ordered by time. If you need to dump the full activity for a campaign
and/or get incremental results, you should use the <a href="http://apidocs.mailchimp.com/export/1.0/campaignsubscriberactivity.func.php" targret="_new">campaignSubscriberActivity Export API method</a>,
<strong>not</strong> this, especially for large campaigns.

        Args:
           cid (string): the campaign id to get stats for (can be gathered using campaigns/list())
           emails (array): an array of up to 50 email address struct to retrieve activity information for::
               emails.email (string): an email address
               emails.euid (string): the unique id for an email address (not list related) - the email "id" returned from listMemberInfo, Webhooks, Campaigns, etc.
               emails.leid (string): the list email id (previously called web_id) for a list-member-info type call. this doesn't change when the email address changes

        Returns:
           struct.  of data and success/error counts::
               success_count (int): the number of subscribers successfully found on the list
               error_count (int): the number of subscribers who were not found on the list
               errors (array): array of error structs including:::
                   errors.email (string): whatever was passed in the email parameter::
                       errors.email.email (string): the email address added
                       errors.email.euid (string): the email unique id
                       errors.email.leid (string): the list member's truly unique id

                   errors.msg (string): the error message

               data (array): an array of structs where each activity record has:::
                   data.email (string): whatever was passed in the email parameter::
                       data.email.email (string): the email address added
                       data.email.euid (string): the email unique id
                       data.email.leid (string): the list member's truly unique id

                   data.member (struct): the member record as returned by lists/member-info()
                   data.activity (array): an array of structs containing the activity, including:::
                       data.activity.action (string): The action name - either open or click
                       data.activity.timestamp (string): The date/time of the action (GMT)
                       data.activity.url (string): For click actions, the url clicked, otherwise this is empty
                       data.activity.ip (string): The IP address the activity came from



        Raises:
           InvalidOptionsError:
           EmailNotExistsError:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'emails': emails}
        return self.master.call('reports/member-activity', _params)

    def not_opened(self, cid, opts=[]):
        """Retrieve the list of email addresses that did not open a given campaign

        Args:
           cid (string): the campaign id to get no opens for (can be gathered using campaigns/list())
           opts (struct): various options for controlling returned data::
               opts.start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
               opts.limit (int): optional for large data sets, the number of results to return - defaults to 25, upper limit set at 100

        Returns:
           struct.  a total of all matching emails and the specific emails for this page::
               total (int): the total number of members who didn't open the campaign
               data (array): structs for each campaign member matching as returned by lists/member-info()

        Raises:
           CampaignInvalidOptionError:
           CampaignDoesNotExistError:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'opts': opts}
        return self.master.call('reports/not-opened', _params)

    def opened(self, cid, opts=[]):
        """Retrieve the list of email addresses that opened a given campaign with how many times they opened

        Args:
           cid (string): the campaign id to get opens for (can be gathered using campaigns/list())
           opts (struct): various options for controlling returned data::
               opts.start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
               opts.limit (int): optional for large data sets, the number of results to return - defaults to 25, upper limit set at 100
               opts.sort_field (string): optional the data to sort by - "opened" (order opens occurred, default) or "opens" (total number of opens). Invalid fields will fall back on the default.
               opts.sort_dir (string): optional the direct - ASC or DESC. defaults to ASC (case insensitive)

        Returns:
           struct.  containing the total records matched and the specific records for this page::
               total (int): the total number of records matched
               data (array): structs for the actual opens data, including:::
                   data.member (struct): the member record as returned by lists/member-info()
                   data.opens (int): Total number of times the campaign was opened by this email address


        Raises:
           CampaignInvalidOptionError:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'opts': opts}
        return self.master.call('reports/opened', _params)

    def domain_performance(self, cid):
        """Get the top 5 performing email domains for this campaign. Users wanting more than 5 should use campaign reports/member-activity()
or campaignEmailStatsAIMAll() and generate any additional stats they require.

        Args:
           cid (string): the campaign id to pull email domain performance for (can be gathered using campaigns/list())

        Returns:
           array.  domains structs for each email domains and their associated stats::
               domain (string): Domain name or special "Other" to roll-up stats past 5 domains
               total_sent (int): Total Email across all domains - this will be the same in every row
               emails (int): Number of emails sent to this domain
               bounces (int): Number of bounces
               opens (int): Number of opens
               clicks (int): Number of clicks
               unsubs (int): Number of unsubs
               delivered (int): Number of deliveries
               emails_pct (int): Percentage of emails that went to this domain (whole number)
               bounces_pct (int): Percentage of bounces from this domain (whole number)
               opens_pct (int): Percentage of opens from this domain (whole number)
               clicks_pct (int): Percentage of clicks from this domain (whole number)
               unsubs_pct (int): Percentage of unsubs from this domain (whole number)

        Raises:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('reports/domain-performance', _params)

    def geo_opens(self, cid):
        """Retrieve the countries/regions and number of opens tracked for each. Email address are not returned.

        Args:
           cid (string): the campaign id to pull bounces for (can be gathered using campaigns/list())

        Returns:
           array.  an array of country structs where opens occurred::
               code (string): The ISO3166 2 digit country code
               name (string): A version of the country name, if we have it
               opens (int): The total number of opens that occurred in the country
               regions (array): structs of data for each sub-region in the country::
                   regions.code (string): An internal code for the region. When this is blank, it indicates we know the country, but not the region
                   regions.name (string): The name of the region, if we have one. For blank "code" values, this will be "Rest of Country"
                   regions.opens (int): The total number of opens that occurred in the country


        Raises:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('reports/geo-opens', _params)

    def google_analytics(self, cid):
        """Retrieve the Google Analytics data we've collected for this campaign. Note, requires Google Analytics Add-on to be installed and configured.

        Args:
           cid (string): the campaign id to pull bounces for (can be gathered using campaigns/list())

        Returns:
           array.  of structs for analytics we've collected for the passed campaign.::
               visits (int): number of visits
               pages (int): number of page views
               new_visits (int): new visits recorded
               bounces (int): vistors who "bounced" from your site
               time_on_site (double): the total time visitors spent on your sites
               goal_conversions (int): number of goals converted
               goal_value (double): value of conversion in dollars
               revenue (double): revenue generated by campaign
               transactions (int): number of transactions tracked
               ecomm_conversions (int): number Ecommerce transactions tracked
               goals (array): structs containing goal names and number of conversions::
                   goals.name (string): the name of the goal
                   goals.conversions (int): the number of conversions for the goal


        Raises:
           UserModuleNotPurchasedError:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('reports/google-analytics', _params)

    def sent_to(self, cid, opts=[]):
        """Get email addresses the campaign was sent to

        Args:
           cid (string): the campaign id to pull members for (can be gathered using campaigns/list())
           opts (struct): various options for controlling returned data::
               opts.status (string): optional the status to pull - one of 'sent', 'hard' (bounce), or 'soft' (bounce). By default, all records are returned
               opts.start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
               opts.limit (int): optional for large data sets, the number of results to return - defaults to 25, upper limit set at 100

        Returns:
           struct.  a total of all matching emails and the specific emails for this page::
               total (int): the total number of members for the campaign and status
               data (array): structs for each campaign member matching::
                   data.member (struct): the member record as returned by lists/member-info()
                   data.status (string): the status of the send - one of 'sent', 'hard', 'soft'
                   data.absplit_group (string): if this was an absplit campaign, one of 'a','b', or 'winner'
                   data.tz_group (string): if this was an timewarp campaign the timezone GMT offset the member was included in


        Raises:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'opts': opts}
        return self.master.call('reports/sent-to', _params)

    def share(self, cid, opts=[]):
        """Get the URL to a customized <a href="http://eepurl.com/gKmL" target="_blank">VIP Report</a> for the specified campaign and optionally send an email to someone with links to it. Note subsequent calls will overwrite anything already set for the same campign (eg, the password)

        Args:
           cid (string): the campaign id to share a report for (can be gathered using campaigns/list())
           opts (array): optional various parameters which can be used to configure the shared report::
               opts.to_email (string): optional - optional, comma delimited list of email addresses to share the report with - no value means an email will not be sent
               opts.theme_id (int): optional - either a global or a user-specific theme id. Currently this needs to be pulled out of either the Share Report or Cobranding web views by grabbing the "theme" attribute from the list presented.
               opts.css_url (string): optional - a link to an external CSS file to be included after our default CSS (http://vip-reports.net/css/vip.css) <strong>only if</strong> loaded via the "secure_url" - max 255 bytes

        Returns:
           struct.  details for the shared report, including:::
               title (string): The Title of the Campaign being shared
               url (string): The URL to the shared report
               secure_url (string): The URL to the shared report, including the password (good for loading in an IFRAME). For non-secure reports, this will not be returned
               password (string): If secured, the password for the report, otherwise this field will not be returned

        Raises:
           InvalidOptionsError:
           InvalidEmailError:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'opts': opts}
        return self.master.call('reports/share', _params)

    def summary(self, cid):
        """Retrieve relevant aggregate campaign statistics (opens, bounces, clicks, etc.)

        Args:
           cid (string): the campaign id to pull stats for (can be gathered using campaigns/list())

        Returns:
           struct.  the statistics for this campaign::
               syntax_errors (int): Number of email addresses in campaign that had syntactical errors.
               hard_bounces (int): Number of email addresses in campaign that hard bounced.
               soft_bounces (int): Number of email addresses in campaign that soft bounced.
               unsubscribes (int): Number of email addresses in campaign that unsubscribed.
               abuse_reports (int): Number of email addresses in campaign that reported campaign for abuse.
               forwards (int): Number of times email was forwarded to a friend.
               forwards_opens (int): Number of times a forwarded email was opened.
               opens (int): Number of times the campaign was opened.
               last_open (string): Date of the last time the email was opened.
               unique_opens (int): Number of people who opened the campaign.
               clicks (int): Number of times a link in the campaign was clicked.
               unique_clicks (int): Number of unique recipient/click pairs for the campaign.
               last_click (string): Date of the last time a link in the email was clicked.
               users_who_clicked (int): Number of unique recipients who clicked on a link in the campaign.
               emails_sent (int): Number of email addresses campaign was sent to.
               unique_likes (int): total number of unique likes (Facebook)
               recipient_likes (int): total number of recipients who liked (Facebook) the campaign
               facebook_likes (int): total number of likes (Facebook) that came from Facebook
               industry (struct): Various rates/percentages for the account's selected industry - empty otherwise. These will vary across calls, do not use them for anything important.::
                   industry.type (string): the selected industry
                   industry.open_rate (float): industry open rate
                   industry.click_rate (float): industry click rate
                   industry.bounce_rate (float): industry bounce rate
                   industry.unopen_rate (float): industry unopen rate
                   industry.unsub_rate (float): industry unsub rate
                   industry.abuse_rate (float): industry abuse rate

               absplit (struct): If this was an absplit campaign, stats for the A and B groups will be returned - otherwise this is empty::
                   absplit.bounces_a (int): bounces for the A group
                   absplit.bounces_b (int): bounces for the B group
                   absplit.forwards_a (int): forwards for the A group
                   absplit.forwards_b (int): forwards for the B group
                   absplit.abuse_reports_a (int): abuse reports for the A group
                   absplit.abuse_reports_b (int): abuse reports for the B group
                   absplit.unsubs_a (int): unsubs for the A group
                   absplit.unsubs_b (int): unsubs for the B group
                   absplit.recipients_click_a (int): clicks for the A group
                   absplit.recipients_click_b (int): clicks for the B group
                   absplit.forwards_opens_a (int): opened forwards for the A group
                   absplit.forwards_opens_b (int): opened forwards for the B group
                   absplit.opens_a (int): total opens for the A group
                   absplit.opens_b (int): total opens for the B group
                   absplit.last_open_a (string): date/time of last open for the A group
                   absplit.last_open_b (string): date/time of last open for the BG group
                   absplit.unique_opens_a (int): unique opens for the A group
                   absplit.unique_opens_b (int): unique opens for the B group

               timewarp (array): If this campaign was a Timewarp campaign, an array of structs from each timezone stats exist for. Each will contain:::
                   timewarp.opens (int): opens for this timezone
                   timewarp.last_open (string): the date/time of the last open for this timezone
                   timewarp.unique_opens (int): the unique opens for this timezone
                   timewarp.clicks (int): the total clicks for this timezone
                   timewarp.last_click (string): the date/time of the last click for this timezone
                   timewarp.unique_opens (int): the unique clicks for this timezone
                   timewarp.bounces (int): the total bounces for this timezone
                   timewarp.total (int): the total number of members sent to in this timezone
                   timewarp.sent (int): the total number of members delivered to in this timezone

               timeseries (array): structs for the first 24 hours of the campaign, per-hour stats:::
                   timeseries.timestamp (string): The timestemp in Y-m-d H:00:00 format
                   timeseries.emails_sent (int): the total emails sent during the hour
                   timeseries.unique_opens (int): unique opens seen during the hour
                   timeseries.recipients_click (int): unique clicks seen during the hour


        Raises:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid}
        return self.master.call('reports/summary', _params)

    def unsubscribes(self, cid, opts=[]):
        """Get all unsubscribed email addresses for a given campaign

        Args:
           cid (string): the campaign id to pull bounces for (can be gathered using campaigns/list())
           opts (struct): various options for controlling returned data::
               opts.start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
               opts.limit (int): optional for large data sets, the number of results to return - defaults to 25, upper limit set at 100

        Returns:
           struct.  a total of all unsubscribed emails and the specific members for this page::
               total (int): the total number of unsubscribes for the campaign
               data (array): structs for the email addresses that unsubscribed::
                   data.member (string): the member that unsubscribed as returned by lists/member-info()
                   data.reason (string): the reason collected for the unsubscribe. If populated, one of 'NORMAL','NOSIGNUP','INAPPROPRIATE','SPAM','OTHER'
                   data.reason_text (string): if the reason is OTHER, the text entered.


        Raises:
           InvalidPagingStartError:
           InvalidPagingLimitError:
           CampaignStatsNotAvailableError:
           CampaignDoesNotExistError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'cid': cid, 'opts': opts}
        return self.master.call('reports/unsubscribes', _params)


class Gallery(object):
    def __init__(self, master):
        self.master = master

    def list(self, opts=[]):
        """Return a section of the image gallery

        Args:
           opts (struct): various options for controlling returned data::
               opts.type (string): optional the gallery type to return - images or files - default to images
               opts.start (int): optional for large data sets, the page number to start at - defaults to 1st page of data  (page 0)
               opts.limit (int): optional for large data sets, the number of results to return - defaults to 25, upper limit set at 100
               opts.sort_by (string): optional field to sort by - one of size, time, name - defaults to time
               opts.sort_dir (string): optional field to sort by - one of asc, desc - defaults to desc
               opts.search_term (string): optional a term to search for in names

        Returns:
           struct.  the matching gallery items::
               total (int): the total matching items
               data (array): structs for each item included in the set, including:::
                   data.name (string): the file name
                   data.time (string): the creation date for the item
                   data.size (int): the file size in bytes
                   data.full (string): the url to the actual item in the gallery
                   data.thumb (string): a url for a thumbnail that can be used to represent the item, generally an image thumbnail or an icon for a file type


        Raises:
           ValidationError:
           Error: A general Mailchimp error has occurred
        """
        _params = {'opts': opts}
        return self.master.call('gallery/list', _params)



