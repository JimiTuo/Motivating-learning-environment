//footer content
function footer(){
    if(document.getElementById('footer') != null){
        document.getElementById('footer').innerHTML =

        '<footer class="footer mt-auto py-3" id="footer">' +
			'<div class="container">' +
				'<div class="row text-center text-xs-center text-sm-left text-md-left">' +
					'<div class="col-xs-12 col-sm-6 col-md-6">' +
						'<h5>Jotain</h5>' +
						'<ul class="list-unstyled quick-links">' +
							//'<li><a href="#"><i class="fa fa-angle-double-right"></i>Fb</a></li>' +
						'</ul>' +
					'</div>' +
					'<div class="col-xs-12 col-sm-6 col-md-6">' +
						//'<h5>Quick links</h5>' +
						'<ul class="list-unstyled quick-links">' +
							'<li><a href="#"><i class="fa fa-angle-double-right"></i><b>&copy; 2019</b></a></li>' +
						'</ul>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</footer>';
    }
}