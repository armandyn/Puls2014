$(function(){
	/*$.get('logos_footer.html',function(codiguito){		
		$('footer').append(codiguito);	
	});
	*/
	$('footer .logo').load('logos_footer.html');	
	$.get('json/usuario.json',function(info){
		var	avatar   = new Image();
		avatar.src   = info.avatar;
		avatar.title = info.nombre+' '+info.apellido;
		$('#avatar').append(avatar);	
	});
});
var base_url = "http://query.yahooapis.com/v1/public/yql?";
function obtenerGeoInformacion(lat,lon){
	var query = 'SELECT * FROM geo.placefinder WHERE text="'+lat+', '+lon+'" AND gflags="R"';
	query = encodeURIComponent(query);
	$.ajax({
		url: base_url+"q="+query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarGeoInfo',
		data:{
			format: 'json'
		}
	});
}
function procesarGeoInfo(datos){
	var res = datos.query.results.Result;
	var barrio = res.neighborhood;
	var ciudad = res.city;
	var pais = res.country;
	var woeid = res.woeid;
	$('#geo').append('<p><strong>'+barrio+'</strong><br>'+ciudad+'</p>');
	obtenerClima(woeid);
}
function obtenerClima(woeid){
	var query = 'SELECT * FROM weather.forecast WHERE woeid="'+woeid+'" and u="c"';
	query = encodeURIComponent(query);
	$.ajax({
		url: base_url+"q="+query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarClima',
		data:{
			format: 'json'
		}
	});
}
function procesarClima(datos){
	var clima = datos.query.results.channel;
	var temp = clima.item.condition.temp;
	var sensacion = clima.item.condition.text;
	var unit = clima.units.temperature;
	var code = clima.item.condition.code;
	var img = new Image();
	img.src = "http://l.yimg.com/a/i/us/we/52/"+code+".gif";
	console.log(datos);
	$('#clima').append(img).append(temp+' '+unit+' ° '+sensacion);
}