FROM microsoft/azure-cli:latest

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# BASICS 
RUN apk update 
RUN apk add  \
      wget \
      libc6-compat \
      openssh-client \
      curl \
      ca-certificates  \
      nano

RUN apk add nodejs

#PULUMI CLI
RUN curl -fsSL https://get.pulumi.com | sh
ENV PATH="$PATH:/root/.pulumi/bin"

#HELM CLI
RUN curl https://raw.githubusercontent.com/helm/helm/master/scripts/get | sh
RUN helm init --client-only
#RUN helm repo add bitnami https://charts.bitnami.com/bitnami

#Preare node_modules
WORKDIR /infrasource
COPY ./src/package.json .
RUN npm install

WORKDIR /