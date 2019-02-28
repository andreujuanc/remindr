REM THIS IS FOR WINDOWS, NOT SO HARD TO PORT TO LINUX/MAC
REM https://github.com/docker/cli/pull/1273 
(docker run -i^
    --env-file ./.env^
    -v  ~\source\repos\andreujuanc\remindr\infrastructure\src:/infrasource^
    andreujuanc/pulumi-azure-tools:latest  /bin/bash -c "bash ") < resources.infra