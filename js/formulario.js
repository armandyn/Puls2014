var $form = $('#formulario'),
	$titulo = $('#titulo'),
	$url = $('#url'),
	$button = $('#mostrar-form'),
	$list = $('#contenido'),
	$post = $('.item').first();

if(localStorage.getItem('autosave')){
	$titulo.val(sessionStorage.getItem('titulo'));
	$url.val(sessionStorage.getItem('url'));
}
var id = setInterval(function(){
	sessionStorage.getItem('titulo',$titulo.val());
	sessionStorage.getItem('url',$url.val());
},1000);

function mostrarFormulario(){
	$form.slideToggle();
	$list.slideToggle();
	return false;
}
function agregarPost(){
	console.log("url:"+$url.val()+", titulo:"+$titulo.val());
	var titulo = $titulo.val(),
		url = $url.val(),
		$clone = $post.clone();
		
	$clone.find('.titulo_item a')
		.text(titulo)
		.attr('href', url);

	$clone.hide();
	$list.prepend($clone);
	mostrarFormulario();
	$titulo.val('');
	$url.val('');
	$clone.fadeIn();
	return false;
}

//Eventos
$button.click(mostrarFormulario);		
$form.on('submit',agregarPost);
