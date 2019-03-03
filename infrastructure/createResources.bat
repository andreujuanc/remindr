REM THIS IS FOR WINDOWS, NOT SO HARD TO PORT TO LINUX/MAC
REM https://github.com/docker/cli/pull/1273 
(docker run^
    -i^
    --rm^
    --env-file ./.env^
    -v  ~\source\repos\andreujuanc\remindr\infrastructure\src:/infrasourceTMP^
    andreujuanc/pulumi-azure-tools:latest  /bin/bash -c "bash ") < createResources.commands