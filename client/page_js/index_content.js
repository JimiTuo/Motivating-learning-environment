//Index page content
function indexContent(){
 
    if(document.getElementById('index_content') != null){
    document.getElementById('index_content').innerHTML =
        '<div class="container" id="wider_container">' +
            '<div class="row" id="index_info">' +
                '<div class="col-lg-7" id="column_wide">' +
                '<h2>Info</h2>' +
                '<h4>Tähän kaikille sivulla kävijöille näkyvää tietoa</h4>' +
                '<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>' +
            '</div>' +

            '<div class="col-lg-5 justify-content-center" id="index_login">' +
            '<div class="tab-content" id="pills-tabContent">' +
            '<ul class="nav nav-pills nav-fill justify-content-center" id="pills-tab" role="tablist">' +
                '<li class="nav-item">' +
                    '<a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Kirjaudu</a>' +
                '</li>' +
                '<li class="nav-item">' +
                    '<a class="nav-link" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="false">Rekisteröidy</a>' +
                '</li>' +
            '</ul>' +
            '<br>' + 
                '<div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">' +
                    '<form class="form-signin text-left" id="login" style="font-weight:bold">' +

                        '<label for="inputEmail">Sähköposti</label>' +
                        '<input type="email" id="inputEmail" name="email" class="form-control" required autofocus>' +

                        '<label for="inputPassword">Salasana</label>' +
                        '<input type="password" id="inputPassword" name="pass" class="form-control" required>' +

                        '<button class="btn btn-lg btn-primary btn-block" type="submit" id="button">Kirjaudu sisään</button>' +
                        '<br>' + 
                        '<div id="loginStatus"></div>' +
                        '<p style="text-align:center" class="mt-5 mb-3 text-muted">&copy; 2019</p>' +
                    '</form>' +
                '</div>' +
                '<div class="tab-pane fade" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">' +
                    '<form class="form-signin text-left" id="registerNewUser" style="font-weight:bold">' +

                        '<label for="inputEmail">Sähköposti</label>' +
                        '<input type="email" id="inputEmail2" name="email" class="form-control" required autofocus>' +

                        '<label for="inputName">Nimi</label>' +
                        '<input type="name" id="inputName" name="name" class="form-control" required>' +

                        '<label for="inputPassword2">Salasana</label>' +
                        '<input type="password" id="inputPassword2" name="pass" class="form-control" required>' +    

                        '<button class="btn btn-lg btn-primary btn-block" type="submit" id="registerButton">Rekisteröidy</button>' +
                        '<br>' + 
                        '<div id="loginStatus"></div>' +
                        '<p style="text-align:center" class="mt-5 mb-3 text-muted">&copy; 2019</p>' +
                    '</form>' +    
                '</div>' +
                '</div>' +
                '</div>' +
            '</div>' +
            '<hr>'
        '</div>';
    }
}