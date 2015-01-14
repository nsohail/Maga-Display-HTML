var clientId = '727304281402-2r6jn1l2jutllr07nc5ngba9omfqjand.apps.googleusercontent.com';

var apiKey = 'AIzaSyDk7clYywa4fx8t6lYOs4C20GfxK6MAQEE';

var scopes = 'https://www.googleapis.com/auth/calendar';



function handleClientLoad() {
  // Step 2: Reference the API key
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {    //if you are authorized with no errors, make the call
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {  //if you are not authorized...
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  // Step 3: get authorization to use private data
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  // Step 4: Load the Google calendar API
  gapi.client.load('calendar', 'v3').then(function() {
    var currentDate = new Date();
    // Step 5: Assemble the API request
    var start_date = new Date();
    var request = gapi.client.calendar.events.list({
      'calendarId': 'magadesign.com_3337343339303832393534@resource.calendar.google.com',
      'orderBy': 'startTime',
      'singleEvents': true,
      "timeMin": start_date.toISOString()
    });

    // Step 6: Execute the API request
    request.then(function(callbackResponse) {

      var entries = callbackResponse.result.items; //returns an array entries

      //if there are no entries
      if (entries === 0) {
        alert ("There are no events");
      }


      //for the next meeting section
      var nextMeeting = entries[0];
      //console.log(nextMeeting);
      var nextMeetingTimeStart = nextMeeting.start;
      var nextMeetingTimeEnd = nextMeeting.end;
      var nextMeetingTitle = nextMeeting.summary;
      var nextMeetingLocation = nextMeeting.location;

      //console.log("This is the next meeting");
      for (var x in nextMeetingTimeStart && nextMeetingTimeEnd) {
        var nextMeetingStart = nextMeetingTimeStart[x];
        var nextMeetingEnd = nextMeetingTimeEnd[x];
        var nextMeetingStartFormat = new Date(nextMeetingStart).toString('hh:mm tt');
        var nextMeetingEndFormat = new Date(nextMeetingEnd).toString('hh:mm tt');
        $('.next-meetings-section').find('.next-meeting-time-start').html(nextMeetingStartFormat+'-');
        $('.next-meetings-section').find('.next-meeting-time-end').html(nextMeetingEndFormat);
      }

      $('.next-meetings-section').find('.next-meeting-title').html(nextMeetingTitle);
      $('.next-meetings-section').find('.next-meeting-location').html(nextMeetingLocation);
    
      

      //for upcoming meetings
      //console.log("These are the upcoming meetings");
      for (var i = 1; i < 3; i++) {
        var upcomingItems = entries[i];
        var upcomingTimeStart = upcomingItems.start;
        var upcomingTimeEnd = upcomingItems.end;
        var upcomingTitle = upcomingItems.summary;
        var upcomingLocation = upcomingItems.location;
        
        for(x in upcomingTimeStart && upcomingTimeEnd){
          var upcomingStart = upcomingTimeStart[x];
          var upcomingEnd = upcomingTimeEnd[x];
          var upcomingStartFormat = new Date(upcomingStart).toString('hh:mm tt');
          var upcomingEndFormat = new Date(upcomingEnd).toString('hh:mm tt');
          
          $('.upcoming-meetings-section').append('<div class="meeting-info upcoming-meeting-time-start">'+upcomingStartFormat+'-</div>');
          $('.upcoming-meetings-section').append('<div class="meeting-info upcoming-meeting-time-end">'+upcomingEndFormat+'</div>');
        }

          $('.upcoming-meetings-section').append('<div class="meeting-info upcoming-meeting-title">'+upcomingTitle+'</div>');
          $('.upcoming-meetings-section').append('<div class="meeting-info upcoming-meeting-location">'+upcomingLocation+'</div>');
      }
       

    }, function(errorReason) {
      console.log('Error: ' + errorReason.result.error.message);
    });
  });

  window.setTimeout (function(){
    makeApiCall();
  }, 10*1000);

}


