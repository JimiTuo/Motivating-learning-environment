
//Index page content
function eventsContent(){
    if(document.getElementById('events_content') != null){
    document.getElementById('events_content').innerHTML =
    '<div class="container">' +
        '<div class="accordion" id="accordionExample">' + '</div>' +
        '<form id="eventSignup">' +
            //'<div name="eventSectionID" id="eventSectionID" style="display:none">' + '</div>' +
            '<input type="text" name="eventSectionID" id="eventSectionID" style="display:none"/>' +
        '</form>' +
        '<input class="btn btn-secondary my-2 my-sm-0" type="submit" id="eventSignupButton" value="Ilmoittaudu valituille"/>' +
        '<div id="eventSignupStatus"></div>' +
        '<br>' +
    '</div>';
    }
}