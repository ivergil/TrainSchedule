
var firebaseConfig = {
    apiKey: "AIzaSyCn9Br3Ir8syHhDHqewiuRZpQ1LK5BOwRk",
    authDomain: "trainschedule-2dc5b.firebaseapp.com",
    databaseURL: "https://trainschedule-2dc5b.firebaseio.com",
    projectId: "trainschedule-2dc5b",
    storageBucket: "",
    messagingSenderId: "980227169630",
    appId: "1:980227169630:web:d744b5e72efb52ac"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var dataRef = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var firstTime = "";
var trainFrequency = 0;

dataRef.ref().orderByChild('name').on("child_added", function (data) {
    clearInput();
    $("#train-table").append(`<tr>
      <td scope="row" class="text-center">${data.val().trainName}</td>
      <td class="text-center">${data.val().destination}</td>
      <td class="text-center">${data.val().firstTime}</td>
      <td class="text-center">${data.val().trainFrequency}</td>
      <td class="text-center">${data.val().dateAdded}</td>
    </tr>`)
});

// Capture Button Click
$("#add-train").on("click", function (event) {
    event.preventDefault();

    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#time-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();

    // Code for the push
    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        trainFrequency: trainFrequency,
        dateAdded: moment().format('MMMM Do YYYY, HH:mm')

        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});
function clearInput() {
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
}
// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
// dataRef.ref().on("child_added", function (childSnapshot) {

//     // Log everything that's coming out of snapshot
//     // console.log(childSnapshot.val().trainName);
//     // console.log(childSnapshot.val().destination);
//     // console.log(childSnapshot.val().firstTime);
//     // console.log(childSnapshot.val().trainFrequency);
//     // console.log(childSnapshot.val().joinDate);

//     // full list of items to the well
//     $("#full-member-list").append("<div class='well'><span class='member-name'> " +
//         childSnapshot.val().name +
//         " </span><span class='member-email'> " + childSnapshot.val().email +
//         " </span><span class='member-age'> " + childSnapshot.val().age +
//         " </span><span class='member-comment'> " + childSnapshot.val().comment +
//         " </span></div>");

//     // Handle the errors
// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });

// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);
// });