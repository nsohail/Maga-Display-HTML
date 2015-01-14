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
    // Step 5: Assemble the API request
    var request = gapi.client.calendar.events.list({
      'calendarId': 'magadesign.com_3337343339303832393534@resource.calendar.google.com',
      'ordeBy': 'startTime'
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
        //console.log(nextMeetingTimeStart[x]);
        //console.log(nextMeetingTimeEnd[x]);
        $('.next-meetings-section').find('.next-meeting-time-start').html(nextMeetingTimeStart[x]);
        $('.next-meetings-section').find('.next-meeting-time-end').html(nextMeetingTimeEnd[x]);
      }
      //console.log(nextMeetingTitle);
      $('.next-meetings-section').find('.next-meeting-title').html(nextMeetingTitle);
      //console.log(nextMeetingLocation);
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
          console.log(upcomingItems);
          var upcomingStart = upcomingTimeStart[x];
          var upcomingEnd = upcomingTimeEnd[x];
          var upcomingStartFormat = new Date(Date.parse(upcomingStart));
          var upcomingEndFormat = new Date(upcomingEnd).toShortDateString();

          console.log(upcomingStartFormat);
          console.log(upcomingEndFormat);
          
          //console.log(upcomingTimeStart[x]);
          $('.upcoming-meetings-section').append('<div class="meeting-info next-meeting-time-start">'+upcomingStartFormat+'</div>');
          //console.log(upcomingTimeEnd[x]);
          $('.upcoming-meetings-section').append('<div class="meeting-info next-meeting-time-end">'+upcomingEndFormat+'</div>');
        }
          //console.log(upcomingTitle);
          $('.upcoming-meetings-section').append('<div class="meeting-info next-meeting-title">'+upcomingTitle+'</div>');
          //console.log(upcomingLocation);
          $('.upcoming-meetings-section').append('<div class="meeting-info next-meeting-location">'+upcomingLocation+'</div>');
      }
       

    }, function(errorReason) {
      console.log('Error: ' + errorReason.result.error.message);
    });
  });

}


