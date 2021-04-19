/**
 *	CESIUM TEMPLATE
 *	By Xemah | https://xemah.com
 *
**/

if (page !== '') {
	
	if (page === 'status') {

		$(function() {

			$('*[id="server"]').each(function() {

				let serverID = $(this).data("id");
				let serverBungee = $(this).data("bungee");
				let serverPlayerList = $(this).data("players");
				let serverElem = $(this);

				$.getJSON(URLBuild('queries/server/', 'id=' + serverID), (data) => {

					var serverPlayers = '';
					var serverPlayersCount = '';

					if (data.status_value === 1) {

						serverElem.attr('data-status', 'online');
						serverPlayersCount += data.player_count + ' / ' + data.player_count_max;

						if (serverBungee === 1) {
							serverPlayers += bungeeInstance;
						} else {
							if (serverPlayerList === 1) {
								if (data.player_list.length > 0) {
									serverPlayers += '<div class="players-list">';
									for (var i = 0; i < data.player_list.length; i++) {
										serverPlayers += '<div class="list-item"><a href="' + URLBuild('profile/' + data.player_list[i].name) + '" data-toggle="tooltip" title="' + data.player_list[i].name + '"><img src="' + avatarSource.replace("{x}", data.player_list[i].id).replace("{y}", 64) + '" alt="' + data.player_list[i].name + '"></a></div>';
									}
									if (data.player_list.length < data.player_count) {
										serverPlayers += '<div class="list-item list-item-more">+' + (data.player_count - data.player_list.length) + '</div>';
									}
									serverPlayers += '</div>';
								} else {
									serverPlayers += noPlayersOnline;
								}
							}
						}

					} else {
						serverElem.attr('data-status', 'offline')
						serverPlayers += offline;
						serverPlayersCount += noPlayersOnline;
					}
					
					serverElem.find('.server-players-count').html(serverPlayersCount);
					serverElem.find('.server-players').html(serverPlayers);
					$('[data-toggle="tooltip"]').tooltip();

				});
			});
		});
		
	} else if (page === 'profile') {

		var imagePicker = $('body').find('#imagePicker');
		if (imagePicker.length)
			imagePicker.imagepicker();
		
	} else if (page === 'cc_messaging') {

		$('#InputTo').tokenfield({
		    autocomplete: {
			    source: allUsers,
				delay: 100,
				minLength: 3
			},
			showAutocompleteOnFocus: true
		});
	}
	
	else if (route.indexOf("/forum/topic/") != -1) {

		$(function() {
			var hash = window.location.hash.substring(1);
			$('#' + hash).effect("highlight", {}, 2000);
	        (() => {
				if (document.location.hash) {
			        setTimeout(function() {
					    window.scrollTo(window.scrollX, window.scrollY - 110);
				    }, 10);
				}
			})();
		});
	}
	
	else if (page == 'members') {
		
		document.addEventListener('DOMContentLoaded', function() {
			$('.page-item.previous a').innerHTML = '<';
			$('.page-item.next a').innerHTML = '>';
		}, false);

	}
}