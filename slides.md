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

Preparar entorno:

```bash
npm i -g course-asynchrony
```

Crear un directorio de trabajo:

```bash
mkdir course-asynchrony
cd course-asynchrony
```

Obtener retos:

```bash
course-asynchrony
```

Verificar resultados:

```bash
course-asynchrony verify <FILE>
```

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
Event loop
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
## Ejercicio
  * Leer el contenido de un directorio.
    * Usa la función fs.readdir del módulo fs.
  * Leer el fichero.
    * Usa la función fs.readFile del módulo fs.
  * Generar imagen en miniatura.
    * Usa la función resize de la libería jimp.
  * Escribir a disco.
    * Usa la libería jimp o el módulo fs.

---
## Challenge

count calls

```bash
# Ejecutar en el terminal: madoos-es6-types
# Seleccionar COUNT CALLS
# Seguir instrucciones
```

--
Cuenta veces ha sido llamada una fucinón con el mismo argumento:

```javascript
const reporter = /* your implementation */
const users = [{ name: "Ana" }, { name: "Eric" }]

function showName(user){
    /* your implementation */
    console.log(user.name)
    return reporter
}

showName(users[0])
showName(users[0])
showName(users[1])
calledWithAna =  /* your implementation */ //
```

--
Solución:

```javascript
const reporter = new Map()
const users = [{ name: "Ana" }, { name: "Eric" }]

function showName(user) {
  console.log(user.name)
  let called = reporter.get(user) || 0
  called++
  reporter.set(user, called)
  return reporter
}

showName(users[0])
showName(users[0])
showName(users[1])
const calledWithAna = reporter.get(users[0]) // => 2
```

---
## Challenge

unique numbers

```bash
# Ejecutar en el terminal: madoos-es6-types
# Seleccionar UNIQUE NUMBERS
# Seguir instrucciones
```

--
Implementar una funcion que retorne los elementos únicos

```javascript
const numbers = [1, 1, 2, 2, 3, 3, 4, 4]

function unique(numbers) {
  /* your implementation */
}

const uniqueNumbers = unique(numbers)
// => [1, 2, 3, 4]
```

--

Solución

```javascript
function unique(numbers) {
  return numbers.filter(function(elem, pos, arr) {
    return arr.indexOf(elem) == pos
  })
}
```

```javascript
function unique(numbers) {
  return Array.from(new Set(numbers))
}
```

--
## set

El objeto Set te permite almacenar valores únicos de cualquier tipo, incluso valores primitivos u objetos de referencia.

```javascript
new Set([1, 2, 3])
new Set([{}, new Map(), []])
```

--

## Métodos y propiedades

```javascript
Set.prototype.constructor
Set.prototype.size

Set.prototype.add(value)
Set.prototype.clear()
Set.prototype.delete(value)
Set.prototype.entries()
Set.prototype.forEach(callbackFn[, thisArg])
Set.prototype.has(value)
Set.prototype.keys()
Set.prototype.values()
Set.prototype[@@iterator]()
```

--
## Set vs Array

![picture](https://cdn-images-1.medium.com/max/800/1*ImM6dhwekslUYwg5cX74AQ.png)

--

En la mayoría de los idiomas, los Set tienen un claro y claro caso de uso: operaciones rápidas de unión, intersección y diferencia.

En JavaScript estas operaciones no se definen fácilmente

--

Sin las operaciones de conjuntos comunes definidas, JavaScript Set () puede verse como un contenedor glorificado que solo almacena elementos únicos. Cuando pones un elemento repetido, en realidad reemplaza al existente.

--

Cuando tenemos una gran cantidad de elementos set no empeora al añadir items.

--

Presencia

```javascript
set1.has(5)
array1.indexOf(5)
/*
Set.has() es más rápido que Array.indexOf() incluso para matrices pequeñas.
La diferencia de ejecución aumenta a medida que aumenta el tamaño de los contenedores.

// size = 1000
// SET:  21.014999999999418 ARRAY:  54.00500000000102
// size = 10000
// SET:  17.44499999999971 ARRAY:  398.505000000001
// size = 100000
// SET:  19.770000000004075 ARRAY:  3779.524999999994
*/
```

--

Velocidad de inserción

```javascript
set1.add(5)
array1.push(5)
/*
Ah! Las matrices son mucho más rápidas (5x) en inserción que Sets. 
Tenga en cuenta que la velocidad de inserción crece linealmente en Arrays y de forma no lineal en Sets:

// ammount = 100000;
// Array.push in 4.054999999993015ms; Set.add in 20.915000000037253ms;
// ammount = 1000000;
// Array.push in 17.175000000046566ms; Set.add in 417.03999999992084ms;
// ^ ~4x more than prev.               ^ ~20x more than prev.
// ammount = 10000000;
// Array.push in 349.8299999999581ms; Set.add in 3902.625ms;
// ^ ~20x more than prev.             ^ ~10x more than prev.
*/
```

--

Velocidad de iteración

Los valores secuenciales del Array son más rápidos de iterar que los valores de Set (que se repiten en el orden de inserción).

```javascript
let sum = 0

for (let item of array1) {
  // <- here
  sum += item
}

for (let item of set1) {
  // <- here
  sum += item
}

// ammount = 100000;
// Array.for in 4.44999999999709ms; Set.for in 9.239999999997963ms;
// ammount = 1000000;
// Array.for in 9.044999999998254ms; Set.for in 55.14499999998952ms;
// ammount = 10000000;
// Array.for in 74.47000000000116ms; Set.for in 180.13999999999942ms;
```

--

Operaciones de conjunto

Unión

```javascript
const union = new Set([...set1, ...set2])
```

Diferencia

```javascript
const diff = new Set([...set1].filter(x => !set2.has(x)))
```

Intersección

```javascript
const intersected = new Set([...set1].filter(x => set2.has(x)))
```

--
Cuándo usar Set?

```javascript
const usersCreated = new Set()

class User {
  constructor() {
    usersCreated.add(this)
  }

  static instancesCreated() {
    return usersCreated
  }
}

const created = User.instancesCreated().size
```

--
## Conclusión

--

* Set cuando importan valores únicos
* Set.has es mucho más rápido que Array.indexOf
* Array.push es mucho más rápido que Set.add
* Las matrices son más rápidas para iterar secuencialmente
* Unión, Diferencia, Intersección son fáciles de implementar con Set

---
## Challenge

memory leak

```bash
# Ejecutar en el terminal: madoos-es6-types
# Seleccionar MEMORY LEAK
# Seguir instrucciones
```

--

En el reto “count calls” hemos encontrado una forma de contar las llamadas únicas.

La solución ha creado un terrible memory leak, tu trabajo es encontrarlo antes que el servidor muera!!

--

Solucíon:

```javascript
const users = new WeakSet()
let __users__ = []

const addUser = () => {
  __users__.push({
    name: Math.random()
      .toString(36)
      .substring(7)
  })

  users.add(__users__[__users__.length - 1])
}

const clearUsers = () => {
  __users__ = []
}

setInterval(addUser, 250)
setInterval(clearUsers, 1000)
setTimeout(() => process.exit(0), 4000)
console.log(true)
```

--
## WeakSet

--

Los objetos WeakSet son colecciones de objetos. Un objecto en WeakSet solo puede ser agregado una vez; Esto quiere decir que es unico en la coleccion WeakSet.

--

Las principales diferencias con el objeto Set son:

* A diferencia de Sets, WeakSets son solamente colecciones de objetos y no contienen valores arbitrarios de cualquier otro tipo.

* El WeakSet es débil: Las referencias a objetos en la colección se mantienen débilmente.. Si ya no hay otra referencia a un objeto almacenado en el WeakSet, ellos pueden ser removidos por el recolector de basura. Esto también significa que no hay ninguna lista de objetos almacenados en la colección. Los WeakSets no son enumerables.

--

Métodos y propiedades

```javascript
WeakSet.prototype.constructor

WeakSet.prototype.add(value)
WeakSet.prototype.delete(value)
WeakSet.prototype.has(value)
```

--
## WeakMap

--

Las claves de los WeakMaps solamente pueden ser del tipo Object. Los Primitive data types como claves no están permitidos (ej. un Symbol no pueden ser una clave de WeakMap).

--

## Métodos y propiedades

```javascript
WeakMap.prototype.constructor

WeakMap.prototype.delete(key)
WeakMap.prototype.get(key)
WeakMap.prototype.has(key)
WeakMap.prototype.set(key, value)
```

---
## Challenge

time machine

```bash
# Ejecutar en el terminal: madoos-es6-types
# Seleccionar TIME MACHINE
# Seguir instrucciones
```

---
