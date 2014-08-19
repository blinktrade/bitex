goog.provide('bitex.ui.ListView');
goog.provide('bitex.ui.ListView.EventType');
goog.provide('bitex.ui.ListViewEvent');

goog.require('bitex.ui.ListView.templates');
goog.require('goog.ui.Component');

goog.require('goog.object');
goog.require('goog.array');
goog.require('goog.style');
goog.require('goog.string');
goog.require('goog.dom.forms');
goog.require('goog.events.InputHandler');
goog.require('goog.dom.classes');
goog.require('goog.Timer');


/**
 * @param {<Object>} options
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.ListView = function (options, opt_domHelper) {
  goog.base(this, opt_domHelper);

  var model = {
    rowIDFn: options['rowIDFn'] || goog.nullFunction,
    rowClassFn: options['rowClassFn'] || goog.nullFunction,
    rowFormatterFn: options['rowFormatterFn'] || goog.nullFunction,
    currentPage: options['currentPage'] || 0,
    limit: options['limit'] || 100,
    blinkDelay: options['blinkDelay'] || 700,
    showSearch: options['showSearch'] || false,
    searchPlaceholder: options['searchPlaceholder'] || false
  };

  this.setModel(model);

  this.loading_data_ = goog.dom.createDom('div', ['progress', 'progress-striped', 'active' ],
                                          goog.dom.createDom('div', 'bar' ));

  goog.style.setWidth(this.loading_data_, "50%" );
  goog.style.setStyle(this.loading_data_, 'margin' , 'auto');
  goog.style.setWidth( goog.dom.getFirstElementChild(this.loading_data_), "100%" );
};
goog.inherits( bitex.ui.ListView, goog.ui.Component);


/**
 * Events fired by Grid
 * @enum {string}
 */
bitex.ui.ListView.EventType = {
  /** dispatched after set */
  REQUEST_DATA: 'list_view_request_data'
};

/**
 * @type {Element}
 * @private
 */
bitex.ui.ListView.prototype.th_sizing_el_;


/**
 * @type {Element}
 * @private
 */
bitex.ui.ListView.prototype.table_data_body_el_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.ListView.prototype.element_start_counter_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.ListView.prototype.element_end_counter_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.ListView.prototype.element_prev_button_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.ListView.prototype.element_refresh_;


/**
 * @type {!Element}
 * @private
 */
bitex.ui.ListView.prototype.element_next_button_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.ListView.prototype.loading_data_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.ListView.prototype.search_input_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.ListView.prototype.search_btn_;

/**
 * @type {string}
 * @private
 */
bitex.ui.ListView.prototype.filter_;

/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.ListView.BASE_CSS_CLASS_ = goog.getCssName('list-view');


/**
 * Returns base CSS class. This getter is used to get base CSS class part.
 * All CSS class names in component are created as:
 *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
 * @return {string} Base CSS class.
 */
bitex.ui.ListView.prototype.getBaseCssClass = function() {
  return bitex.ui.ListView.BASE_CSS_CLASS_;
};

/** @inheritDoc */
bitex.ui.ListView.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(bitex.ui.ListView.templates.ListView, {
    id: this.makeId('list'),
    base_class: this.getBaseCssClass(),
    show_search: this.getModel().showSearch,
    search_placeholder: this.getModel().searchPlaceholder
  });
  this.decorateInternal(el);
};


/** @override */
bitex.ui.ListView.prototype.decorateInternal = function(element) {
  this.element_ = element;
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.ListView.prototype.handleRefreshPage_ = function(e){
  this.render_data_();
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.ListView.prototype.handlePreviousPage_ = function(e){
  if (this.getModel().currentPage <= 0) {
    return;
  }

  this.getModel().currentPage -= 1;
  this.render_data_();
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.ListView.prototype.handleNextPage_ = function(e){
  this.getModel().currentPage += 1;
  this.render_data_();
};

/**
 * @private
 */
bitex.ui.ListView.prototype.render_data_ = function() {
  var options = {
    'Page' : this.getModel().currentPage,
    'Limit': this.getModel().limit
  };

  var filter = this.getFilter();
  if (goog.isDefAndNotNull(filter) && filter.length > 0 ) {
    options['Filter'] = filter;
  }

  // request data
  this.dispatchEvent( new bitex.ui.ListViewEvent(bitex.ui.ListView.EventType.REQUEST_DATA, options));
};


/** @inheritDoc */
bitex.ui.ListView.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.render_data_();
};

/**
 * @return {string}
 */
bitex.ui.ListView.prototype.getFilter = function() {
  // TODO: return the filter text
  return undefined;
};

/**
 *
 */
bitex.ui.ListView.prototype.setPage = function(page) {
  this.getModel().currentPage = page;
};


/**
 * reloads the ListView
 */
bitex.ui.ListView.prototype.reload = function() {
  this.render_data_();
};


/**
 * @param {Object} record
 * @param {number=} opt_index
 */
bitex.ui.ListView.prototype.insertOrUpdateRecord = function(record, opt_index) {
  var result_set_col_index = {};
  var columns = goog.object.getKeys(record);
  var row_set = goog.object.getValues(record);
  goog.array.forEach( this.getModel().columns, function(this_col, index_row_set) {
    var index = goog.array.findIndex( columns, function( col ) {
      return col == this_col['property'];
    });
    result_set_col_index[index] = index_row_set;
  });

  var rowIDFn = goog.bind(this.getModel().rowIDFn, this);
  var row_id = rowIDFn(record);
  var row_element = null;
  var is_new_record = false;
  if (goog.isDefAndNotNull(row_id)) {
    row_element = goog.dom.getElement(row_id);
  }

  var rowFormatterFn = goog.bind(this.getModel().rowFormatterFn, this);

  var rowClassFn = goog.bind(this.getModel().rowClassFn, this);
  if (!goog.isDefAndNotNull(row_element)) {
    row_element = goog.dom.createDom( 'li', rowClassFn(record), rowFormatterFn(record ) );
    row_element.id = row_id;
  } else {
    row_element.className = rowClassFn(record);
    goog.dom.removeChildren(row_element);
    goog.dom.appendChild(row_element, rowFormatterFn(record ));
  }

  var blink_class = 'warning';
  goog.dom.classes.add( row_element,  blink_class );
  goog.Timer.callOnce( function(){
    goog.dom.classes.remove( row_element,  blink_class );
  }, this.getModel().blinkDelay , this);
};

/**
 * @param {Array.<Array.<*> >} resultSet
 * @param {Array.<string >} columns
 * @return {Array.<Element>}
 */
bitex.ui.ListView.prototype.resultSetToElements = function(resultSet, columns) {
  var elements = [];

  goog.array.forEach( resultSet, function(row_set) {

    var rowSetObj = {};
    for ( var x in columns) {
      rowSetObj[columns[x]] = row_set[x];
    }

    var rowFormatterFn = goog.bind(this.getModel().rowFormatterFn, this);

    var rowClassFn = goog.bind(this.getModel().rowClassFn, this);
    var row_element = goog.dom.createDom( 'li', rowClassFn(rowSetObj),  rowFormatterFn(rowSetObj ) );

    var rowIDFn = goog.bind(this.getModel().rowIDFn, this);
    var row_id = rowIDFn(rowSetObj);
    if (goog.isDefAndNotNull(row_id)) {
      row_element.id = row_id;
    }

    elements.push(row_element);
  }, this );

  return elements;
};


/**
 * Clears the list view
 */
bitex.ui.ListView.prototype.clear  = function(resultSet, columns) {
  var ul_element = goog.dom.getElementsByTagNameAndClass ( goog.dom.TagName.UL, undefined, this.getElement() )[0];
  goog.dom.removeChildren(ul_element);
};

/**
 * @param {Array.<Array.<*> >} resultSet
 * @param {Array.<string >} columns
 */
bitex.ui.ListView.prototype.appendResultSet  = function(resultSet, columns) {
  var ul_element = goog.dom.getElementsByTagNameAndClass ( goog.dom.TagName.UL, undefined, this.getElement() )[0];

  var elements = this.resultSetToElements(resultSet, columns);
  goog.array.forEach( elements, function(el){
    goog.dom.appendChild(ul_element, el);
  }, this );

  if ( elements.length == this.getModel().limit ) {
    console.log('reached limit');

    /**
     * @desc Load more button label on list view
     */
    var MSG_LIST_VIEW_LOAD_MORE_BUTTON_LABEL = goog.getMsg('Load more...');

    var load_more_button = goog.dom.createDom('a', { 'href':'#', 'class':'ui-btn' }, MSG_LIST_VIEW_LOAD_MORE_BUTTON_LABEL );
    load_more_button.id = this.makeId('load_more');
    goog.dom.appendChild(ul_element, load_more_button);

    this.getHandler().listenOnce(load_more_button, goog.events.EventType.CLICK, this.onLoadMoreButtonClick_ );
  }
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.ListView.prototype.onLoadMoreButtonClick_ = function(e) {
  e.stopPropagation();
  e.preventDefault();

  goog.dom.removeNode( goog.dom.getElement(this.makeId('load_more') ) );
  this.getModel().currentPage += 1;
  this.render_data_();
};

/**
 * @param {Array.<Array.<*> >} resultSet
 * @param {Array.<string >} columns
 */
bitex.ui.ListView.prototype.setResultSet = function(resultSet, columns) {
  this.clear();
  this.appendResultSet(resultSet, columns);
};

/**
 *
 * @param {string} type
 * @param {Object} options
 * @extends {goog.events.Event}
 * @constructor
 */
bitex.ui.ListViewEvent = function(type, options) {
  goog.events.Event.call(this, type);

  /**
   * @type {Object}
   */
  this.options = options;
};
goog.inherits(bitex.ui.ListViewEvent, goog.events.Event);

