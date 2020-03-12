function loadNavbar(){
    if(document.getElementById('navbar') != null){
        document.getElementById('navbar').innerHTML =
        '<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top" id="custom_navbar">' +
        '<nav class="container">'+    
        '<a class="navbar-brand js-scroll-trigger"> <img src="../img/success.png" id="logo"> </a>' +
            '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsResponsive" aria-controls="navbarsResponsive" aria-expanded="false" aria-label="Toggle navigation">' +
                '<span class="navbar-toggler-icon"></span>' +
            '</button>' +
            
            '<div class="collapse navbar-collapse" id="navbarsResponsive">' +
                '<ul class="navbar-nav mr-auto">' +
                    '<li class="nav-item active" id="hide1">' +
                        '<a class="nav-link" href="../index.html">Etusivu<span class="sr-only">(current)</span></a>' +
                    '</li>' +
                    '<li class="nav-item active" id="hide2">' +
                        '<a class="nav-link" href="../events">Kurssit<span class="sr-only">(current)</span></a>' +
                    '</li>' +
                    '<li class="nav-item active" id="hide3">' +
                        '<a class="nav-link" href="../achievements">Tilastot<span class="sr-only">(current)</span></a>' +
                    '</li>' +
                '</ul>' +

                '<button class="nav-item dropdown btn btn-secondary my-2 my-sm-0" id="login_button">' +
                    '<a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="../img/trees.png"height="32" width="32">  </a>' +
                    '<div class="dropdown-menu" aria-labelledby="dropdown01">' +
                    '<a class="dropdown-item" href="../userData">Käyttäjätiedot</a>' +
                    '<form id="logout"><a class="dropdown-item" href="#" id="logoutbutton">Kirjaudu ulos</a></form>' +
                    '</div>' +
                '</button>' +               
            '</div>' +
            '</nav>' +
        '</nav>';
    }
}