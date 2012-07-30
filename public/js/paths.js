// some dumb code to test api
// TODO: choose client side framework with proper ajax and templating support

$(document).ready(function() {

	// script to create path
	$('#path').keypress(function(e) {
		if(e.which == 13) {
			var $input = $(this)
			var title = $input.val();
			$input.val('');

			// make sure title is not empty then call api
			if(title) {
				var data = { "title": title };
				$.ajax({
					'type': 'POST',
					'url': '/paths',
					'data': data,
					'error': error,
					'success': function(data) {
						var $added  = $('<li></li>');
						$added.attr('pid', data._id);
						$added.append('<a href="/paths/' + data._id + '">' + data.title + '</a>');
						$added.append('<a class="delete">- del</a>');

						$('#list').append($added);
					}
				});
			}
		}
	});

	// script to delete path

	$('#list').on('click', '.delete', function(e) {
		var $a = $(this);
		var $li = $a.parents('li');
		var pid = $li.attr('pid');

		if(pid) {
			var url = "/paths/" + pid;
			$.ajax({
				'type': 'DELETE',
				'url': url,
				'error': error,
				'success': function(data) { $li.remove(); }
			});
		}
	});
});

function error(jqXHR, textStatus, errorThrown) {
	console.log(jqXHR);
	alert('status: ' + textStatus + ', error: ' + errorThrown);
}