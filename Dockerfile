# Imagem base playwirght
FROM mcr.microsoft.com/playwright:v1.55.0-noble

# Instala dependências e OpenJDK
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    openjdk-21-jdk \
    && apt-get clean

# Configurando JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"