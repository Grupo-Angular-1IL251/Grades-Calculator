# Grades-Calculator

## Descripción funcional del sistema
Proyecto colaborativo para el desarrollo de una calculadora de notas para estudiantes universitarios, que basado en las notas suministradas por el estudiante, las notas faltantes (es decir, que aún no se han entregado y/o calificado) y los porcentajes ponderados de la materia (% de tareas, % de parciales, % de semestral etc) se calcúla que notas necesita el estudiante para poder alcanzar una nota de pase de 71.

## Imagen representativa del sistema

![image info](./imagenes_README/logo.jpg)


## Lista de las 3 funcionalidades principales planificadas

### (Funcionalidad 1) Gestión de Notas:
- Insertar Notas
- Actualizar Notas
- Eliminar Notas
- Visualizar Notas

### (Funcionalidad 2) Gestionar parámetros del curso:
- Insertar porcentajes ponderados de la materia (% de parciales, %de labs, % de tareas, etc)

- Actualizar porcentajes de la materia

- Eliminar porcentajes de la materia (en caso de que ya no hayan investigaciones, aunque se hayan planeado, ejemplo)

- Visualizar porcentajes de la materia

### (Funcionalidad 3) ¿Puedo salvar el semestre?
- Cálculo de cuanto tengo que sacar en las tareas, parciales y semestrales faltantes para poder llegar a nota de pase basado en las notas existentes, faltantes, y porcentajes de la materia.
- Visualización de esa información


## Instrucciones detalladas para:

### Clonar Repositorio

#### Paso 1 CREACIÓN DEL AMBIENTE DEL REPOSITORIO
El primer paso para clonar el repositorio del proyecto en visual studio (el IDE seleccionado para el proyecto) es tener una carpeta donde se abrirá y clonará el repositorio. En este caso, la carpeta se llama GRADES_CALCULATOR **(puede llamarse de cualquier forma, pues es solo el recipiente local donde se almacenará el repositorio)**, y una vez creada, se abre esta carpeta en el visual studio:

![image info](./imagenes_README/p1_clone.jpg)


<img src="./imagenes_README/p1_clone_2.jpg" alt="p1_clone_2" style="width:600px; border-radius:10px;">

Una vez se tenga abierta la carpeta, se procede a clonar el repositorio, presionando la opción de Clone Git Repository. Se requiere tener GIT instalado para poder clonar el repositorio. Y se requiere una cuenta de github asociada a el visual studio code.

##### DESCARGA Y VINCULACIÓN DE GIT
Git se puede descargar desde la página principal de GIT (https://git-scm.com),  la cual ofrece un instalador. Al terminar la instalación, que requerirá el reinicio del computador, el visual studio code reconoce la instalación automáticamente, y permite la vinculación a github.

##### CREACIÓN Y VINCULACIÓN DE CUENTA DE GITHUB

Para crear la cuenta de github, ir a la página web de github (https://github.com) y crear la cuenta. Asociarla al visual studio se puede realizar al momento de seleccionar clone repository, y seleccionar github como opción. Lo que llevará a la ventana de autenticación, donde se podrá iniciar sesión y vincular el github con visual studio. O, se puede acceder a la pantalla de inicio de sesión por medio del símbolo de usuario que está en rojo en la imagen, donde se puede iniciar sesión en github.

<img src="./imagenes_README/account.jpg" alt="p2_clone" style="width:200px; border-radius:10px;">

#### PASO 2 CLONACIÓN DEL REPOSITORIO
Una vez teniendo creada y asociada la cuenta de github a visual studio code, y se tenga instalado GIT, se procede a clonar el repositorio presionando en la opción de clone repository, que si se han seguido estas instrucciones, saldrá en la parte principal:


<img src="./imagenes_README/p2_clone.jpg" alt="p2_clone" style="width:500px; border-radius:10px;">

Entonces, en la barra de búsqueda saldrá Clone from GitHub repository. Opción a la que se le da click.


<img src="./imagenes_README/p2_clone_2.png" alt="p2_clone" style="width:500px; border-radius:10px;">

Si se tiene la cuenta de github asociada a visual studio code, aparecerán los repositorios disponibles, entonces sería solo seleccionar el repo (repo = repositorio) en cuestión.
El visual studio code nos pedirá una carpeta donde almacenar el repo. Esta carpeta, si se ah seguido los pasos hasta ahora, está actualmente creada, y solo debe buscar en el ordenador y seleccionarla. Si no, se puede crear una carpeta en el momento y asignar ahí el repositorio.


### INSTALAR DEPENDENCIAS

#### Dependencias necesarias para ejecución del app web

- Node.js (22.14.0)
- npm (10.9.2)
- Angular CLI (19.2.7)

##### Node.js
Angular depende de Node.js para gestionar sus dependencias a través de npm
(Node Package Manager). El sitio oficial proporciona varios métodos de
instalación, así como las versiones disponibles. En nuestro caso se instaló la
versión v22.14.0 LTS usando el Windows Installer (.msi).

La página de la descarga es: https://nodejs.org/en/download

<img src="./imagenes_README/node_js_install.jpg" alt="node_js_install" style="width:700px; border-radius:10px;">

##### Angular CLI
Ahora nos dirigimos a la terminal de la computadora para ejecutar el comando:
npm install –g @angular/cli. El flag -g indica que la instalación será global,
lo cual permite usar el comando ng desde cualquier lugar.

<img src="./imagenes_README/cli_install.jpg" alt="cli_install" style="width:700px; border-radius:10px;">

### EJECUTAR EL PROYECTO EN MODO DESARROLLO

Para ejecutar el proyecto en modo desarrollo se debe en la terminal primero, por medio del comando cd, ir a la carpeta que tiene el repositorio localmente en el sistema de archivos.

Una vez se esté dentro de la carpeta que contiene el repositorio por medio del comando cd en la terminal, en esa misma terminal se ejecuta el comando ng serve para iniciar el servidor y
ver la aplicación en el navegador. Por defecto, la app se ejecuta en la dirección
http://localhost:4200. Abrir esta dirección en el navegador nos permite
visualizar los cambios que se realizan en el código de forma instantánea sin
necesidad de recargar la pantalla o volver a abrir la dirección.

<img src="./imagenes_README/ejecucion_01.png" alt="ejecucion_01" style="width:1000px; border-radius:10px;">

Imagen de la ejecución

<img src="./imagenes_README/test_page.jpg" alt="ejecucion_01" style="width:500px; border-radius:10px;">
