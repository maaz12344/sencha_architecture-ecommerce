
FROM node:20-bookworm AS builder

# Install Java 17
RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless && \
    rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN node --version && java -version

RUN npm run build
