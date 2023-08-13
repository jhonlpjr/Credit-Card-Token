# Card Tokenized Culqi

Este es el proyecto realizado como Technical Test para aplicar al puesto de Backend SR para CULQI.
Se solicitó un microservicio que genere un token para almacenar de forma segura la información de las tarjetas de créditos de pago y que también permita consultar los datos de la tarjeta al ingresar dicho token.


# Detalles técnicos

**Arquitectura**
Clean Arquitecture
Serverless

**Tecnologías**

 - *Cloud*: AWS - Lambda Functions
 - *Backend*: Node - TypeScript
 - *BD*: MongoDB
 - *Test*: Jest
 
# Requisitos previos
 - Tener instalado [GIT](https://git-scm.com/downloads)
 - Tener instalado [Node.js](https://nodejs.org/es)
 - Tener instalado [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

# Instrucciones para pruebas unitarias

 1. Primero se debe tener clonado el proyecto previamente, si no se realizó la clonación aún, ejecutar el siguiente comando ubicándote en algún directorio a elección:
	

> `git clone https://github.com/jhonlpjr/Card-Tokenized-Culqi.git`

 2. Luego de tener el repositorio ya clonado, ubicarnos en la carpeta raíz con algún terminal de consola de nuestra preferencia y ejecutar:
 

    npm run test

 3. Verificar los resultados de las pruebas unitarias.



# Instrucciones de despliegue

 1. Primero se debe tener clonado el proyecto previamente, si no se realizó la clonación aún, ejecutar el siguiente comando ubicándote en algún directorio a elección:
	

    

> `git clone https://github.com/jhonlpjr/Card-Tokenized-Culqi.git`

 2. Verificar el archivo de configuración para SAM: *template.yml*
En caso se requiera modificar las configuraciones de los nombres de los endpoints que llaman a las funciones lambdas.
 3.  
	

- Despliegue en ambiente local. - 
Para desplegar las lambdas functions en ambiente local usaremos SAM CLI como herramienta. Para ello nos ubicamos en la carpeta raíz del proyecto con algún terminal de consola de nuestra preferencia y ejecutamos el siguiente comando: 

> `npm run sam-local`

- Despliegue en AWS. - 
Para desplegar las lambdas functions en ambiente local usaremos SAM CLI como herramienta. Para ello nos ubicamos en la carpeta raíz del proyecto con algún terminal de consola de nuestra preferencia y ejecutamos el siguiente comando: 

> `npm run sam-prod`
> Recordar que primero se deben tener configuradas nuestras credenciales
> de AWS en la máquina desde la que deseamos desplegar las lambdas
> functions.
> Tambien recordar que en caso se requiera un nombre y/o region especifica se debe configurar el package.json con los parametros deseados para desplegar en un ambiente real de AWS.


 
# Autor

[Jonathan Reyna Rossel](https://github.com/jhonlpjr) 

> I love CODE
