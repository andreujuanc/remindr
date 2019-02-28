FROM debian:jessie

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ENV AZURE_CLI_VERSION "0.10.13"
ENV NODEJS_APT_ROOT "node_6.x"
ENV NODEJS_VERSION "6.10.0"

RUN apt-get update -qq && \
    apt-get install -qqy --no-install-recommends\
      openssh-client \
      apt-transport-https \
      build-essential \
      curl \
      ca-certificates \
      git \
      lsb-release \
      python-all \
      rlwrap \
      vim \
      nano \
      jq 


RUN curl -L https://aka.ms/InstallAzureCli | bash
RUN curl -fsSL https://get.pulumi.com | sh
ENV EDITOR vim