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