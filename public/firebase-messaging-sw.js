
importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js');

firebase.initializeApp({
	apiKey: "AIzaSyCm56XlLvWcDSWLoxX_NAotWz_48ODXPxE",
	authDomain: "quorex-6070e.firebaseapp.com",
	databaseURL: "https://quorex-6070e.firebaseio.com",
	projectId: "quorex-6070e",
	storageBucket: "quorex-6070e.appspot.com",
	messagingSenderId: "914685785685",
	appId: "1:914685785685:web:2202bacaef6cfecef446dc",
	measurementId: "G-H8D6YQLMPT"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	const notificationTitle = 'Background Message Title';
	const notificationOptions = {
		body: 'Background Message body.'
	};

	return self.registration.showNotification(notificationTitle,
		notificationOptions);
});