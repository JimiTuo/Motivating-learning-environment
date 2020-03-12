async function userData(){
    var logged = await loggedIn();

    if(document.getElementById('data_content') != null && logged.auth === true){
        document.getElementById('data_content').innerHTML =
        '<div class="container">' +
            await getData() +
        '</div>';
    }
}

/**
* Tarkista, onko kirjautunut
*/
function loggedIn(){
    var final = $.get("/loggedIn", function (data) {
    }).done(function (data) {
        console.log(data);
        if (data.auth) {
            return true;
        }
        else {
            window.location.replace("/");
            return false;
        }
    });
    return final;
}

async function getData(){

    var ud = await getFromDB();
    ud = ud.data.rows[0];

    var toP = "<b>Käyttäjätietosi:</b> <ul>";
    toP += "<li><b>Nimi: </b>" + ud.name + "</li>";
    toP += "<li><b>Käyttäjänimi: </b>" + ud.displayName + "</li>";
    toP += "<li><b>Sähköposti: </b>" + ud.email + "</li>";
    toP += "<li><b>Kokemuspisteet: </b>" + ud.exp + "</li>";

    return toP += "</ul>";
}

function getFromDB(){
    return ud = $.get("/courses/getUserdata", function (data) {

    }).done(async function (data) {
        if (data.auth && data.action === "results") {
        }
        else if (data.auth) {
        }
        else {
            window.location.replace("/");
        }
    });
}