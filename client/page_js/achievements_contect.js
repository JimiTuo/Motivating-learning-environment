async function achievementContent(){
    // Sivulle pohjataulu
    await baseTable();
    // Tauluun ladataan tietokannasta sisältö
    await toTable(); 
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

/**
* Taulukon runko
*/
async function baseTable(){
    var logged = await loggedIn();

    if(document.getElementById('achievement_content') != null && logged.auth === true){
        document.getElementById('achievement_content').innerHTML =
        '<div class="container" id="aContainer">' +
            '<div class="table-responsive-sm">' +
                '<table class="table" id="aTable">' + '</table>' +
            '</div>' +
        '</div>';
    }
}


/**
 * Taulukkoon sisältö tietokannasta
 */
function toTable(){
    $.get("/users/getAchievementsForUsers", function (data) {

    }).done(async function (data) {
        if (data.auth && data.action === "results") {
            var toP = await generateAchTable(data.data.rows);
            document.getElementById("aTable").innerHTML = toP;
        }
        else if (data.auth) {
        }
        else {
            window.location.replace("/");
        }
    });
}

/**
 * Taulukon luominen tietokannasta haetusta tiedosta.
 * Ensin mappiin käyttäjällä olevat suoritusmerkit: avain nimi, sisältö lista merkkejä.
 * Tämän jälkeen rakennetaan taulukko ja lisätään tiedot siihen mapistä.
 */
async function generateAchTable(rows){
    var userMap = new Map(), tempList = [], toP, userExp = [], expI = 0;

    for(i=0; i < rows.length; i++){
        if(userMap.get(rows[i].userName) === undefined){
            tempList = [];
            tempList.push(rows[i].href);
            userMap.set(rows[i].userName, tempList);
            userExp.push(rows[i].exp);
        }else{
            tempList = userMap.get(rows[i].userName);
            tempList.push(rows[i].href);
            userMap.set(rows[i].userName, tempList);
        }
    }

    toP =
    '<thead>' +
        '<tr>' + 
            '<th scope="col">Käyttäjätunnus</th>' +
            '<th scope="col">Kokemuspisteet</th>' +
            '<th scope="col">Taitotaso</th>' +
            '<th scope="col">Suoritusmerkit</th>' +           
        '</tr>' +
    '</thead>' +
    '<tbody>';

    for(var key of userMap.keys()){
        toP += '<tr>';
            toP += '<td>' + key + '</td>'
                +  '<td>' + userExp[expI] + '</td>'
                +  '<td>' + await getLevel(userExp[expI++]) + '</td>'
                +  '<td>' + await listToImg(userMap.get(key)) + '</td>';
        toP += '</tr>';
    }

    return toP += '</tbody>';
}

/**
 * Kuvan href -> html img
 * Ensin lasketaan mahdolliset duplikaattiset arvomerkit.
 * Dupbikaattisten vieressä näytetään lukumäärä.
 */
function listToImg(list){
    var textImg = "", start = '<img src="', end = '"height="42" width="42">', countMap = new Map(), tempValue = 0;

    for(i=0; i < list.length; i++){
        if(countMap.get(list[i]) === undefined){
            tempValue = 1;
            countMap.set(list[i], tempValue);
        }else{
            tempValue = countMap.get(list[i]);
            tempValue++;
            countMap.set(list[i], tempValue);
        }
    }

    tempValue = 0;
    for(var key of countMap.keys()){
        if(countMap.get(key) > 1){
            textImg += start + list[tempValue++] + end + '<b>x' + countMap.get(key) + '</b>';
        }else{
            textImg += start + list[tempValue++] + end;
        }
    }

    return textImg;
}
// Muunnetaan kokemuspisteet -> taitotaso. Tasojen väli 200 pistettä.
function getLevel(exp){
    var level = (exp/200);
    if(level > 100){
        return 100;
    }
    level = String(level);
    if(level.indexOf('.') != -1){
        level = level.substring(0, level.indexOf('.'));
    }
    return level;
}