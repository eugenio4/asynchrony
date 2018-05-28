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
