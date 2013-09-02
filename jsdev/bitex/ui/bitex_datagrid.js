goog.provide('bitex.ui.DataGrid');
goog.provide('bitex.ui.DataGrid.EventType');
goog.provide('bitex.ui.DataGridEvent');

goog.require('goog.ui.Component');

goog.require('goog.array');
goog.require('goog.style');
goog.require('goog.string');

/**
 * @param {<Object>} options
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.DataGrid = function (options, opt_domHelper) {
  goog.base(this, opt_domHelper);


  this.columns_ = options['columns'];
  this.row_class_fn_ = options['rowClassFn'] || goog.nullFunction;
  this.current_page_ = options['currentPage'] || 0;
  this.limit_ = options['limit'] || 100;

  this.sort_column_ = "";
  this.sort_direction_ = "up";

  this.loading_data_ = goog.dom.createDom('div', ['progress', 'progress-striped', 'active' ],
                                          goog.dom.createDom('div', 'bar' ));

  goog.style.setWidth(this.loading_data_, "50%" );
  goog.style.setStyle(this.loading_data_, 'margin' , 'auto');
  goog.style.setWidth( goog.dom.getFirstElementChild(this.loading_data_), "100%" );

};
goog.inherits( bitex.ui.DataGrid, goog.ui.Component);

/**
 * @type {Array.<Object>}
 * @private
 */
bitex.ui.DataGrid.prototype.columns_;

/**
 * @type {*}
 * @private
 */
bitex.ui.DataGrid.prototype.row_class_fn_;



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
 * @type {number}
 * @private
 */
bitex.ui.DataGrid.prototype.current_page_;

/**
 * @type {number}
 * @private
 */
bitex.ui.DataGrid.prototype.limit_;

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
bitex.ui.DataGrid.prototype.element_next_button_;

/**
 * @type {!Element}
 * @private
 */
bitex.ui.DataGrid.prototype.loading_data_;

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

/** @override */
bitex.ui.DataGrid.prototype.decorateInternal = function(element) {
  this.element_ = element;

  var table_header_element = goog.dom.getFirstElementChild(element);
  goog.dom.classes.add(table_header_element, this.getBaseCssClass());

  var thead_element = goog.dom.getFirstElementChild(table_header_element);

  var first_th_column_el = goog.dom.getFirstElementChild(
                              goog.dom.getFirstElementChild( thead_element ) );

  // set the number of columns
  first_th_column_el.setAttribute('colspan', this.columns_.length );

  // Render all columns
  this.th_sizing_el_ = goog.dom.createDom('tr');

  this.tr_columns_el_ = goog.dom.createDom('tr');
  goog.array.forEach(this.columns_, function(column){
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
  this.element_end_counter_ = goog.dom.getElementByClass( 'grid-end', element );
  this.element_prev_button_ = goog.dom.getElementByClass( 'grid-prevpage', element );
  this.element_next_button_ = goog.dom.getElementByClass( 'grid-nextpage', element );
};


/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.DataGrid.prototype.handlePreviousPage_ = function(e){
  if (this.current_page_ <= 0) {
    return;
  }

  this.current_page_ -= 1;
  this.render_();
};

/**
 * @param {goog.events.Event} e
 * @private
 */
bitex.ui.DataGrid.prototype.handleNextPage_ = function(e){
  this.current_page_ += 1;
  this.render_();
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

    this.render_();
  }
};

/**
 * @private
 */
bitex.ui.DataGrid.prototype.render_ = function() {

  goog.dom.setTextContent( this.element_start_counter_, this.current_page_ * this.limit_ + 1  );
  goog.dom.setTextContent( this.element_end_counter_, this.current_page_ * this.limit_ + this.limit_  );


  var options = {
    'Page' : this.current_page_,
    'Limit': this.limit_
  };
  var cols = [];
  goog.array.forEach( this.columns_, function(column) {
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

  // request data
  this.dispatchEvent( new bitex.ui.DataGridEvent(bitex.ui.DataGrid.EventType.REQUEST_DATA, options ) );


  goog.dom.removeChildren(this.table_data_body_el_);
  goog.dom.appendChild(this.table_data_body_el_,this.loading_data_ );

};


/** @inheritDoc */
bitex.ui.DataGrid.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var handler = this.getHandler();
  handler.listen(this.element_prev_button_, goog.events.EventType.CLICK, this.handlePreviousPage_);
  handler.listen(this.element_next_button_, goog.events.EventType.CLICK, this.handleNextPage_);

  //TODO: Listen for click on all sortable columns
  handler.listen(this.tr_columns_el_, goog.events.EventType.CLICK, this.handleColumnClick_);



  this.render_();
};

bitex.ui.DataGrid.prototype.reload = function() {
  this.render_();
};

/**
 *
 * @param {Element} row_element
 * @param {string} column
 * @param {*} value
 * @return {Element}
 */
bitex.ui.DataGrid.prototype.setColumnValue = function(row_element, column, value) {
  var result_set_col_index = {};
  goog.array.forEach( this.columns_, function(this_col, index_row_set) {
    result_set_col_index[this_col['property']] = index_row_set;
  });
  var index = result_set_col_index[column];
  if (!goog.isDefAndNotNull(index)) {
    return undefined;
  }

  var td_element = goog.dom.getChildren(row_element)[ index ];

  var currentValue = goog.dom.getTextContent(td_element);

  var formatter = this.columns_[index]['formatter'] || function(){return '' + value };
  var new_value = formatter(value);

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
 * @param {Array.<Array.<*> >} resultSet
 * @param {Array.<string >} columns
 * @return {Array.<Element>}
 */
bitex.ui.DataGrid.prototype.resultSetToElements = function(resultSet, columns) {
  var elements = [];

  var result_set_col_index = {};
  goog.array.forEach( this.columns_, function(this_col, index_row_set) {
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
        row_set_obj[this.columns_[index]['property'] ] = value;
      }
    }, this);

    var tr = goog.dom.createDom( 'tr', this.row_class_fn_(row_set_obj) );
    var td_elements = {};

    goog.array.forEach( row_set, function(value, result_set_index) {
      var index = result_set_col_index[result_set_index];

      if (goog.isDefAndNotNull( index ) ) {
        var formatter = this.columns_[index]['formatter'] || function(){return '' + value };
        var classes = this.columns_[index]['classes'] || goog.nullFunction;

        var td = goog.dom.createDom( 'td', classes(value), formatter(value) );
        td_elements[this.columns_[ index]['property'] ]  = td;
      } else {

      }
    }, this);

    goog.array.forEach( this.columns_, function(col) {
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


/*
<div style="height: 420px;width:100%;margin-bottom:20px;">
  <table class="table table-bordered datagrid datagrid-stretch-header">
    <thead>
      <tr>
        <th colspan="4">
          <span class="datagrid-header-title">Geographic Data Sample</span>

          <div class="datagrid-header-left">
            <div class="input-append search datagrid-search">
              <input type="text" class="input-medium" placeholder="Search">
              <button class="btn"><i class="icon-search"></i></button>
            </div>
          </div>
          <div class="datagrid-header-right">
            <div class="select filter" data-resize="auto">
              <button data-toggle="dropdown" class="btn dropdown-toggle">
                <span class="dropdown-label" style="width: 111px;">All</span>
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li data-value="all"><a href="#">All</a></li>
                <li data-value="lt5m"><a href="#">Population &lt; 5M</a></li>
                <li data-value="gte5m"><a href="#">Population &gt;= 5M</a></li>
              </ul>
            </div>
          </div>
        </th>
      </tr>
      <tr>
        <th data-property="toponymName" class="sortable" style="width: 230px;">Name</th>
        <th data-property="countrycode" class="sortable" style="width: 172px;">Country</th>
        <th data-property="population" class="sortable" style="width: 230px;">
          Population
          <i class="icon-chevron-down datagrid-sort"></i>
        </th>
        <th data-property="fcodeName" class="sortable">Type</th>
      </tr>
    </thead>
  </table>
  <div class="datagrid-stretch-wrapper" style="height: 320px;">
    <table id="MyGrid" class="table table-bordered datagrid">
      <tbody>
        <tr>
          <td style="width: 230px;">Mexico City</td>
          <td style="width: 172px;">MX</td>
          <td style="width: 230px;">12294193</td>
          <td>capital of a political entity</td>
        </tr>
      </tbody>
    </table>
  </div>
  <table class="table table-bordered datagrid datagrid-stretch-footer"><tfoot>
    <tr>
      <th colspan="4">
        <div class="datagrid-footer-left" style="visibility: visible;">
          <div class="grid-controls">
            <span>
              <span class="grid-start">1</span> -
              <span class="grid-end">10</span> of
              <span class="grid-count">146 items</span>
            </span>
            <div class="select grid-pagesize" data-resize="auto">
              <button data-toggle="dropdown" class="btn dropdown-toggle">
                <span class="dropdown-label">10</span>
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li data-value="5"><a href="#">5</a></li>
                <li data-value="10"><a href="#">10</a></li>
                <li data-value="20"><a href="#">20</a></li>
                <li data-value="50"><a href="#">50</a></li>
                <li data-value="100"><a href="#">100</a></li>
              </ul>
            </div>
            <span>Per Page</span>
          </div>
        </div>
        <div class="datagrid-footer-right" style="visibility: visible;">
          <div class="grid-pager">
            <button type="button" class="btn grid-prevpage" disabled="disabled"><i class="icon-chevron-left"></i></button>
            <span>Page</span>

            <div class="input-append dropdown combobox">
              <input class="span1" type="text">
                <button class="btn" data-toggle="dropdown"><i class="caret"></i></button>
                <ul class="dropdown-menu"><li><a>1</a></li><li><a>2</a></li><li><a>3</a></li><li><a>4</a></li><li><a>5</a></li><li><a>6</a></li><li><a>7</a></li><li><a>8</a></li><li><a>9</a></li><li><a>10</a></li><li><a>11</a></li><li><a>12</a></li><li><a>13</a></li><li><a>14</a></li><li><a>15</a></li></ul>
              </div>
              <span>of <span class="grid-pages">15</span></span>
              <button type="button" class="btn grid-nextpage"><i class="icon-chevron-right"></i></button>
            </div>
          </div>
        </th>
      </tr>
    </tfoot>
  </table>
</div>
*/


