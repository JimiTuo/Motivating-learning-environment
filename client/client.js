// Client-side 
var eventIDs = [];
var eventIDsForSectionsParent = [];
var sectionID = [];
var selectedText = 'Valitut osat ilmoittautumiseen:';
var boxSelected = new Map();

function checkAuth() {
    $.get("/checkAuth", function (data) {
        console.log("checkAuth(): Sending GET to the server");
    }).done(function (data) {
        console.log("checkAuth(): Received data: ", data);
        if (data.auth === true) {
            console.log("checkAuth(): Käyttäjä on kirjautunut järjestelmään.");

            // When present, and user is logged in, set column width to col-lg-12.
            let indexColumnWide = document.getElementById("column_wide");
            if (indexColumnWide !== null) {
                $("#index_login").addClass("d-none");
                indexColumnWide.className = "col-lg-12";
            }

            // Enable menu visible on the upper-right of the page (in navbar)
            $("#dropdownMenuButton").text(data.data);
            $("#dropdownMenuButton").removeClass("disabled");
            $("#userEventsButton").removeClass("d-none");

            // Enable links to the next of the logo (in navbar)
            //$("#hide1").removeClass("d-none");
            $("#hide2").removeClass("d-none");

        }
        else if (data.auth === false) {
            console.log("checkAuth(): Käyttäjä EI OLE kirjautunut järjestelmään.");

            // Display login form, if user is not logged in
            $("#login").removeClass("d-none");
        }

        // Display maintenance option in menu, hide events option in menu - if admin is logged in
        if (data.adminAuth === true) {
            console.log("checkAuth(): Käyttäjä on kirjautunut ylläpitäjänä.");
            $("#maintenanceButton").removeClass("d-none");
            $("#userEventsButton").addClass("d-none");
        }
    });
}

// will be loaded on body onload (html)
// sends POST request to /users with the form info provided in HTML form
function loadApp() {
    console.log("Loading application - please wait");

    // Login button
    $("#button").click(function (event) {
        event.preventDefault(); /* Prevent default action */
        $.post("/login", $("#login").serializeArray(), function (data) {
            console.log("Sending POST to the server");
        }).done(function (data) {
            if (data.action === "redirect") {
                window.location.replace(data.data);
            } else {
                document.getElementById("loginStatus").innerText = data.data;
            }
            console.log(data);
        }).fail(function (err) {
            console.log("Error:\t" + err);
        }).always(function () {
            console.log("Finished.");
        });
    });

    // Logout button
    $("#logoutbutton").click(function (event) {
        event.preventDefault(); /* Prevent default action */

        $.get("/logout", function (data) {
            console.log("Sending GET to the server");
        }).done(function (data) {
            document.getElementById("loginStatus").innerText = data.data;
            window.location.reload(false);
        }).fail(function (err) {
            console.log("Error:\t" + err);
        }).always(function () {
            console.log("Finished.");
        });
    });
}

function loadEvents() {

    $("#logoutbutton").click(function (event) {
        event.preventDefault();

        $.get("/logout", function (data) {
            console.log("Sending GET to the server");
        }).done(function (data) {
            window.location.replace("/");
        }).fail(function (err) {
            console.log("Error:\t" + err);
        }).always(function () {
            console.log("Finished.");
        });
    });
}