sliderInt = 1;
sliderNext = 2;

$(function() {
	$('#slider>img#1').fadeIn(500);
	startSlider();
});

function startSlider() {
	var count = $('#slider>img').size();
	
	loop = setInterval(function(){
		if (sliderNext > count) {
			sliderNext = 1;
			sliderInt = 1;
		}
		$('#slider>img').fadeOut(500);
		$('.navigation>div').removeClass('active');
		$('#slider>img#'+sliderNext).fadeIn(500);
		$('#nav'+sliderNext).addClass('active');
		sliderInt = sliderNext;
		++sliderNext; 
	}, 20000);
};

function showSlide(id) {
	stopLoop();
	var count = $('#slider>img').size();
	
	if (id > count)
		id = 1;
	else if (id < 1)
		id = count;
		
	$('#slider>img').fadeOut(500);
	$('.navigation>div').removeClass('active');
	$('#slider>img#'+id).fadeIn(500);
	$('#nav'+id).addClass('active');
	sliderInt = id;
	sliderNext += id; 

	startSlider();
};

function next() {
	showSlide(++sliderInt);
};

function prev() {
	showSlide(--sliderInt);
};

function stopLoop() {
	window.clearInterval(loop);
};

$('#slider>img').hover(function() {
	stopLoop();
	}, function() { 
	startSlider();
	});