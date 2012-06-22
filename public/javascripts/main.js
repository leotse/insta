// some dumb code for deleting
$(document).ready(function() {

	$('.delete').click(function(e) {
		var $a = $(this);
		var $li = $a.parents('li');
		var pid = $li.attr('pid');

		if(pid) {
			var url = "/paths/" + pid;
			$.ajax(url, {
				'type': 'DELETE',
				'error': error,
				'success': function(data) { $li.remove(); }
			});
		}
	});

});

function error(jqXHR, textStatus, errorThrown) {
	alert('status: ' + textStatus + ' error: ' + errorThrown);
}