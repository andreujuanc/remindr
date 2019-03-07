docker run^
    --rm^
    -it^
    --env-file ./.env^
    -v  ~\source\repos\andreujuanc\remindr\infrastructure\src:/infrasourceTMP^
    andreujuanc/pulumi-azure-tools:latest^
    /bin/bash -c "export KUBECONFIG=/infrasourceTMP/kubeconfig.yaml&& bash"