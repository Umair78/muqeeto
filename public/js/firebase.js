// [START get_messaging_object]
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BPE3IJooR-na9Ig-RHoU8M1IHnpG5sNI7qK4Zop1Bfim8RTInwRp9y5eawoai_c6GnA5m5dy-qak7OPEfZM3bJo");
// [END get_messaging_object]
// IDs of divs that display Instance ID token UI or request permission UI.
const tokenDivId = 'token_div';
const permissionDivId = 'permission_div';
// [START refresh_token]
// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
  messaging.getToken()
  .then(function(refreshedToken) {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    setTokenSentToServer(false);
    // Send Instance ID token to app server.
    sendTokenToServer(refreshedToken);
    // [START_EXCLUDE]
    // Display new Instance ID token and clear UI of all previous messages.
    resetUI();
    // [END_EXCLUDE]
  })
  .catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});
// [END refresh_token]
// [START receive_message]
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a sevice worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
  console.log("Message received. ", payload);
  const notificationInfo = {
    body:payload.notification.body
  };
  if(Notification.permission==="granted"){
    var notification=new Notification(payload.notification.title,notificationInfo);
    // notification.
  }
  // [START_EXCLUDE]
  // Update the UI to include the received message.
  // appendMessage(payload);
  // [END_EXCLUDE]
});
// [END receive_message]
function resetUI() {
  clearMessages();
  showToken('loading...');
  // [START get_token]
  // Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging.getToken()
  .then(function(currentToken) {
    if (currentToken) {
      sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      requestPermission()
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  })
  .catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });
}
// [END get_token]
function showToken(currentToken) {
  // Show token in console and UI.
  console.log("showToken: ", currentToken)
  // var tokenElement = document.querySelector('#token');
  // tokenElement.textContent = currentToken;
}
// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...');
    // TODO(developer): Send the current token to your server.
    $.ajax({
      url: 'setFCMToken',
      type: 'POST',
      data: {fcm_token: currentToken, _token: csrf_token},
    })
    .done(function(savedToken) {
      // setTokenSentToServer(true);
      console.clear();
      console.log("success token : ", savedToken);
    })
    .fail(function(error) {
      console.log("error token : ", error);
    })
    .always(function() {
      console.log("complete");
    });
    
    // setTokenSentToServer(true);
  } else {
    console.log('Token already sent to server so won\'t send it again ' +
        'unless it changes');
  }
}
function isTokenSentToServer() {
  if (window.localStorage.getItem('sentToServer') == 1) {
        return true;
  }
  return false;
}
function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}
function showHideDiv(divId, show) {
  // const div = document.querySelector('#' + divId);
  if (show) {
    console.log("should show div:", divId)
    // div.style = "display: visible";
  } else {
    console.log("should hide div:", divId)
    // div.style = "display: none";
  }
}
function requestPermission() {
  console.log('Requesting permission...');
  // [START request_permission]
  messaging.requestPermission()
  .then(function() {
    console.log('Notification permission granted.');
    location.reload();
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // [START_EXCLUDE]
    // In many cases once an app has been granted notification permission, it
    // should update its UI reflecting this.
    resetUI();
    // [END_EXCLUDE]
  })
  .catch(function(err) {
    console.log('Unable to get permission to notify.', err);
  });
  // [END request_permission]
}
function deleteToken() {
  // Delete Instance ID token.
  // [START delete_token]
  messaging.getToken()
  .then(function(currentToken) {
    messaging.deleteToken(currentToken)
    .then(function() {
      console.log('Token deleted.');
      setTokenSentToServer(false);
      // [START_EXCLUDE]
      // Once token is deleted update UI.
      resetUI();
      // [END_EXCLUDE]
    })
    .catch(function(err) {
      console.log('Unable to delete token. ', err);
    });
    // [END delete_token]
  })
  .catch(function(err) {
    console.log('Error retrieving Instance ID token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
  });
}
// Add a message to the messages element.
function appendMessage(payload) {
  console.log("appendMessage", payload)
  // const messagesElement = document.querySelector('#messages');
  // const dataHeaderELement = document.createElement('h5');
  // const dataElement = document.createElement('pre');
  // dataElement.style = 'overflow-x:hidden;'
  // dataHeaderELement.textContent = 'Received message:';
  // dataElement.textContent = JSON.stringify(payload, null, 2);
  // messagesElement.appendChild(dataHeaderELement);
  // messagesElement.appendChild(dataElement);
}
// Clear the messages element of all children.
function clearMessages() {
  console.log("clearMessages.")
  // const messagesElement = document.querySelector('#messages');
  // while (messagesElement.hasChildNodes()) {
  //   messagesElement.removeChild(messagesElement.lastChild);
  // }
}
function updateUIForPushEnabled(currentToken) {
  showHideDiv(tokenDivId, true);
  showHideDiv(permissionDivId, false);
  showToken(currentToken);
}
function updateUIForPushPermissionRequired() {
  showHideDiv(tokenDivId, false);
  showHideDiv(permissionDivId, true);
}
resetUI();