REM THIS IS FOR WINDOWS, NOT SO HARD TO PORT TO LINUX/MAC
(docker run -i --env-file ./.env  andreujuanc/pulumi-azure-tools:latest  /bin/bash -c "bash ") < resources.infra