## Callbacks
--
La devolución de llamada es la forma más común de asíncronía. Hasta que llegaron las promesas...

```javascript
// Ejemplo 1
// Inicio del código
request(optionsRequest, function(..){
	// Ejecución cuando la llamada ajax termina.
} );
// Fin del código secuencial


// Ejemplo 2
setTimeout( function(){
	// Ejecución del código asíncrono.
}, 1000 );

```