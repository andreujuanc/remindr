# remindr

A basic reminder service that uses:

    - Node.js + Express (or another framework of your choice)
    - Winston
    - Agenda.js (https://github.com/agenda/agenda)
    - MongoDB

 

Accepts a POST request taking a single JSON input:
{ when: "<ISO_format_string>", event: "<freeform_string>" }
 

Uses Agenda (using MongoDB) to log the appointments to the console using the Winston logger at both appointment creation time, and at the "when" DateTime.

Deploy it to a Kubernetes cluster (either minikube or a cloud provider - e.g. Azure AKS, GCP container engine, etc.) by using 2 Helm Charts

    - the Node app itself
    - the MongoDB database

## TODO:

    - Add documentation to the code
    - Add unit tests to the code