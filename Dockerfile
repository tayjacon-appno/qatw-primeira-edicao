FROM mcr.microsoft.com/playwright:v1.55.0-noble

RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    openjdk-21-jdk \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Detecta o JAVA_HOME automaticamente
RUN export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java)))) \
    && echo "JAVA_HOME=$JAVA_HOME" >> /etc/environment \
    && echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> /etc/profile

ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Só pra validar durante o build
RUN java -version && echo "JAVA_HOME is set to $JAVA_HOME"
