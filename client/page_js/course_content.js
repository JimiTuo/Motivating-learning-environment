var currentCourse = 1, state = 1, courses = [];
var questions = [], option1 = [], option2 = [], option3 = [], correctAnswers = []; 

async function courseContent(){
    await ben();
    await courseList();
}

async function ben() {
    var logged = await loggedIn();
    
    if(document.getElementById('course_content') != null && logged.auth === true){
        document.getElementById('course_content').innerHTML =
        '<div class="container" id="wider_container">' +
            '<div class="row" id="index_info">' + // rivi alkaa        
                '<div class="col-lg-2 justify-content-center" id="left_side">' + //sarake alkaa
                    '<div id="list">' + '</div>' +
                '</div>' +// sivupalkki päättyy
                          
                '<div class="col-lg-8 justify-content-center" id="test_content">' +
                    await buttonRow() +
                    '<div id="course_info">' + await courseDescription(1) + '</div>' +
                '</div>' +
            '</div>'+ // rivi päättyy
        '</div>'; //container päättyy
    }
}
/**
 * Tarkistetaan, onko käyttäjä kirjautuneena
 */
function loggedIn(){
    var final = $.get("/loggedIn", function (data) {
    }).done(function (data) {
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

/*
    Painikerivi kurssin sivulle
*/
function buttonRow(){
    var toP = '<div id="test_buttons">';

    toP += '<button type="button" onClick="etusivu()" class="btn btn-primary" id="etusivuButton">Kurssikuvaus</button>'+
           '<button type="button" onClick="harjoitussivu()" class="btn btn-primary" id="harjoitusButton">Harjoitustila</button>'+
           '<button type="button" onclick="testisivu()" class="btn btn-primary" id="testiButton">Testi 1</button>'+
           '<hr>';

    return toP += '</div>';
}
async function etusivu(){
    state = 1;
    var toP = "";
    toP += await buttonRow();
    toP += '<div id="course_info">' + await courseDescription(currentCourse) + '</div>';
    document.getElementById("test_content").innerHTML = toP;
}
async function harjoitussivu(){
    state = 2;
    var toP = "";
    toP += await buttonRow();
    toP += await harkka();
    document.getElementById("test_content").innerHTML = toP;
}
async function testisivu(){
    state = 3;
    var toP = "";
    toP += await buttonRow();
    toP += await test1();
    document.getElementById("test_content").innerHTML = toP;
}

/*
    Kurssinkuvauksen asettaminen/muokkaaminen kun klikataan kurssia sivuvalikosta
*/
async function courseDescription(idC){

    var test = await getCourseDescription(idC);
    test = test.data.rows.find(obj => { return obj.id === idC });
    test = test.courseInfo;

    for(i=0; i < courses.length; i++){
        if(courses[i] === idC){
            document.getElementById('courseLinkID'+ idC).style.color = "red";
        }else{
            document.getElementById('courseLinkID'+ (i+1)).style.color = "black";
        }
    }

    if(idC != currentCourse){
        currentCourse = idC;
        if(state === 2 || state === 3){
            etusivu();
        }else{
            document.getElementById("course_info").innerHTML = test;
        }
    }

    return test;
}
// Kurssikuvauksen haku tietokannasta
function getCourseDescription(idC){
    return $.get("/users/getCourses", async function (data) {

    }).done(async function (data) {
        if (data.auth && data.action === "results") {
            return data.data.rows;
        }else {return data}
    });
}

//kovakoodattu testi prototyyppiä varten, oikeassa versiossa pitäisi tehdä eri tavalla esim. tietokantaan tallennettu kyssarit ja vastaukset
function test1(){

    //TEST 1
    questions = ["14 + 34 = ?", "70 - 36 = ?", "6 x 6 = ?", "8 x 8 = ?", "36 x 100 = ?",
    "3 x 44 = ?", "12345 x 11 = ?", "(25)² = ?", "√49 = ?", "4 * 4 + 4 * 4 + 4 - 4 * 4 = ?"];
    option1 = ["44", "34", "32", "72", "3600", "134", "135795", "255", "8", "320"];
    option2 = ["58", "14", "36", "64", "360", "132", "12345", "245", "7", "20"];
    option3 = ["48", "24", "42", "60", "36000", "120", "23345", "225", "6", "4"];
    correctAnswers = ["c", "a", "b", "b", "a", "b", "a", "c", "b", "c"];

    var toP = ""; 
    var calc = 0;

    for(i = 1; i < questions.length*3; i += 3){
    toP +=
    '<p><b id="textPadding">' + (calc+1) + '.</b> ' + questions[calc] + '</p>' + 
    '<div class="form-check form-check-inline roundedBox" id="radiodiv' + i + '">'+
        '<input class="form-check-input" type="radio" name="inlineRadioOptions' + i + '" id="inlineRadio' + i + '" value="a">'+
        '<label class="form-check-label" for="inlineRadio">' + option1[calc] + '</label>'+
    '</div>'+
    '<div class="form-check form-check-inline roundedBox" id="radiodiv' + (i+1) + '">'+
        '<input class="form-check-input" type="radio" name="inlineRadioOptions' + i + '" id="inlineRadio' + (i+1) + '" value="b">'+
        '<label class="form-check-label" for="inlineRadio">' + option2[calc] + '</label>'+
    '</div>'+
    '<div class="form-check form-check-inline roundedBox" id="radiodiv' + (i+2) + '">'+
        '<input class="form-check-input" type="radio" name="inlineRadioOptions' + i + '" id="inlineRadio' + (i+2) + '" value="c">'+
        '<label class="form-check-label" for="inlineRadio">' + option3[calc++] + '</label>'+
    '</div>'+
    '<hr>'+
    '<br>';
    }

    toP += 
    '<div class="alert alert-danger alert-dismissible fade show" role="alert" style="display:none" id="vAlert">'+
        '<strong>Huomio!</strong> Vastaa kaikkiin kysymyksiin!'+
        '<button type="button" onclick="closeAlert()" class="close" aria-label="Close">'+
            '<span aria-hidden="true">&times;</span>'+
        '</button>'+
    '</div>'+
    '<br>'+
    '<button type="button" onclick="checkAnswers(40)" class="btn btn-primary" id="tarkistaButton">Tarkista vastaukset</button>';

    return toP; //test_content päättyy 
}

//kovakoodattu harkka prototyyppiä varten, oikeassa versiossa pitäisi tehdä eri tavalla
function harkka(){
    //HARKKA 1
    questions = ["2 + 2 - 1 = ?", "5 x 6 x 0 = ?", "74 + 14 = ?", "6 x 7 = ?", "36 / 10 = ?"];
    option1 = ["2", "0", "90", "42", "0"];
    option2 = ["3", "1", "78", "49", "0,36"];
    option3 = ["4", "30", "88", "36", "3,6"];
    correctAnswers = ["b", "a", "c", "a", "c"];

    var toP = ""; 
    var calc = 0;

    toP += '<p>Tämä on esimerkki kurssin harjoitustilasta. Harjoitustilassa on satunnaistettuja tehtäviä ja mahdollisesti tehtäviin liittyvää teoriaa mukana.</p>'+
    '<p>Harjoitustilan tehtäviä voi tehdä useita kertoja, mutta niistä saa hyvin minimaalisen määrän kokemuspisteitä.</p>';

    for(i = 1; i < questions.length*3; i += 3){
    toP +=
    '<p><b id="textPadding">' + (calc+1) + '.</b> ' + questions[calc] + '</p>' + 
    '<div class="form-check form-check-inline roundedBox" id="radiodiv' + i + '">'+
        '<input class="form-check-input" type="radio" name="inlineRadioOptions' + i + '" id="inlineRadio' + i + '" value="a">'+
        '<label class="form-check-label" for="inlineRadio">' + option1[calc] + '</label>'+
    '</div>'+
    '<div class="form-check form-check-inline roundedBox" id="radiodiv' + (i+1) + '">'+
        '<input class="form-check-input" type="radio" name="inlineRadioOptions' + i + '" id="inlineRadio' + (i+1) + '" value="b">'+
        '<label class="form-check-label" for="inlineRadio">' + option2[calc] + '</label>'+
    '</div>'+
    '<div class="form-check form-check-inline roundedBox" id="radiodiv' + (i+2) + '">'+
        '<input class="form-check-input" type="radio" name="inlineRadioOptions' + i + '" id="inlineRadio' + (i+2) + '" value="c">'+
        '<label class="form-check-label" for="inlineRadio">' + option3[calc++] + '</label>'+
    '</div>'+
    '<hr>'+
    '<br>';
    }

    toP += 
    '<div class="alert alert-danger alert-dismissible fade show" role="alert" style="display:none" id="vAlert">'+
        '<strong>Huomio!</strong> Vastaa kaikkiin kysymyksiin!'+
        '<button type="button" onclick="closeAlert()" class="close" aria-label="Close">'+
            '<span aria-hidden="true">&times;</span>'+
        '</button>'+
    '</div>'+
    '<br>'+
    '<button type="button" onclick="checkAnswers(5)" class="btn btn-primary" id="tarkistaButton">Tarkista vastaukset</button>';

    return toP; //harkka loppuu
}

//sulkee alertin
function closeAlert(){
    document.getElementById("vAlert").style.display = "none";
}

/*
* Testin/harjoituksen oikeiden vastauksien tarkastaminen, parametrina kerroin kokemuspisteiden laskuun
*/
async function checkAnswers(kerroin){
    var answers = []; //annetut vastaukset 
    var wasItRight = []; //boolean oliko oikein
    var calc = 0;
    var montaoikein = 0;
    var onkofuckedupkiekko;

    for(i = 1; i < questions.length*3; i += 3){ //vastausten tarkistaminen
        onkofuckedupkiekko = true;
        if(document.getElementById("inlineRadio" + i).checked){
            answers[calc] = "a";   
            onkofuckedupkiekko = false;         
        }
        if(document.getElementById("inlineRadio" + (i+1)).checked){
            answers[calc] = "b";
            onkofuckedupkiekko = false;
        } 
        if(document.getElementById("inlineRadio" + (i+2)).checked){
            answers[calc] = "c";             
            onkofuckedupkiekko = false; 
        }
        if(onkofuckedupkiekko){
            document.getElementById("vAlert").style.display = "inline-block";
            return;
        }
        if(correctAnswers[calc] == answers[calc]){
            montaoikein++;
            wasItRight[calc] = true;
        }else{
            wasItRight[calc] = false;
        }
        calc++;
    }

    calc = 0;

    for(i = 1; i < questions.length*3; i += 3){ //laatikoiden varjays

        switch(correctAnswers[calc]) {
            case "a":
                document.getElementById("radiodiv" + i).style.backgroundColor = "hsl(120, 100%, 60%)";
            break;
            case "b":
                document.getElementById("radiodiv" + (i+1)).style.backgroundColor = "hsl(120, 100%, 60%)";
            break;
            case "c":
                document.getElementById("radiodiv" + (i+2)).style.backgroundColor = "hsl(120, 100%, 60%)";
            break;
        }
        if(!wasItRight[calc]){
            switch(answers[calc]){
            case "a":
                document.getElementById("radiodiv" + i).style.backgroundColor = "hsl(0, 90%, 60%)"; 
            break;
            case "b":
                document.getElementById("radiodiv" + (i+1)).style.backgroundColor = "hsl(0, 90%, 60%)"; 
            break;
            case "c":
                document.getElementById("radiodiv" + (i+2)).style.backgroundColor = "hsl(0, 90%, 60%)"; 
            break;
            }
        }
        calc++;
    }

    var atresshold = await testXp(1);
    onkoachievement = 0;

    if(atresshold <= montaoikein*10){
        addAch(2);
        onkoachievement = 400;
    }

    document.getElementById("vAlert").style.display = "none";    
    document.getElementById("tarkistaButton").disabled = true;
    if(onkoachievement === 400){
        document.getElementById("tarkistaButton").innerText = montaoikein + " / " + calc + " -> ansaitsit " + montaoikein*kerroin + " kokemuspistettä testistä + " + onkoachievement + "  kokemuspistettä suoritusmerkinnästä";  
    }else {
        document.getElementById("tarkistaButton").innerText = montaoikein + " / " + calc + " -> ansaitsit " + montaoikein*kerroin + " kokemuspistettä";  
    }
    addExp(montaoikein*kerroin + onkoachievement);
}

/*
* Tietyn kurssin suoritusmerkinnän rajan etsiminen
*/
async function testXp(idG){

    var test =  await getTestxp();
    test = test.data.rows.find(obj => { return obj.id === idG });
    test = test.aThreshold;

    return test;
}

/*
* Kaikkien testien tietojen haku tietokannasta  
*/
function getTestxp(){
    return $.get("/users/getTests", async function (data) {

    }).done(async function (data) {
        if (data.auth && data.action === "results") {
            return data.data.rows;
        }else {return data}
    });
}

//lisaa suoritusmerkinnän kayttajalle
function addAch(aId){
    $.post("/users/addAchievement", {aId: aId}, function (data) {
        console.log("Sending POST to the server");
    }).done(function (data) {
        //document.getElementById("adminStatus").innerText = data.data;
    }).fail(function (err) {
        console.log("Error:\t" + err);
    }).always(function () {
        console.log("Finished.");
    });
}

//lisaa xp sen hetkiselle kayttajalle
function addExp(exp){
    $.post("/users/addExp", {value: exp}, function (data) {
        console.log("Sending POST to the server");
    }).done(function (data) {
        //document.getElementById("adminStatus").innerText = data.data;
    }).fail(function (err) {
        console.log("Error:\t" + err);
    }).always(function () {
        console.log("Finished.");
    });
}

/*
* Haetaan kurssit     
*/
function courseList(){
    $.get("/users/getCourses", async function (data) {

    }).done(async function (data) {
        if (data.auth && data.action === "results") {
            var pageC = await generateCourseTable(data.data.rows);
            document.getElementById("list").innerHTML = pageC;
        }else if (data.auth) {
            document.getElementById("list").innerHTML = data.data;
        }
        else {
            window.location.replace("/");
        }
    });
}

/*
* Sivun vasemman laidan buttonien luonti
*/
function generateCourseTable(rows){

    var toP = '<div class="panel panel default">'+
    '<div class="panel-header">'+ "<b>Kurssit</b>" + "</div>" +
    '<div class="card-body">' +
    '<ul class="list-group list-group-flush">';

    for (i=0; i < rows.length; i++){ 
        if(i === 0){
            toP += '<li class="list-group-item" id="nopadding"><a style="color:red" id="courseLinkID' + rows[i].id + '" onclick="courseDescription('+ rows[i].id +')" href="#">' + rows[i].name +  '</a></li>';
        }else{
            toP += '<li class="list-group-item" id="nopadding"><a id="courseLinkID' + rows[i].id + '" onclick="courseDescription('+ rows[i].id +')" href="#">' + rows[i].name +  '</a></li>';
        }
        courses.push(rows[i].id);
    }

    toP += '</div>' +
    '</div>';
    return toP += '</ul>';
}