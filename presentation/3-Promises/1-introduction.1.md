## Promesas
--

### Estructura básica
````javascript
new Promise((resolve, reject) => {  
  // código que se va a ejecutar dentro de la promesa.
});
  .then()
  .catch();
````
--

### Soporte

* Soporte nativo desde Node.js 0.12, Chrome 32, Firefox 27, Edge 12, Safari 7.1 y Opera 19. 
* Existen librerías que ofrecen promesas en entornos donde no están disponibles de forma nativa.

--
### Estados

* Pendiente
* Cumplida
* Rechazada

--
### Que nos aportan

* Facilitan el control de las llamadas asíncronas.
* Solo pueden resolverse una vez.
* Facilitan la lectura del código.
* Evitan la inversión de control.

--

### Inversión del control
Con los callbacks tenemos inversión de control, la continuación de nuestro programa esta basada en una función de devolución de llamada.

Esta devolución de llamada se la entregamos a una tercera parte que no controlamos. ¿Podemos confiar en ese código?
--
#### then(..),  catch(..) and finally(...)
Cada instancia de Promesa tiene varios métodos que nos permiten comprobar si la promesa se cumple o se rechaza.

Una vez que se haya resuelto la Promesa, se llamará a uno u otro de estos manejadores, pero no a ambos, y siempre se llamará de manera asíncrona.

--
###### then (..)

* Una promesa es aceptada cuando se ejecuta la función resolve.
* La resolución de la promesa ejecutará el método then.

--
###### catch (..)
* Una promesa es rechaza cuando se ejecuta la función reject o cuando se produce una excepción o error.
* La resolución de la promesa ejecutará el método catch.
-- 
###### finally (...)
* Finally se ejecutará siempre, tanto si la promesa es aceptada como rechazada.
* No está disponible en todas las versiones de promesas.
--
## Ejemplo promesa

````javascript
new Promise((resolve, reject) => {  
    if (obtenerNumberoRandom() % 2 === 0) {
      resolve('numero par'));
    } else {
      reject('numero impar');
    }    
});
  .then(resp => console.log(resp)
  .catch(err => console.log(err));
````
--

### Encadenar promesas

El método then crea una promesa.

````javascript
var p = new Promise((resolve, reject) => {
  resolve(obtenerNumberoRandom());
});

p.then( function(v){
	console.log( v );	// 21
	return v * 2;
})
  .then( function(v){
    console.log( v );	// 42
  } );
````
--
### Encadenar promesas
````javascript
function delay(time) {
	return new Promise( function(resolve,reject){
		setTimeout( resolve, time );
	} );
}

delay( 100 ) // step 1
.then( function STEP2(){
	console.log( "step 2 (after 100ms)" );
	return delay( 200 );
} )
.then( function STEP3(){
	console.log( "step 3 (after another 200ms)" );
} )
.then( function STEP4(){
	console.log( "step 4 (next Job)" );
	return delay( 50 );
} )
.then( function STEP5(){
	console.log( "step 5 (after another 50ms)" );
});
````