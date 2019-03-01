FROM microsoft/azure-cli:latest

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apk update 
RUN apk add  \
      wget \
      libc6-compat \
      openssh-client \
      curl \
      ca-certificates \
      nano 

RUN curl -fsSL https://get.pulumi.com | sh
ENV PATH="$PATH:/root/.pulumi/bin"