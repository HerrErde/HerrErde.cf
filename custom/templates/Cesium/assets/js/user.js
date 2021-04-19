/**
 *	CESIUM TEMPLATE
 *	By Xemah | https://xemah.com
 *
**/

 if (loggedIn == 1) {

	var countPms = 0;
	var countAlerts = 0;

	function updateAlerts(data) {
		if (data.value > 0) {
			var alertsList = '';
			for (let i = 0; i < data.alerts.length; i++) {
				alertsList += '<a href="' + URLBuild('user/alerts/', 'view=' + data.alerts[i].id) + '" class="dropdown-item">' + data.alerts[i].content_short + '</a>';
			}
			$("#alerts .nav-link").addClass("inc");
			$('#alerts .dropdown-menu .dropdown-item').remove();
			$('#alerts .dropdown-menu').append(alertsList);
		} else {
			$("#alerts .nav-link").removeClass("inc");
			$('#alerts .dropdown-menu .dropdown-item').remove();
			$('#alerts .dropdown-menu').append('<a class="dropdown-item">' + noAlerts + '</a>');
		}
		countAlerts = data.value;
	}
	
	function notifyAlerts(data) {
		if (data.value > 0) {
			if (data.value == 1) {
				toastr.options.onclick = () => redirect(URLBuild('user/alerts'));
				toastr.info(newAlert1);
			} else {
				toastr.options.onclick = () => redirect(URLBuild('user/alerts'));
				toastr.info(newAlertsX.replace('{x}', data.value));
			}
			if (Notification.permission !== 'granted') {
				Notification.requestPermission();
			} else {
				if (data.value == 1) {
					var notification = new Notification(
						siteName, {body: newAlert1}
					);
				} else {
					var notification = new Notification(
						siteName, {body: newAlertsX.replace('{x}', data.value)}
					);
				}
				notification.onclick = () => window.open(URLBuild('user/alerts'));
			}
			countAlerts = data.value;
		}
	}

	function updatePMs(data) {
		if (data.value > 0) {
			var pmsList = '';
			for (let i = 0; i < data.pms.length; i++) {
				pmsList += '<a href="' + URLBuild('user/messaging/', 'view=' + data.pms[i].id) + '" class="dropdown-item">' + data.pms[i].title  + '</a>';
			}
			$("#pms .nav-link").addClass("inc");
			$('#pms .dropdown-menu .dropdown-item').remove();
			$('#pms .dropdown-menu').append(pmsList);
		} else {
			$("#pms .nav-link").removeClass("inc");
			$('#pms .dropdown-menu .dropdown-item').remove();
			$('#pms .dropdown-menu').append('<a class="dropdown-item">' + noMessages + '</a>');
		}
		countPms = data.value;
	}
	
	function notifyPMs(data) {
		if (data.value > 0) {
			if (data.value == 1) {
				toastr.options.onclick = () => redirect(URLBuild('user/messaging'));
				toastr.info(newMessage1);
			} else {
				toastr.options.onclick = () => redirect(URLBuild('user/messaging'));
				toastr.info(newMessagesX.replace('{x}', data.value));
			}
			if (Notification.permission !== 'granted') {
				Notification.requestPermission();
			} else {
				if (data.value == 1) {
					var notification = new Notification(
						siteName, {body: newMessage1}
					);
				} else {
					var notification = new Notification(
						siteName, {body: newMessagesX.replace("{x}", data.value)}
					);
				}
				notification.onclick = () => window.open(URLBuild('user/messaging'));
			}
			countPms = data.value;
		}
	}
	
	$(() => {
		
		if (Notification) {
			if (Notification.permission !== 'granted')
				Notification.requestPermission();
		}
		
		$.getJSON(URLBuild('queries/alerts'), data => updateAlerts(data));
		$.getJSON(URLBuild('queries/pms'), data => updatePMs(data));
		
		window.setInterval(() => {
			
			$.getJSON(URLBuild('queries/alerts'), data => {
				if (countAlerts < data.value) {
					notifyAlerts(data);
				}
				updateAlerts(data);
			});
			
			$.getJSON(URLBuild('queries/pms'), data => {
				if (countPms < data.value) {
					notifyPMs(data);
				}
				updatePMs(data);
			});
		}, 10000);
	});
	
} else if (cookie == 1) {
	toastr.options.onclick = () => $('.toast .toast-close-button').focus();
	toastr.options.onHidden = () => $.cookie('accept', 'accepted', { path: '/' });
	toastr.options.timeOut = 0;
	toastr.info(cookieNotice);
}