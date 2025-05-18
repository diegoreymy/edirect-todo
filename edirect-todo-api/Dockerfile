# Etapa de build
FROM openjdk:17-jdk-slim AS build
WORKDIR /app

# 1) Copiamos el Maven Wrapper y el POM
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# 2) Precachear dependencias (go-offline)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# 3) Compilar tests (opcional, valida que todo compile)
RUN ./mvnw test-compile -B

# 4) Copiar el código fuente y empaquetar
COPY src src
RUN ./mvnw package -DskipTests -B

# Etapa de ejecución
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copiar JAR generado
COPY --from=build /app/target/edirect-todo-api-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
