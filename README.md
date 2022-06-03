PRÁCTICA PROGRAMACIÓN


- Aplicación con 3 vistas (Login, Registro y Listado de Usuarios) que pueden ser vistas por cualquier usuario logado o no
- Validación básica en front los campos de los formularios de login y registro
- Validación básica en la api con los los datos necesarios para el login y registro
- Con la configuración persistent = true -> El registro, login y listado de usuarios se realiza con la base de datos mysql a traves de la api.
- Con la configuración persistent = false -> El registro, login y listado de usuarios se realiza con la base de datos volátil en Session Storage
- Con cualquier configuración de persistencia se controla que un usuario no pueda registrarse con un email ya existente en la base de datos
- Encriptación de contraseñas en la base de datos MySQL
- Responsive


Configuración del proyecto:
---------------------------

APLICACIÓN FRONTEND

- Angular versión 13
- Bootstrap versión 5.1.3
- Variable 'persistent' de configuración de persistencia se encuentra en el fichero src\environments\environment.ts
- Variable 'basePath'  con la ruta a la api se encuentra en el fichero src\environments\environment.ts
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`


API BACKEND

- Java 8
- Projecto Maven
- Spring Boot 2.7.0
- Spring Boot
- Spring Data JPA para las consultas a la base de datos MySQL
- Configuración del proyecto se encuentra en: src/main/resources/application.properties




