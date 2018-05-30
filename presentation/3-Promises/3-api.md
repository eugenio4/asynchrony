## API Promesas ES6
--
## new Promise(..) Constructor
Se usa con la palabra reservada new.
````javascript
  var p = new Promise( function(resolve,reject){
    // `resolve(..)` to resolve/fulfill the promise `reject(..)` to reject the promise
  } );
````

Then (...) y catch (...) también crean y devuelven una nueva promesa, que puede encadenarse a otras promesas.
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
Promesas encadenadas
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
--
### Promise.all

Permite coordinar varias promesas y esperar a que se cumplan todas ellas. Esto nos permite lanzar llamadas asíncronas en "paralelo".

No importa en qué orden, solo que todas las promesas deben cumplirse.

````javascript
Promise.all([
  request('url1'),
  request('url2')
  request('url3')
])
  .then((result) => {})
  .catch((err) => {})
````
--
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