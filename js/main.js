$(document).ready(function () {

	getWeatherLocation();
	formatTime();
	formatDate();

});

var currentLocation;

//time area

function formatTime(){
	var date = new Date();
	var hours = date.getHours();
	//console.log("this is the hour time" + hours);
	var minutes = date.getMinutes();
	//console.log("this is the minutes time" + minutes);

	var ampm = hours >= 12 ? 'pm' : 'am';
	minutes = minutes < 10 ? '0'+minutes : minutes;
	hours = hours % 12;
	hours = hours ? hours : 12; //explain this
	var displayTime = hours + ':' + minutes + ' ' + ampm;
	//console.log(displayTime);
	$('.row1').find($('.current-time')).text(displayTime);

	window.setTimeout (function(){
		formatTime();
	}, 10*1000);
}



//date area

function formatDate(){
	var currentDate = new Date();

	var date = new Date();
	var weekday = new Array();
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	var month = new Array();
	month[0] = "Jan";
	month[1] = "Feb";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "Aug";
	month[8] = "Sept";
	month[9] = "Oct";
	month[10] = "Nov";
	month[11] = "Dec";

	var displayDay = weekday[date.getDay()];
	var displayMonth = month[date.getMonth()];
	var displayDate = currentDate.getDate();

	var displayWholeDate = (displayDay + ', ' + displayMonth + ' ' + displayDate);
	$('.row1').find($('.current-day')).text(displayWholeDate);

	window.setTimeout(function(){
		formatDate();
	}, 1*60*1000);
}




//weather area

function getWeatherLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(gotLocation,initialize);
	}
	else{
		alert("Device does not support geolocation");
		initialize();
	}
}

//get the location coords
function gotLocation(pos){
	var crd = pos.coords;
	currentLocation = loadWeather(crd.latitude+','+crd.longitude);
	initialize();
}

function initialize(){
	if(!currentLocation){
		loadWeather("Washington, DC");
		//console.log("Loaded DC weather");
	}

	else{
		loadWeather(currentLocation);
		//console.log("Loaded current weather");
	}
}

function loadWeather(location){
	$.simpleWeather({
		location: location,
		woeid: '',
		unit: 'f',
		success: function(weather) {
			//console.log(weather);
			var html = weather.temp+'&deg;'+weather.units.temp;
			$(".current-weather").html(html);
		},
		error: function(error) {
		  $(".current-weather").html('<p>'+error+'</p>');
		}
	});
}
	
	

	