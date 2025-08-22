FROM openjdk:21-slim AS builder

# Install dependencies
RUN apt-get update && apt-get install -y maven
RUN apt-get update && apt-get install -y curl

WORKDIR /app
COPY . /app

# Build the JAR
RUN mvn package -Dmaven.test.skip=true

EXPOSE 8080
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/target/code-backend-1.0-SNAPSHOT.jar"]