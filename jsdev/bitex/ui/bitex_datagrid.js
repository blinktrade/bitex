goog.provide('bitex.ui.DataGrid');
goog.provide('bitex.ui.DataGrid.EventType');
goog.provide('bitex.ui.DataGridEvent');

goog.require('bitex.ui.DataGrid.templates');
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
bitex.ui.DataGrid = function (options, opt_domHelper) {
  goog.base(this, opt_domHelper);

  var model = {
    title: options['title'],
    columns: options['columns'],
    rowIDFn: options['rowIDFn'] || goog.nullFunction,
    rowClassFn: options['rowClassFn'] || goog.nullFunction,
    currentPage: options['currentPage'] || 0,
    limit: options['limit'] || 100,
    blinkDelay: options['blinkDelay'] || 700,
    wrapperHeight: options['wrapperHeight'],
    showSearch: options['showSearch'],
    searchPlaceholder: options['searchPlaceholder'],
    buttonFilters: options['buttonFilters']
  };
  
  
  this.setModel(model);

  this.sort_column_ = "";
  this.sort_direction_ = "up";
  this.filter_ = null;
  this.select_filter_ = null;

  this.loading_data_ = goog.dom.createDom('div', ['progress', 'progress-striped', 'active' ],
                                          goog.dom.createDom('div', 'bar' ));

  goog.style.setWidth(this.loading_data_, "50%" );
  goog.style.setStyle(this.loading_data_, 'margin' , 'auto');
  goog.style.setWidth( goog.dom.getFirstElementChild(this.loading_data_), "100%" );

};
goog.inherits( bitex.ui.DataGrid, goog.ui.Component);


/**
 * Events fired by Grid
 * @enum {string}
 */
bitex.ui.DataGrid.EventType = {
  /** dispatched after set */
  REQUEST_DATA: 'request_data'
};

/**
 * @type {Element}
 * @private
 */
bitex.ui.DataGrid.prototype.tr_columns_el_;

/**
 * @type {Element}
 * @private
 */
bitex.ui.DataGrid.prototype.th_sizing_el_;


/**
 * @type {Element}
 * @private
 */
bitex.ui.DataGrid.prototype.table_data_body_el_;

/**
 * @type {string}
 * @private
 */
bitex.ui.DataGrid.prototype.sort_column_;

/**
 * @type {string}
 * @private
 */
bitex.ui.DataGrid.prototype.sort_direction_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.DataGrid.prototype.element_start_counter_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.DataGrid.prototype.element_end_counter_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.DataGrid.prototype.element_prev_button_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.DataGrid.prototype.element_refresh_;


/**
 * @type {!Element}
 * @private
 */
bitex.ui.DataGrid.prototype.element_next_button_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.DataGrid.prototype.loading_data_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.DataGrid.prototype.search_input_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.DataGrid.prototype.search_btn_;

/**
 * @type {string}
 * @private
 */
bitex.ui.DataGrid.prototype.filter_;

/**
 * Name of base CSS class
 * @type {string}
 * @private
 */
bitex.ui.DataGrid.BASE_CSS_CLASS_ = goog.getCssName('datagrid');


/**
 * Returns base CSS class. This getter is used to get base CSS class part.
 * All CSS class names in component are created as:
 *   goog.getCssName(this.getBaseCssClass(), 'CLASS_NAME')
 * @return {string} Base CSS class.
 */
bitex.ui.DataGrid.prototype.getBaseCssClass = function() {
  return bitex.ui.DataGrid.BASE_CSS_CLASS_;
};

/** @inheritDoc */
bitex.ui.DataGrid.prototype.createDom = function() {
  var el = goog.soy.renderAsElement(bitex.ui.DataGrid.templates.DataGrid, {
    id: this.makeId('grid'),
    title: this.getModel().title,
    wrapper_height: this.getModel().wrapperHeight,
    base_class: this.getBaseCssClass(),
    show_search: this.getModel().showSearch,
    search_placeholder: this.getModel().searchPlaceholder,
    button_filters: this.getModel().buttonFilters
  });
  this.decorateInternal(el);
};


/** @override */
bitex.ui.DataGrid.prototype.decorateInternal = function(element) {
  this.element_ = element;

  var table_header_element = goog.dom.getFirstElementChild(element);
  goog.dom.classes.add(table_header_element, this.getBaseCssClass());

  var thead_element = goog.dom.getFirstElementChild(table_header_element);

  var first_th_column_el = goog.dom.getFirstElementChild(
                              goog.dom.getFirstElementChild( thead_element ) );

  // set the number of columns
  first_th_column_el.setAttribute('colspan', this.getModel().columns.length );

  var column_header_el = goog.dom.getNextElementSibling(goog.dom.getFirstElementChild(thead_element));
  if (goog.isDefAndNotNull(column_header_el)) {
    goog.dom.removeNode(column_header_el);
  }

  // Render all columns
  this.th_sizing_el_ = goog.dom.createDom('tr');

  this.tr_columns_el_ = goog.dom.createDom('tr');
  goog.array.forEach(this.getModel().columns, function(column){
    var th_column_properties = {
      'data-property': column['property']
    };
    if ( column['sortable']) {
      th_column_properties['class'] = 'sortable';
    }

    goog.dom.appendChild(this.tr_columns_el_, goog.dom.createDom( 'th', th_column_properties, column['label'] ));


    goog.dom.appendChild(this.th_sizing_el_, goog.dom.createDom( 'th', th_column_properties, column['label'] ));

  }, this);
  goog.dom.appendChild(thead_element, this.tr_columns_el_ );

  this.table_data_body_el_ =  goog.dom.getFirstElementChild(
                                  goog.dom.getFirstElementChild(
                                      goog.dom.getNextElementSibling(table_header_element)));


  this.element_start_counter_ = goog.dom.getElementByClass( 'grid-start', element );
  this.element_end_counter_   = goog.dom.getElementByClass( 'grid-end', element );
  this.element_refresh_       = goog.dom.getElementByClass( 'grid-refresh', element );
  this.element_prev_button_   = goog.dom.getElementByClass( 'grid-prevpage', element );
  this.element_next_button_   = goog.dom.getElementByClass( 'grid-nextpage', element );

  var search_div = goog.dom.getElementByClass('datagrid-search', element);
  this.search_input_ = goog.dom.getFirstElementChild(search_div);
  this.search_btn_ = goog.dom.getNextElementSibling(this.search_input_);


  var filter_div = goog.dom.getElementByClass('datagrid-filter', element);
  if (goog.isDefAndNotNull(filter_div)) {
    var selected_filter_option_el =
        goog.dom.getFirstElementChild(
          goog.dom.getNextElementSibling(
            goog.dom.getFirstElementChild(filter_div)));

    if (goog.isDefAndNotNull(selected_filter_option_el)) {
      this.select_filter_ = null;
      var data_value = null;
      if (selected_filter_option_el.tagName  === goog.dom.TagName.LI ) {
        data_value = selected_filter_option_el.getAttribute('data-value');
      }

      if (goog.isDefAndNotNull( data_value) ) {
        if (data_value !== 'all') {
          this.select_filter_ = data_value;
        }
      }
    }
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.DataGrid.prototype.handleRefreshPage_ = function(e){
  this.render_data_();
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.DataGrid.prototype.handlePreviousPage_ = function(e){
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
bitex.ui.DataGrid.prototype.handleNextPage_ = function(e){
  this.getModel().currentPage += 1;
  this.render_data_();
};

bitex.ui.DataGrid.prototype.handleColumnClick_ = function(e){
  var element =  e.target;

  if ( goog.dom.classes.has(element, 'sortable') ) {
    this.sort_column_ = element.getAttribute('data-property');

    if (goog.dom.classes.has(element,'sorted')) {
      var sort_indicator_element = goog.dom.getElementByClass('datagrid-sort', element);
      var classToRemove;
      var classToAdd;
      if (goog.dom.classes.has(sort_indicator_element, 'icon-chevron-up') ) {
        classToRemove = 'icon-chevron-up';
        classToAdd = 'icon-chevron-down';
        this.sort_direction_ = 'ASC';
      } else {
        classToRemove = 'icon-chevron-down';
        classToAdd = 'icon-chevron-up';
        this.sort_direction_ = 'DESC';
      }

      goog.dom.classes.addRemove(sort_indicator_element, classToRemove, classToAdd  );

    } else {
      var other_sorted_column_elements = goog.dom.getElementsByClass('sorted', this.tr_columns_el_ );
      goog.array.forEach( other_sorted_column_elements, function(other_sorted_column_element){
        goog.dom.classes.remove(other_sorted_column_element, 'sorted');
        var other_sort_indicator_element = goog.dom.getElementByClass('datagrid-sort', other_sorted_column_element);
        if (goog.isDefAndNotNull(other_sort_indicator_element)) {
          goog.dom.removeNode(other_sort_indicator_element);
        }
      }, this );

      //<i class="icon-chevron-up datagrid-sort"></i>
      sort_indicator_element = goog.dom.createDom('i', ['icon-chevron-up', 'datagrid-sort'] );
      goog.dom.appendChild(element, sort_indicator_element);
      this.sort_direction_ = 'DESC';
      goog.dom.classes.add(element, 'sorted');
    }

    this.render_data_();
  }
};

/**
 * @private
 */
bitex.ui.DataGrid.prototype.render_data_ = function() {

  goog.dom.setTextContent( this.element_start_counter_, this.getModel().currentPage * this.getModel().limit + 1  );
  goog.dom.setTextContent( this.element_end_counter_, this.getModel().currentPage * this.getModel().limit + this.getModel().limit  );


  var options = {
    'Page' : this.getModel().currentPage,
    'Limit': this.getModel().limit
  };
  var cols = [];
  goog.array.forEach( this.getModel().columns, function(column) {
    var property = column['property'];
    if (goog.isDefAndNotNull( property )) {
      cols.push(property)
    }
  }, this );

  options['Columns'] = cols;

  if ( ! goog.string.isEmptySafe(this.sort_column_) ) {
    options['Sort'] = this.sort_column_;
    options['SortOrder'] = this.sort_direction_;
  }

  var filter = this.getFilter();
  if (goog.isDefAndNotNull(filter) && filter.length > 0 ) {
    options['Filter'] = filter;
  }

  // request data
  this.dispatchEvent( new bitex.ui.DataGridEvent(bitex.ui.DataGrid.EventType.REQUEST_DATA, options));

  goog.dom.removeChildren(this.table_data_body_el_);
  goog.dom.appendChild(this.table_data_body_el_,this.loading_data_);
};


/** @inheritDoc */
bitex.ui.DataGrid.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  handler.listen(this.element_refresh_, goog.events.EventType.CLICK, this.handleRefreshPage_);
  handler.listen(this.element_prev_button_, goog.events.EventType.CLICK, this.handlePreviousPage_);
  handler.listen(this.element_next_button_, goog.events.EventType.CLICK, this.handleNextPage_);

  //TODO: Listen for click on all sortable columns
  handler.listen(this.tr_columns_el_, goog.events.EventType.CLICK, this.handleColumnClick_);


  handler.listen(this.search_btn_, goog.events.EventType.CLICK, this.handleSearchBtnClick_ );

  handler.listen(this.getElement(), goog.events.EventType.CLICK, this.handleDataGridClick_);

  handler.listen( new goog.events.InputHandler(this.search_input_),
                  goog.events.InputHandler.EventType.INPUT,
                  this.onChangeFilter_ );

  this.render_data_();
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.DataGrid.prototype.handleDataGridClick_ = function(e) {
  var element = e.target;
  var is_filter_click = false;
  var data_value = null;

  if (element.tagName  === goog.dom.TagName.A ) {
    element = goog.dom.getParentElement(element);
  }
  if (element.tagName  === goog.dom.TagName.LI ) {
    data_value = element.getAttribute('data-value');
  }

  if (!goog.isDefAndNotNull( data_value) ) {
    return;
  }

  var filter_element = goog.dom.getAncestorByClass( element, 'filter');
  if (goog.isDefAndNotNull(filter_element)) {
    is_filter_click = true;
  }

  if (is_filter_click) {
    // user is cleaning the filter
    if (data_value === 'all') {
      if (goog.isDefAndNotNull(this.select_filter_)){
        this.select_filter_ = null;
        this.getModel().currentPage = 0;
        this.render_data_();
      }
    } else {
      if (this.select_filter_ !== data_value ) {
        this.select_filter_ = data_value;
        this.getModel().currentPage = 0;
        this.render_data_();
      }
    }
  }
};

/**
 * @return {string}
 */
bitex.ui.DataGrid.prototype.getFilter = function(){
  var res = [];

  if (goog.isDefAndNotNull(this.filter_) && !goog.string.isEmpty(this.filter_)) {
    res.push(this.filter_)
  }
  if (goog.isDefAndNotNull(this.select_filter_) && !goog.string.isEmpty(this.filter_)) {
    res.push(this.select_filter_)
  }
  return res;
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.DataGrid.prototype.onChangeFilter_ = function(e) {
  var filter = goog.dom.forms.getValue(this.search_input_);

  if (goog.string.isEmpty(filter) && goog.isNull(this.filter_)) {
    goog.dom.classes.addRemove( goog.dom.getFirstElementChild(this.search_btn_), 'icon-remove', 'icon-search'  );
    return;
  }
  if (filter === this.filter_ && goog.isDefAndNotNull(this.filter_)  ) {
    goog.dom.classes.addRemove( goog.dom.getFirstElementChild(this.search_btn_), 'icon-search', 'icon-remove' );
  } else{
    goog.dom.classes.addRemove( goog.dom.getFirstElementChild(this.search_btn_), 'icon-remove', 'icon-search'  );
  }
};

/**
 * @param {goog.events.Event} e
 */
bitex.ui.DataGrid.prototype.handleSearchBtnClick_ = function(e) {
  var filter = goog.dom.forms.getValue(this.search_input_);

  if (goog.string.isEmpty(filter) && goog.isNull(this.filter_)) {
    return;
  }

  if (filter === this.filter_ && goog.isDefAndNotNull(this.filter_)  ) {
    this.filter_ = null;
    goog.dom.forms.setValue(this.search_input_, "");
    goog.dom.classes.addRemove( goog.dom.getFirstElementChild(this.search_btn_), 'icon-remove', 'icon-search' );
    this.getModel().currentPage = 0;
    this.render_data_();
  } else {
    this.filter_ = filter;
    goog.dom.classes.addRemove( goog.dom.getFirstElementChild(this.search_btn_), 'icon-search', 'icon-remove' );
    this.getModel().currentPage = 0;
    this.render_data_();
  }
};


/**
 * reloads the datagrid
 */
bitex.ui.DataGrid.prototype.reload = function() {
  this.render_data_();
};

/**
 *
 * @param {Element} row_element
 * @param {string} column
 * @param {*} value
 * @param {=Array.<Array.<*> >} opt_row_set_obj
 * @return {Element}
 */
bitex.ui.DataGrid.prototype.setColumnValue = function(row_element, column, value, opt_row_set_obj) {
  var result_set_col_index = {};
  goog.array.forEach( this.getModel().columns, function(this_col, index_row_set) {
    result_set_col_index[this_col['property']] = index_row_set;
  });
  var index = result_set_col_index[column];
  if (!goog.isDefAndNotNull(index)) {
    return undefined;
  }


  var td_element = goog.dom.getChildren(row_element)[ index ];

  var currentValue = goog.dom.getTextContent(td_element);

  var formatter = this.getModel().columns[index]['formatter'] || function(){return '' + value };
  var new_value = formatter(value, opt_row_set_obj);

  if (currentValue !== new_value){
    if ( goog.isString(new_value)) {
      goog.dom.setTextContent(td_element, new_value);
      return td_element;
    }
  }
  return undefined;
};

/**
 *
 * @param {string} column
 * @param {!Function()} formatter
 * @param {Object=} opt_handler Object in whose scope to call the listener.

 */
bitex.ui.DataGrid.prototype.setColumnFormatter = function(column, formatter, opt_handler) {
  var result_set_col_index = {};
  goog.array.forEach( this.getModel().columns, function(this_col, index_row_set) {
    result_set_col_index[this_col['property']] = index_row_set;
  });
  var index = result_set_col_index[column];
  if (!goog.isDefAndNotNull(index)) {
    return;
  }

  if (goog.isDefAndNotNull(opt_handler)) {
    this.getModel().columns[index]['formatter'] = goog.bind(formatter, opt_handler);
  } else {
    this.getModel().columns[index]['formatter'] = formatter;
  }
};

/**
 * @param {Object} record
 * @param {number=} opt_index
 */
bitex.ui.DataGrid.prototype.insertOrUpdateRecord = function(record, opt_index) {
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
  var tr = null;
  var is_new_record = false;
  if (goog.isDefAndNotNull(row_id)) {
    tr = goog.dom.getElement(row_id);
  }

  var rowClassFn = goog.bind(this.getModel().rowClassFn, this);
  if (!goog.isDefAndNotNull(tr)) {
    tr = goog.dom.createDom( 'tr', rowClassFn(record) );
    tr.id = row_id;
    is_new_record = true;
  } else {
    tr.className = rowClassFn(record);
  }

  var td_elements = {};
  goog.array.forEach( row_set, function(value, result_set_index) {
    var index = result_set_col_index[result_set_index];

    if (goog.isDefAndNotNull( index ) ) {
      var formatter = this.getModel().columns[index]['formatter'] || function(){return '' + value };
      var classes = this.getModel().columns[index]['classes'] || goog.nullFunction;


      var td = goog.dom.createDom( 'td', classes(value), formatter(value, record ) );
      td_elements[this.getModel().columns[ index]['property'] ]  = td;
    } else {

    }
  }, this);

  if (!is_new_record) {
    goog.dom.removeChildren(tr);
  }
  goog.array.forEach( this.getModel().columns, function(col) {
    var td = td_elements[col['property']];
    if (!goog.isDefAndNotNull(td)) {
      td = goog.dom.createDom( 'td', undefined, '' );
    }
    goog.dom.appendChild( tr, td );
  });

  if (is_new_record) {
    if (goog.isNumber(opt_index)) {
      goog.dom.insertChildAt(this.table_data_body_el_,tr, opt_index);
    } else {
      goog.dom.appendChild(this.table_data_body_el_,tr );
    }
  }

  var first_row = goog.dom.getFirstElementChild(this.table_data_body_el_);

  // adjust sizes
  if ( goog.isDefAndNotNull(first_row) ){
    this.adjustSizes_(first_row);
  }

  var blink_class = 'warning';
  goog.dom.classes.add( tr,  blink_class );
  goog.Timer.callOnce( function(){
    goog.dom.classes.remove( tr,  blink_class );
  }, this.getModel().blinkDelay , this);

};

/**
 * @param {Array.<Array.<*> >} resultSet
 * @param {Array.<string >} columns
 * @return {Array.<Element>}
 */
bitex.ui.DataGrid.prototype.resultSetToElements = function(resultSet, columns) {
  var elements = [];

  var result_set_col_index = {};
  goog.array.forEach( this.getModel().columns, function(this_col, index_row_set) {
    var index = goog.array.findIndex( columns, function( col ) {
      return col == this_col['property'];
    });
    result_set_col_index[index] = index_row_set;
  });

  goog.array.forEach( resultSet, function(row_set) {
    var row_set_obj = {};
    goog.array.forEach( row_set, function(value, result_set_index) {
      var index = result_set_col_index[result_set_index];
      if (goog.isDefAndNotNull( index ) ) {
        row_set_obj[this.getModel().columns[index]['property'] ] = value;
      }
    }, this);

    var rowSetObj = {};
    for ( var x in columns) {
      rowSetObj[columns[x]] = row_set[x];
    }

    var rowClassFn = goog.bind(this.getModel().rowClassFn, this);
    var tr = goog.dom.createDom( 'tr', rowClassFn(rowSetObj) );

    var rowIDFn = goog.bind(this.getModel().rowIDFn, this);
    var row_id = rowIDFn(rowSetObj);
    if (goog.isDefAndNotNull(row_id)) {
      tr.id = row_id;
    }


    var td_elements = {};
    goog.array.forEach( row_set, function(value, result_set_index) {
      var index = result_set_col_index[result_set_index];

      if (goog.isDefAndNotNull( index ) ) {
        var formatter = this.getModel().columns[index]['formatter'] || function(){return '' + value };
        var classes = this.getModel().columns[index]['classes'] || goog.nullFunction;

        var td = goog.dom.createDom( 'td', classes(value), formatter(value, rowSetObj ) );
        td_elements[this.getModel().columns[ index]['property'] ]  = td;
      } else {

      }
    }, this);

    goog.array.forEach( this.getModel().columns, function(col) {
      var td = td_elements[col['property']];
      if (!goog.isDefAndNotNull(td)) {
        td = goog.dom.createDom( 'td', undefined, '' );
      }
      goog.dom.appendChild( tr, td );
    });


    elements.push(tr);
  }, this );

  return elements;
};

/**
 *
 * @param {Array.<Array.<*> >} resultSet
 * @param {Array.<string >} columns
 */
bitex.ui.DataGrid.prototype.setResultSet = function(resultSet, columns) {
  goog.dom.removeChildren(this.table_data_body_el_);

  var elements = this.resultSetToElements(resultSet, columns);
  var first_row = elements[0];

  goog.array.forEach( elements, function(tr){
    goog.dom.appendChild(this.table_data_body_el_,tr );
  }, this );

  // adjust sizes
  if ( goog.isDefAndNotNull(first_row) ){
    this.adjustSizes_(first_row);
  }
};

/**
 * @param {Element} first_row
 * @protected
 */
bitex.ui.DataGrid.prototype.adjustSizes_ = function( first_row) {

  goog.dom.insertSiblingBefore( this.th_sizing_el_, first_row );

  var adjustRowSize = function ( header_row, data_row, sizing_row  ) {
    var work_col_1 =  goog.dom.getFirstElementChild(header_row);
    var work_col_2 =  goog.dom.getFirstElementChild(data_row);

    var sizing_col = goog.dom.getFirstElementChild(sizing_row);
    var sizing_col_count = goog.dom.getChildren(sizing_row).length;

    while( goog.isDefAndNotNull(sizing_col)  ) {
      var el_size =  goog.style.getSize( sizing_col) ;

      goog.style.setWidth( work_col_1, el_size.width );
      goog.style.setWidth( work_col_2, el_size.width );


      work_col_1 = goog.dom.getNextElementSibling(work_col_1);
      work_col_2 = goog.dom.getNextElementSibling(work_col_2);

      sizing_col = goog.dom.getNextElementSibling(sizing_col);
    }
  };

  adjustRowSize(this.tr_columns_el_, first_row, this.th_sizing_el_);

  goog.dom.removeNode(this.th_sizing_el_);

};

/**
 *
 * @param {string} type
 * @param {Object} options
 * @extends {goog.events.Event}
 * @constructor
 */
bitex.ui.DataGridEvent = function(type, options) {
  goog.events.Event.call(this, type);

  /**
   * @type {Object}
   */
  this.options = options;
};
goog.inherits(bitex.ui.DataGridEvent, goog.events.Event);

