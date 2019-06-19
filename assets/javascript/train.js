
var config = {
    apiKey: "AIzaSyCSEcLCZhDxYPqu_IbIEvjO5_8nB2lwKPA",
    authDomain: "firstfirebase-d0417.firebaseapp.com",
    databaseURL: "https://firstfirebase-d0417.firebaseio.com",
    projectId: "firstfirebase-d0417",
    storageBucket: "firstfirebase-d0417.appspot.com",
    messagingSenderId: "525467185322",
    appId: "1:525467185322:web:bd56b302eef63bc5"
};

// Initialize Firebase
firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var firstTime = 0;
var trainFrequency = 0;

// Capture Button Click
$("#add-user").on("click", function (event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#train-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();

    // Code for the push
    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        trainFrequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    // console.log(childSnapshot.val().trainName);
    // console.log(childSnapshot.val().destination);
    // console.log(childSnapshot.val().firstTime);
    // console.log(childSnapshot.val().trainFrequency);
    // console.log(childSnapshot.val().joinDate);

    // full list of items to the well
    $("#full-member-list").append("<div class='well'><span class='member-name'> " +
        childSnapshot.val().name +
        " </span><span class='member-email'> " + childSnapshot.val().email +
        " </span><span class='member-age'> " + childSnapshot.val().age +
        " </span><span class='member-comment'> " + childSnapshot.val().comment +
        " </span></div>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#email-display").text(snapshot.val().email);
    $("#age-display").text(snapshot.val().age);
    $("#comment-display").text(snapshot.val().comment);
});