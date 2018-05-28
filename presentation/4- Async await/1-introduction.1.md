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
