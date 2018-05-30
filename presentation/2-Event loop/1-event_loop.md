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
    function exec(){ console.log('B'); }
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
