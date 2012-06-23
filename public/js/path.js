$(document).ready(function(e) {

	// initialize start date picker
	var $start = $('input[type=date][name=start]');
	$start.datepicker().datepicker('setDate', new Date($start.val()));

	var $end = $('input[type=date][name=end]');
	$end.datepicker().datepicker('setDate', new Date($end.val()));
});