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
