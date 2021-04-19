/**
 *	CESIUM TEMPLATE
 *	By Xemah | https://xemah.com
 *
**/

// Toaster options
toastr.options = {
	progressBar: true,
	closeButton: true,
	timeOut: 2500,
	extendedTimeOut: 5000,
	positionClass: 'toast-bottom-left'
};

// URL Build Function
function URLBuild(path, param) {
	if (param) {
		return siteURL + path + (siteURL.includes('?') ? '&' : '?') + param;
	} else {
		return siteURL + path;
	}
}

// Redirect Function
function redirect(url) {
	window.location.href = url;
}

// Copy Text Function
function copy(element) {
	var temp = $('<input>');
	$('body').append(temp);
	temp.val($(element).text()).select();
	document.execCommand('copy');
	temp.remove();
	toastr.success(copied);
}

// Prevent redirect on #
$('a[href~="#"]').click(function(e) {
	e.preventDefault()
});

// Set Loading Time
$(function() {
	if (loadingTime) {
		$('.loading-time').html(loadingTime);
	}
});

// Tooltip, popover and dropdown initialization
$(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover({trigger: "hover"});
	$('.nav-item.dropdown').hover(function() {
		$(this).find('.dropdown-menu').stop(true, true).delay(25).fadeIn();
	}, function() {
		$(this).find('.dropdown-menu').stop(true, true).delay(25).fadeOut();
	});
});

// Fix anchor attributes
$(function() {
	['href', 'target'].forEach(function(attribute) {
		$('[' + attribute +']').each(function() {
			if ($(this).attr(attribute) == '') {
				$(this).removeAttr(attribute);
			}
		});
	});
});

// Sidebar Navigation Toggle Function
function toggleNavSidebar() {
	if ($('#nav-sidebar').hasClass('active')) {
		$('.modal-backdrop').removeClass('show');
		setTimeout(function() {
			$('.modal-backdrop').remove();
		}, 100);
		$('#nav-sidebar').removeClass('active');
		return;
	}
	$('body').append('<div class="modal-backdrop fade"></div>');
	setTimeout(function() {
		$('.modal-backdrop').addClass('show');
	}, 100);
	$('#nav-sidebar').addClass('active');
	return;
}

// Sidebar Navigation Trigger
$('#navbar-toggler').click(function() {
	toggleNavSidebar();
});

$(document).on('click', '.modal-backdrop', function() {
	toggleNavSidebar()
});

$('#nav-close').click(function() {
	toggleNavSidebar();
});

// Sticky Navigation Bar
if (typeof (stickyNavbar) !== 'undefined' && stickyNavbar == true) {
	const navbar = document.getElementById('navbar');
	const navbarOffsetTop = navbar.offsetTop;
	window.addEventListener('scroll', () => {
		if (window.pageYOffset >= navbarOffsetTop) {
			navbar.classList.add('fixed-top');
			document.body.style.paddingTop = navbar.offsetHeight + 'px';
		} else {
			navbar.classList.remove('fixed-top');
			document.body.style.paddingTop = null;
		}
	});
}

// Scroll to top
if ($('#scrollToTop')) {

	window.addEventListener('scroll', () => {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			$('#scrollToTop').css('opacity', '1');
			$('#scrollToTop').css('pointer-events', 'all');
		} else {
			$('#scrollToTop').css('opacity', '0');
			$('#scrollToTop').css('pointer-events', 'none');
		}
	});
	
	$('#scrollToTop > a').click(function() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		$(this).blur();
	});

}

// Update body class
$(function() {
	document.body.classList.add('loaded');
});

// User popover
$(function() {
	
	var cachedUsers = {};
	var timeoutId;

	 $('*[data-poload]').mouseenter(function() {
	 	var elem = this;
	 	if(!timeoutId){
			timeoutId = window.setTimeout(function() {
				timeoutId = null;
				var data = cachedUsers[$(elem).data('poload')];
				if (data) {
					$(elem).popover({
						trigger: "manual",
						html: true,
						placement: 'top',
						animation: true,
						content: data.html,
						sanitize: false,
					}).popover("show");
					$('.popover').mouseleave(function() {
						if (!$('.popover:hover').length) {
							$(this).popover('hide');
						}
					});
				}
		 	}, 200);
			 $.get($(elem).data('poload'), function(d) {
				(debugging && debugging == '1' ? console.log(d) : '');
				var data = JSON.parse(d);
				cachedUsers[$(elem).data('poload')] = data;
				var tmp = document.createElement('div');
				tmp.innerHTML = data.html;
				var img = tmp.getElementsByTagName('img')[0];
				var image = new Image();
				image.src = img.src;
			});
		}
	})
	
	.mouseleave(function() {
		 var elem = this;
		 if(timeoutId) {
			window.clearTimeout(timeoutId);
			timeoutId = null;
		 } else {
			setTimeout(function() {
				if(!$('.popover:hover').length) {
					$(elem).popover('hide');
				}
			}, 200);
		}
	});

});
