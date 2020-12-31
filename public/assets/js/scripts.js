jQuery.fn.toggleAttr = function(attr) {
	return this.each(function() {
		var $this = $(this);
		$this.attr(attr) ? $this.removeAttr(attr) : $this.attr(attr, attr);
	});
};
jQuery.fn.toggleProp = function(prop) {
	return this.each(function() {
		var $this = $(this);
		$this.prop(prop) ? $this.removeProp(prop) : $this.prop(prop, prop);
	});
};
jQuery.fn.hasAttr = function(attr) {
	var attr = $(this).attr(attr);
	if (typeof attr !== typeof undefined && attr !== false) {
		return true;
	} else {
		return false;
	}
};
jQuery.fn.hasProp = function(prop) {
	var prop = $(this).prop(prop);
	if (typeof prop !== typeof undefined && prop !== false) {
		return true;
	} else {
		return false;
	}
};