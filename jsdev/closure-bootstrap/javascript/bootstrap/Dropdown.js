goog.provide('bootstrap.Dropdown');

goog.require('goog.events');

bootstrap.Dropdown.closeAll = function(){
  // closes all dropdown buttons that are open
  var dropdown_elements = goog.dom.getElementsByClass('dropdown-toggle', document.body) ;
  goog.array.forEach(dropdown_elements, function(dropdown_element) {
    var dropdown_element_parent = goog.dom.getParentElement(dropdown_element);
    goog.dom.classes.remove(dropdown_element_parent,'open');
  });
};

bootstrap.Dropdown.install = function() {
  goog.events.listen(document.body, goog.events.EventType.CLICK , function(e) {
    var element = e.target;

    var is_dropdown_toogle = false;

    if (goog.dom.classes.has(element, 'dropdown-toggle')) {
      is_dropdown_toogle = true;
    } else {
      element = goog.dom.getAncestorByClass(element, 'dropdown-toggle');

      if (goog.isDefAndNotNull(element)) {
        is_dropdown_toogle = true;
      }
    }

    if (!is_dropdown_toogle) {
      bootstrap.Dropdown.closeAll();
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    var dropdown_element_parent = goog.dom.getParentElement(element);
    if (goog.dom.classes.has(dropdown_element_parent, 'open')) {
      bootstrap.Dropdown.closeAll();
      return;
    }

    bootstrap.Dropdown.closeAll();
    goog.dom.classes.add(dropdown_element_parent, 'open');
  });


  goog.events.listen(document.body, goog.events.EventType.CLICK , function(e) {
    var element = e.target;
    var data_value = null;
    var data_caption = null;

    if (element.tagName  === goog.dom.TagName.A ) {
      data_caption = goog.dom.getTextContent(element);
      element = goog.dom.getParentElement(element);
    }
    if (element.tagName  === goog.dom.TagName.LI ) {
      data_value = element.getAttribute('data-value');
      data_caption = goog.dom.getTextContent(goog.dom.getFirstElementChild(element));
    }

    if (!goog.isDefAndNotNull( data_value) ) {
      return;
    }

    element = goog.dom.getParentElement(element);
    if (element.tagName  !== goog.dom.TagName.UL ) {
      return;
    }
    if (!goog.dom.classes.has(element, 'dropdown-menu')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    console.log('click on:  ' + data_caption + ' [' + data_value + ']' );
    var label_element = goog.dom.getElementByClass('dropdown-label',goog.dom.getParentElement(element) );
    if (goog.isDefAndNotNull(label_element)) {
      goog.dom.setTextContent(label_element, data_caption);
    }
    bootstrap.Dropdown.closeAll();
  });
};