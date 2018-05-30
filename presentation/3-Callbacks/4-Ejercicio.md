### Ejercicio
  * Necesitamos un programa que pueda leer todos los ficheros de una carpeta y realice ciertas acciones sobre los ficheros.
  * En esta ocasión solo necesitaremos implentar un método para reducir el tamaño de las imágenes.
  * Pero necesitamos que el código este preparado para realizar otras acciones sobre los ficheros. 

  --

### Ayuda
  * En la carpeta problems/callback tienes un fichero con el esquema básico del ejercicio.
  * Para leer el contenido de un directorio.
    * Usa la función fs.readdir del módulo fs.
  * Para leer el fichero.
    * Usa la función fs.readFile del módulo fs.
  * Para generar imagen en miniatura.
    * Usa la función resize de la libería jimp.
  * Para escribir a disco.
    * Usa la libería jimp o el módulo fs.
