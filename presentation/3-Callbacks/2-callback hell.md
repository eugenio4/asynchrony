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
