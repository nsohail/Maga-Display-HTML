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

      if (entries === 0) {
        alert ("There are no events");
      }

      var nextMeeting = entries[1];
      var nextMeetingTime = nextMeeting.start;
      var nextMeetingTitle = nextMeeting.summary;
      var nextMeetingLocation = nextMeeting.location;
      console.log("This is the next meeting");
      for (var x in nextMeetingTime) {
        console.log(nextMeetingTime[x]);
      }
      console.log(nextMeetingTitle);
      console.log(nextMeetingLocation);
    
      

      //show other results
      console.log("These are the upcoming meetings");
      for (var i = 1; i < 3; i++) {
        var upcomingItems = entries[i];
        var upcomingTime = upcomingItems.start;
        var upcomingTitle = upcomingItems.summary;
        var upcomingLocation = upcomingItems.location;
        
        for(x in upcomingTime){
          console.log(upcomingTime[x]);
        }
        console.log(upcomingTitle);
        console.log(upcomingLocation);
      }
       

    }, function(errorReason) {
      console.log('Error: ' + errorReason.result.error.message);
    });
  });

}


