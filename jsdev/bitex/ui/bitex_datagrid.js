goog.provide('bitex.ui.DataGrid');
goog.provide('bitex.ui.DataGrid.EventType');
goog.provide('bitex.ui.DataGridEvent');

goog.require('goog.ui.Component');

goog.require('goog.array');
goog.require('goog.style');

/**
 * @param {Array.<Object>} columns
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
bitex.ui.DataGrid = function (columns, opt_domHelper) {
  goog.base(this, opt_domHelper);

  this.columns_ = columns;
  this.current_page_ = 0;
  this.limit_ = 100;

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
bitex.ui.DataGrid.prototype.options_;



/**
 * Events fired by Grid
 * @enum {string}
 */
bitex.ui.DataGrid.EventType = {
  /** dispatched after set */
  REQUEST_DATA: 'request_data'
};

/**
 * @type {!Element}
 * @private
 */
bitex.ui.DataGrid.prototype.tr_columns_el_;


/**
 * @type {!Element}
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
  this.tr_columns_el_ = goog.dom.createDom('tr');
  goog.array.forEach(this.columns_, function(column){
    var th_column_properties = {
      'data-property': column['property']
    };
    if ( column['sortable']) {
      th_column_properties['class'] = 'sortable';
    }

    var th_colum = goog.dom.createDom( 'th', th_column_properties, column['label'] );

    goog.dom.appendChild(this.tr_columns_el_, th_colum)
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

  this.render_();
};

bitex.ui.DataGrid.prototype.reload = function() {
  this.render_();
};

/**
 *
 * @param {Array.<Array.<*> >} resultSet
 */
bitex.ui.DataGrid.prototype.setResultSet = function(resultSet) {
  goog.dom.removeChildren(this.table_data_body_el_);

  var first_row = null;


  goog.array.forEach( resultSet, function(row_set) {
    var tr = goog.dom.createDom( 'tr');
    goog.array.forEach( row_set, function(col, index) {
      var formatter = this.columns_[index]['formatter'];

      var td = goog.dom.createDom( 'td', undefined, formatter(col) );
      goog.dom.appendChild( tr, td );
    }, this);
    goog.dom.appendChild(this.table_data_body_el_,tr );

    if (!goog.isDefAndNotNull(first_row)) {
      first_row = tr ;
    }

  }, this );

  // adjust sizes
  if ( goog.isDefAndNotNull(first_row) ){
    var header_col =  goog.dom.getFirstElementChild(this.tr_columns_el_);
    var col = goog.dom.getFirstElementChild(first_row);

    while( goog.isDefAndNotNull(col) ) {
      var el_size =  goog.style.getSize( col) ;
      goog.style.setWidth( header_col, el_size.width );

      el_size =  goog.style.getSize( header_col) ;
      goog.style.setWidth( col, el_size.width);


      header_col = goog.dom.getNextElementSibling(header_col);
      col = goog.dom.getNextElementSibling(col);
    }
  }
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
        <th data-property="population" class="sortable" style="width: 230px;">Population</th>
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


