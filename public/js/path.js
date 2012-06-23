$(document).ready(function(e) {

	// initialize start date picker
	var $start = $('input[type=date][name=start]');
	$start.datepicker({ 'onClose': onClose }).datepicker('setDate', new Date($start.val()));

	var $end = $('input[type=date][name=end]');
	$end.datepicker({ 'onClose': onClose }).datepicker('setDate', new Date($end.val()));

	function onClose(date, field) {
		var date = new Date(date);
		$(field).val(date);
	}
});