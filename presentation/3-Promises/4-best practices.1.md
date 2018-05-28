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
