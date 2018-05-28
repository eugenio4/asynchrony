## Patrones de Programación Asíncrona

###### Eugenio Pérez Martínez

--
## Temario

* Introducción
* Event Loop
* Callbacks
* Promesas
* Async / Await


--

### Preparar entorno

* NodeJs
* Descargar repositorio https://github.com/eugenio4/course-asynchrony
---
## Introducción

--

* Razón de ser
* Concurrencia Vs Paralelismo
* Asíncrono
* El problema fundamental: Condiciones de carrera

--

## Razón de ser

--
* Single-threading

* Tipos de eventos asíncronos:
  * Entrada del usuario.
  * Llamada a un servicio.
  * Leer una base de datos.
  * Leer un sistema de archivos.
  * ...

--
## Concurrencia Vs Paralelismo
Ambos permiten realizar varios procesos "Al mismo tiempo".
--
### Concurrencia
Dos procesos pueden progresar y avanzar independientemente del otro. Si hay dos hilos, ambos progresan de forma independiente.

Se puede conseguir con un solo proceso o hilo turnando la ejecución de las tareas.

¿Se puede conseguir concurrencia en Javacsript?

--
Sí gracias a como trabajar el motor de JS y sus llamadas asíncronas.
--
### Paralelismo
Dos procesos se están ejecutando simultáneamente. Se puede decir que si el cálculo es paralelo, también es concurrente.

¿Se puede conseguir paralelismo en Javacsript?
--
* Browser
  * Web workers
* NodeJs
  * Procesos Hijos (Máquinas multicore)
--

## Asíncrono
Algo que sucederá en el futuro.
--

Obtener datos a través de una llamada a un servicio.

```javascript
var data = get( "http://some.url.1" );

console.log( data );
// Oops! `data` generally won't have the Ajax results

```

--
Obtener datos a través de una llamada a un servicio.

```javascript
get( "http://some.url.1",  function (data) {
  console.log( data );
});

```

--
Nunca realizar solicitudes Ajax síncronas.
![Scared](/img/scared.png)

* Bloquea la IU del navegador y evita cualquier interacción del usuario.
* Bloquea el resto de peticiones y procesos del navegador.

--

## El problema fundamental: Condición de carrera

--

```javascript

var a = 1;var b = 2;
function foo(){
  a++;
  b = b * a;
  a = b + 3;
}
function bar(){
  b = b-1;
  a = 8 + b;
  b = a * 2;
}
// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar );

```
Este programa tiene dos posibles resultados dependiendo de cuál comienza a ejecutarse primero.
---
## Event Loop

--

![EventLoop](/img/eventloop.png)

--
* Heap: Asigna una región de memoria.
* Stack: Las llamadas a función forman una pila de frames. Un frame encapsula información como el contexto y las variables locales de una función.
* Browser or Web APIs
--
### Principales características
* Ejecutar hasta completar.
* Añadiendo mensajes. (setTimeout, eventos, peticiones, ...)
* Cero retraso -> setTimeout 0
* Nunca se interrumpe
--
```javascript

function main(){
  console.log('A');
  setTimeout(
    function display(){ console.log('B'); }
  ,0);
	console.log('C');
}
main();
```
--
![EventLoop](/img/eventloop3.png)
--
```javascript
  $.on('button', 'click', init);

  function init() {
      setTimeout(function timer() {
          c();
      }, 3000);
  }

  function a (){
      console.log("A ha terminado");
  }

  function b (){
      a();
      console.log("B ha terminado");
  }

  function c (){
      b();
      console.log("C ha terminado");
  }
```
--
[Demo Event Loop](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

---
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
--
## Callback hell or pyramid of doom

--
Encadenamiento de callbacks

```javascript
myButton.addEventListener('click', function(){
  setTimeout( function request(){
    request('http://some.url.1', function response(url){
      request(url, function response(text){
			
		  });
		});
	}, 500) ; 
});	
} );

```
--
```javascript
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          widths.forEach(function (width, widthIndex) {            
            this.resize(width, widthIndex).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})

```

--

## Buenas prácticas

```javascript
var form = document.querySelector('form')
form.onsubmit = function (submitEvent) {
  var name = document.querySelector('input').value
  request({
    uri: "http://example.com/upload",
    body: name,
    method: "POST"
  }, function (err, response, body) {
    var statusMessage = document.querySelector('.status')
    if (err) return statusMessage.value = err
    statusMessage.value = body
  })
}
```
--
### 1. Da un nombre a las funciones anónimas y ponlas en primer lugar del código

* Más legible gracias a los nombres de las funciones.
* Cuando ocurran excepciones, en el stacktraces tendrás la referencia de la función en lugar de "anonymous".
* Permite mover las funciones y hacer referencia a ellas por sus nombres.

--
````javascript
function formSubmit (submitEvent) {
  var name = document.querySelector('input').value
  request({
    uri: "http://example.com/upload",
    body: name,
    method: "POST"
  }, postResponse)
}

function postResponse (err, response, body) {
  var statusMessage = document.querySelector('.status')
  if (err) return statusMessage.value = err
  statusMessage.value = body
}
````
--
### 2. Modulariza las funciones.

Intenta escribir funciones que hagan una única cosa y crea módulos js o librerías.

--

### 3. Maneja los errores

* Errores de sintáxis.
* Errores en tiempo de ejecución.
* Errores de plataforma (permios, sin conexión, etc).

--
Una simple convención es poner el error siempre en el primer argumento, para que no se olvide controlar el error.

````javascript

var fs = require('fs')

 fs.readFile('/Does/not/exist', handleFile)

 function handleFile (error, file) {
   if (error) return console.error('Uhoh, there was an error', error)
   // otherwise, continue on and use `file` in your code
 }
````
-- 
Otra opción es poner una callback para el caso de éxito y otra para el caso de error.

````javascript
function success(data) {
	console.log( data );
}

function failure(err) {
	console.error( err );
}

ajax( "http://some.url.1", success, failure );

````

--
## Sincronización de callbacks

Situación: "Para cargar nuestra página de inicio tenemos que llamar a 3 servicios,
pero no queremos pintar la página hasta tener la respuesta de los tres servicios"

--
Condiciones de carrera
````javascript
function getData1 () { request("http://api.com/data1") }

function getData2 () { request("http://api.com/data2") }

function getData3 () { request("http://api.com/data2") }

function pintar(){
  //pintamos nuestra página
}

getData1();
getData2();
getData3();
pintar();
````
--
Problema de rendimiento

````javascript
function getData1 () { request("http://api.com/data1", getData2) }
function getData2 () { request("http://api.com/data2", getData3) }
function getData3 () { request("http://api.com/data2", pintar) }
function pintar() {
//pintamos nuestra página
}
getData1();
````

--

Una solución

````javascript
let datos1 = false;
let datos2 = false;
let datos3 = false;
funcion succes1 => {datos1 = true; pintar();}
funcion succes2 => {datos2 = true; pintar();}
funcion succes3 => {datos3 = true; pintar();}
function getData1 () { request("http://example.com/data1", getData2) }

function getData2 () { request("http://example.com/data2", getData3) }

function getData3 () { request("http://example.com/data2", pintar) }

function pintar(){
  if (datos1 && datos2 && datos3) {
    //pintamos nuestra página
  }
}
function init(){
  getData1();
  getData2();
  getData3();
}

init();
````

--
* ¿Qué pasa si falla alguna de las llamadas?
* ¿Si se lanza alguna excepción en otra parte del código asíncrono?
* Sí alguna llamada asíncrona nunca termina.

![Scared](/img/scared.png)

--

Hay que aumentar la lógica del código, todo ese control de llamadas asíncronas es lo que se llama "Callback hell".
--
### Ejercicio
  * Necesitamos un programa que pueda leer todos los ficheros de una carpeta y realice ciertas acciones sobre los ficheros.
  * En esta ocasión solo necesitaremos implentar un método para reducir el tamaño de las imágenes.
  * Pero necesitamos que el código este preparado para realizar otras acciones sobre los ficheros. 

  --

### Ayuda
  * En la carpeta problems/callback tienes un fichero con el esquema básico del ejercicio.
  * Leer el contenido de un directorio.
    * Usa la función fs.readdir del módulo fs.
  * Leer el fichero.
    * Usa la función fs.readFile del módulo fs.
  * Generar imagen en miniatura.
    * Usa la función resize de la libería jimp.
  * Escribir a disco.
    * Usa la libería jimp o el módulo fs.

---
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
Con los callbacks tenemos inversión del control, la continuación de nuestro programa esta basada en una función de devolución de llamada.

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
--
## Errores en promesas
Una promesa rechazada o un error de JS ejecutará la primera función catch.

````javascript
new Promise((resolve, reject) => {
  reject();
})
  .then(()=> { console.log('1') })
  .catch(()=> { console.log('2') })
  .then(()=> { console.log('3') })
  .catch(()=> { console.log('4') })
````
Resultado:
  2
  3
--
Si se lanza un error desde el catch se propagará el error hasta el próximo catch

````javascript
new Promise((resolve, reject) => {
  foo(); //undefined
})
  .then(()=> {
    console.log('1')
  })
  .catch(()=> {
    console.log('2')
    throw 'error';
  })
  .then(()=> {
    console.log('3')
  })
  .catch(()=> {
    console.log('4')
  })
````
Resultado:
  2
  3
--
### Errores no controlados

El evento unhandledRejection de nodeJS será lanzado con aquellas promesas que no han sido controladas.

````javascript
  process.on('unhandledRejection', error => {
  // Mostrará por pantalla "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
});

new Promise((_, reject) => reject(new Error('woops'))).
  catch(() => {
    // No se ejecutará
    console.log('caught', err.message); //err no esta declarado
  });

````

--
## Promesas ES6
--
## new Promise(..) Constructor
Se usa con la palabra reservada new.
````javascript
  var p = new Promise( function(resolve,reject){
    // `resolve(..)` to resolve/fulfill the promise
    // `reject(..)` to reject the promise
  } );
````

Then (...) y catch (...) también crean y devuelven una nueva promesa, que puede encadenarse a otras promesas.

Si cualquier devolución de llamada devuelve un valor inmediato, no Promesa, ese valor se establece como el cumplimiento de la promesa devuelta.
--
````javascript 
let p = new Promise((resolve, reject) => {
  setTimeout(()=> {
    resolve(1)
  }, 300);
})
  .then((value)=> {
    console.log('Resultado: ' +value)
  })
  .catch((err)=> {
    console.log(err)
  });

  // Resultado: 1

````
--
Si cualquier devolución de llamada devuelve una promesa, ese valor se desenvuelve y se convierte en la resolución de la promesa inicial.
--
````javascript 
let p = new Promise((resolve, reject) => {
  setTimeout(()=> {
    resolve(foo())
  }, 300);
})
  .then((value)=> {
    console.log(value)
  })
  .catch((err)=> {
    console.log(err)
  });

let foo = () => {
  return new Promise((resolve, reject) => {
    setTimeout( () => {
      resolve(4)
    }, 300);
  });
};

  // Resultado: 4

````
--

## Promise.resolve
* Asegurar en caso de que se produzca un error.
* El valor devuelto siempre será una promesa (una función a veces devuele una promesa y otras veces no).

````javascript
Promise.resolve( foo( 42 ) )
  .then( function(v){
    console.log( v );
  } );

````
--
## Promise.then
* Devuelve otra promesa

````javascript
Promise.resolve( foo( 42 ) )
  .then( function(v){
    console.log( v );
  } );

````
### Promise.all

Permite coordinar varias promesas y esperar a que se cumplan todas ellas. Esto nos permite lanzar llamadas asíncronas en "paralelo".

No importa en qué orden, solo que todas las promesas deben cumplirse.

````javascript
Promise.all([
  request('url1'),
  request('url2')
  request('url3')
])
  .then((result) => { 
    //result is array with values of each response
  })
  .catch(() => {
    // is execufed if fail at least one request
  })
````

### Promise.race

La promesa estará resuelta, en cuanto una de las promesas que se pasan como parámetro se cumpla.

````javascript
Promise.race([
  request('url1'),
  request('url2')
  request('url3')
])
  .then((result) => { 
    //result have value of first promise resolved
  })
  .catch(() => {
    // is execufed if fail at least one request
  })
````
--
## Patrones y buenas prácticas
--
### Promisifying callbacks

Convierte callbacks a promesas.

````javascript

function readFile(filename, onSuccess, onError) {  
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) onError(err);
      else onSuccess(data);
    })
  })
}

readFile('index.html', console.log, console.log);
````


--
La función debe retornar una promesa. LLamaremos a los métodos resolve (donde antes llamabamos a la función del callback) y reject (cuando queríamos comunicar un error).

````javascript

function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    })
  })
}

readFilePromise('index.html')
  .then(data => console.log(data))
  .catch(e => console.log(e))

````

--
### Promisifying values

Una función que necesite devolver una Promesa, pero maneja ciertos casos de forma sincrona.

````javascript
function readFilePromise(filename) {
  if (!filename) {
    return Promise.reject(new Error("Filename not specified"));
  }
  if (filename === 'index.html') {
    return Promise.resolve('<h1>Hello!</h1>');
  }
  return new Promise((resolve, reject) => {/*...*/})
}

````
--
### Código en concurrencia

Ejecutar todo el código posible "al mismo tiempo". Para mejorar la performance.

````javascript
let filenames = ['index.html', 'blog.html', 'terms.html'];

Promise.all(filenames.map(readFilePromise))
  .then(files => {
    console.log('index:', files[0]);
    console.log('blog:', files[1]);
    console.log('terms:', files[2]);
  })

````
--
### Controlar errores

Aquí el bloque catch () se desencadena si falla getItem o updateItem.

````javascript
Promise.resolve()
  .then(_ => api.getItem(1))
  .then(item => {
    item.amount++;
    return api.updateItem(1, item);
  })
  .catch(e => {
    console.log('failed to get or update item');
  })

````
--
¿Si queremos manejar el error getItem por separado? Basta con insertar otro catch () más arriba.

````javascript
Promise.resolve()
  .then(_ => api.getItem(1))
  .catch(e => api.createItem(1, {amount: 0}))
  .then(item => {
    item.amount++;
    return api.updateItem(1, item);
  })
  .catch(e => {
    console.log('failed to update item');
  })


````
--
### Lanzar errores

El código dentro de instrucciones then () se comporta como dentro de un bloque try. Ambos Promise.reject () y throw new Error () harán que se ejecute el siguiente bloque catch ().

--
## Antipatrones y problemas comunes

### Olvidar el return

````javascript

pi.getItem(1)
  .then(item => {
    item.amount++;
    api.updateItem(1, item);
  })
  .then(update => {
    return api.deleteItem(1);
  })
  .then(deletion => {
    console.log('done!');
  })

````
La falta de retorno retorno delante de api.updateItem () provoca que ese bloque se resuelva inmediatamente, y api.deleteItem () probablemente se invocará antes de que finalice api.updateItem (). 

El problema es que .then () puede devolver un valor o una nueva promesa, y undefined es un valor válido.

--

### No controlar los errores

Con Promises, es fácil olvidar que los errores deben manejarse explícitamente. Hay que usar catch siempre. 

Recuerda que los errores se propagan a la promesa superior, no es necesario poner catch a todas las promesas. Basta con ponerla al final.
--
### Ejercicio
  * Convierte los callbacks del ejercicio anterior a promesas.

### Ayuda
  * En la carpeta problems/promises tienes un fichero con el esquema básico del ejercicio.
---
## Async / await
--
### Principales características.
* Permite escribir un código basado en promesas como si fuese sincrono, pero sin bloquear el hilo principal.
* Hacen el código más legible.

--
### Uso
* Palabra clave *async* antes de la definición de la función.
* Palabra clave *await* dentro de la función para esperar una promesa.

--
### ¿Cómno funciona?
* La función se pausa de una forma que no bloquea el resto del código asíncrono que pueda producirse.
* Si la promesa se completa.
  * Recibes de vuelta el valor.
* Si la promesa rechaza.
  * Se arroja el valor del error.

--
### Ejemplo
*async* convierte a la función en una promesa. Que será aceptada o rechazada si devuelve un valor o una excepción.

````javascript
  async function myFirstAsyncFunction() {
    try {
      const fulfilledValue = await request('url.example');
      return fulfilledValue;
    }
    catch (rejectedValue) {
      // es necesario usar try/catch para obtner el error que pueda producirse en la promesa.
    }
  }

````
--

### Buenas prácticas
--
#### Código sincrono

Es posible realizar código sincrono con async await de la siguiente manera.

````javascript
async function series() {
  await wait(500);
  await wait(500);
  return "done!";
}
````

````javascript
async function delay() {
  const wait1 = wait(500);
  const wait2 = wait(500);
  await wait1;
  await wait2;
  return "done!";
}

````
--
##### Error handling

Usar try catch en las funciones *async* para coger los errores que puedan producirse en las llamadas asíncronas.

````javascript
async function main () {
  try {
    await new Promise((resolve, reject) => {
      reject(new Error('Error!'))
    })
  } catch (err) {
    // handle error case
  }
}
main()
  .then(console.log)
  .catch(console.error)

````
--
##### Bucles asíncronos

Este código lanza una excepción porque estamos usando await dentro de una función síncrona.
````javascript
async function processArray(array) {
  array.forEach(item => {
    await func(item); //este código lanza una excepción
  });
}
````

--
Podemos definir la función anónima como asíncrona.
````javascript
async function processArray(array) {
  array.forEach(async (item) => {
    await func(item);
  });
}
````

Pero forEach no esperará hasta que todos las iteraciones estén terminadas. Simplemente ejecutará las tareas.

--

````javascript
function delay() { return new Promsie( resolve => setTimeout(resolve), 300) };

async function delayedLog(item) {
  await delay();
  console.log(item);
}

async function processArray (array) {
  array.forEach(async (item) => {
    await delayedLog(item);
  });
  console.log('done');
}
processArray([1,2,3]);
````
Done!
1
2
3

--
Para esperar el resultado, deberíamos regresar a la vieja escuela "for loop", o usar la versión moderna con for..of.

````javascript

async function processArray (array) {
  for (const item of array){
    await delayedLog(item);
  });
  console.log('done');
}
processArray([1,2,3]);
````
1
2
3
Done!

--
### Ejercicio
  * Usa async/ await en el código del ejercicio anterior y comprueba sus diferencias.

### Ayuda
  * En la carpeta problems/promises tienes un fichero con el esquema básico del ejercicio.
---
## Generadores
--
* Nos permite expresar el control de flujo asíncrono de forma secuencial y sincróna.
--

Permiten a las funciones "salir" en un punto en especial, y luego reanudar desde el mismo punto y estado.
  * El asterisco indica que es un generador. Se puede usar function* o *nombreFunncion
  * La palabra clave yield es nuestro punto de retorno o reanudación. Podemos usarla de la siguiente manera:

--

### Soporte

* Funcionalidad de ES6 y están disponibles de forma nativa en Node.js 4.x, Chrome 39, Firefox 26.0, Edge 13, Safari 10 y Opera 26. 
--

### Características
La llamada a una función generadora no la ejecuta inmediatamente. Se devuelve un objeto iterador en su lugar.
--
### Características

Cuando el metodo next() del iterador es llamado, el cuerpo de la función generadora es ejecutado hasta la primera expresión yield, la cual especifica el valor que será retornado por el iterador o con, yield*, delega a otra función generadora.

--
### Características
El método next() retorna un objeto con una propiedad *value* que contiene el valor deveulto y una propiedad *done* que indica, con un booleano, si la función generadora ha hecho yield al último valor.

--
¿Qué hace una función generador?

````javascript
  function* idMaker(){
    var index = 0;
    while(index < 3)
      yield index++;
  }

  var gen = idMaker();

  console.log(gen.next().value); // 0
  console.log(gen.next().value); // 1
  console.log(gen.next().value); // 2
  console.log(gen.next().value); // undefined
````
--
Uso de yield*

````javascript
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value);

````
--

### Entrada y salida

* Una función generador puede recibir parámetros de entrada.
* Devulve un valor en la propiedad value.

````javascript
  function *foo(x,y) {
    return x * y;
  }

  var it = foo( 6, 7 );

  var res = it.next();

  res.value;	
````
--
### Mensajería de iteración
Puedes pasar valores a la función generadora con next(value). Y devolver el valor al iterador con yield.
````javascript
function *foo(x) {
	var y = x * (yield);
	return y;
}
var it = foo( 6 );
it.next();
var res = it.next( 7 );
res.value; // 42
````

### Corrutinas

* Las corrutinas son un concepto de programación que permite a las funciones pausarse y dar control a otra función.
* Las funciones pasan el control de un lado a otro.
* Se pueden implementar usando generadores y promesas.
* Async-Await = Generadores + Promesas

--
### Ejercicio
  * Usa generadoes para procesar en paralelo todos los ficheros

### Ayuda
  * Usa Child Process para crear procesos que puedan correr en paralelo.
  * Ayudate del código realizado en los anteriores ejercicios.
---
