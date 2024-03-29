var config = {
    apiKey: "AIzaSyDYVNJ-Ggov5htghQ-BkNxOBcG3c6SfULU",
    authDomain: "bootcamp-example-8f83a.firebaseapp.com",
    databaseURL: "https://bootcamp-example-8f83a.firebaseio.com",
    projectId: "bootcamp-example-8f83a",
    storageBucket: "",
    messagingSenderId: "570706840985",
    appId: "1:570706840985:web:66af9a4c6d8e3d14"
};

firebase.initializeApp(config);
var database = firebase.database();

$("#add-train").on("click", function (event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    first = moment($("#first-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
    frequency = $("#frequency-input").val().trim();

    if (name === "" || destination === "" || first === "" || frequency === "") {
        alert("Invalid Form. Try again")
    } else if (isNaN(first) || isNaN(frequency)) {
        alert("Invalid Times. Try again")
    } else {
        database.ref("/trains/").push({
            name: name,
            destination: destination,
            first: first,
            frequency: frequency,
        });
    }
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
});

$("table").on("click", ".btn-danger", function () {
    $(this).closest("tr").remove();
    var id = $(this).attr('id');
    database.ref("/trains/"+id).remove();
});
$("table").on("click", ".btn-success", function () {
    var id = $(this).attr('id');
    event.preventDefault();
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    first = moment($("#first-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
    frequency = $("#frequency-input").val().trim();
    if (name === "" || destination === "" || first === "" || frequency === "") {
        alert("Invalid Form. Try again")
    } else if (isNaN(first) || isNaN(frequency)) {
        alert("Invalid Times. Try again")
    } else {
        database.ref("/trains/"+id).update({
            name: name,
            destination: destination,
            first: first,
            frequency: frequency,
        });
    }
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
    location.reload();
});

database.ref("/trains/").on("child_added", function (snapshot) {
    var sv = snapshot.val();
    var timeDiff = moment().diff(moment.unix(sv.first), "minutes");
    var timeRemainder = timeDiff % sv.frequency;
    var minTill = sv.frequency - timeRemainder;
    var nextTrain = moment().add(minTill, "m").format("hh:mm A");
    $("#table-body").append("<tr>" + "<td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + nextTrain + "</td><td>" + minTill + "</td><td><button type='button' class='btn btn-danger' id=" + snapshot.key + ">Delete</button></td><td><button type='button' class='btn btn-success' id=" + snapshot.key + ">Update</button> </tr>");

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

