//Step 1: set these items
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
  console.log(authResult);
  if (authResult && !authResult.error) {    //if you are authorized with no errors, make the call
    console.log("You are authorized");
    $('#authorize-button-logout').show();
    $('#authorize-button').hide();
    makeApiCall();
  } else {  //if you are not authorized...
    console.log("You NOT authorized");
    $('#authorize-button').show();
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  // Step 3: get authorization to use private data
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false, approvalprompt: 'force'}, handleAuthResult);
  return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  console.log("running API call");
  // Step 4: Load the Google calendar API
  gapi.client.load('calendar', 'v3').then(function() {

    var currentDate = new Date();
    var start_date = new Date();

    // Step 5: Assemble the API request
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


      //get meeting info
      var nextMeeting = entries[0];
      var nextMeetingTimeStart = nextMeeting.start;
      var nextMeetingTimeEnd = nextMeeting.end;
      var nextMeetingTitle = nextMeeting.summary;
      var nextMeetingLocation = nextMeeting.location;

      var secondMeeting = entries[1];
      var secondMeetingTimeStart = secondMeeting.start;
      var secondMeetingTimeEnd = secondMeeting.end;
      var secondMeetingTitle = secondMeeting.summary;
      var secondMeetingLocation = secondMeeting.location;


      //formatting info
      var nextMeetingStart = nextMeetingTimeStart.dateTime;
      var nextMeetingEnd = nextMeetingTimeEnd.dateTime;

      var secondMeetingStart = secondMeetingTimeStart.dateTime;
      var secondMeetingEnd = secondMeetingTimeEnd.dateTime;

      var nextMeetingStartFormat = new Date(nextMeetingStart).toString('hh:mm tt');
      var nextMeetingEndFormat = new Date(nextMeetingEnd).toString('hh:mm tt');

      var secondMeetingStartFormat = new Date(secondMeetingStart).toString('hh:mm tt');
      var secondMeetingEndFormat = new Date(secondMeetingEnd).toString('hh:mm tt');

      $('.next-meetings-section').find('.next-meeting-time-start').text(nextMeetingStartFormat+'-');
      $('.next-meetings-section').find('.next-meeting-time-end').text(nextMeetingEndFormat);

      $('.upcoming-meetings-section').find('.second-meeting-time-start').text(secondMeetingStartFormat+'-');
      $('.upcoming-meetings-section').find('.second-meeting-time-end').text(secondMeetingEndFormat);

      $('.next-meetings-section').find('.next-meeting-title').text(nextMeetingTitle);
      $('.next-meetings-section').find('.next-meeting-location').text(nextMeetingLocation);

      $('.upcoming-meetings-section').find('.second-meeting-title').text(secondMeetingTitle);
      $('.upcoming-meetings-section').find('.second-meeting-location').text(secondMeetingLocation);


    }, function(errorReason) {
        location.reload();
        console.log('There was a HUGE Error: ' + errorReason.result.error.message);
        handleAuthResult();
      });

  }); //client load ends here

  window.setTimeout (function(){
    console.log("this is the timeout");
    makeApiCall();
  }, 5*60*1000); //5 minutes

  
}//makeApiCall ends here

