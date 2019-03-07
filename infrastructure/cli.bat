docker run^
    --rm^
    -it^
    -p 8001:8001^
    --env-file ./.env^
    -v  ~\source\repos\andreujuanc\remindr\infrastructure\src:/infrasourceTMP^
    andreujuanc/pulumi-azure-tools:latest^
    /bin/bash -c "export KUBECONFIG=/infrasourceTMP/kubeconfig.yaml&& bash"