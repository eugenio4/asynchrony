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