# remindr [![Maintainability](https://api.codeclimate.com/v1/badges/2eaf982171034f6d906c/maintainability)](https://codeclimate.com/github/andreujuanc/remindr/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/2eaf982171034f6d906c/test_coverage)](https://codeclimate.com/github/andreujuanc/remindr/test_coverage)
#### As of today, most of the scripts are meant to run in windows. 



### Build Locally	
~~~~ bash
$ cd app/backend
$ docker-compose up --build
~~~~

### Get Azure service principal values
~~~
$ az ad sp list --show-mine --query '[].{"AppName":displayName, "ARM_CLIENT_ID":"appId", "ARM_TENANT_ID":"appOwnerTenantId", "A": homepage}'
$ az ad sp credential reset --name <NAME HERE>
$ az account list
~~~

### Deploy to azure
~~~~ bash
$ cd infrastructure
$ copy .env.template .env #Fill in the variables 
$ buildDocker.bat
$ createResources.bat
$ deployApp.bat
~~~~

# TASK


A basic reminder service that uses:

    - Node.js + Express (or another framework of your choice)
    - Winston
    - Agenda.js (https://github.com/agenda/agenda)
    - MongoDB

 

Accepts a POST request taking a single JSON input:
`{ when: "<ISO_format_string>", event: "<freeform_string>" }`
 

Uses Agenda (using MongoDB) to log the appointments to the console using the Winston logger at both appointment creation time, and at the "when" DateTime.

Deploy it to a Kubernetes cluster (either minikube or a cloud provider - e.g. Azure AKS, GCP container engine, etc.) by using 2 Helm Charts

    - the Node app itself
    - the MongoDB database

## TODO:

    - Add documentation to the code
    - Add unit tests to the code
