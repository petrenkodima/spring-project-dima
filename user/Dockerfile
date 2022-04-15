#
# Build stage
#
FROM maven:3.8.5-openjdk-17-slim AS build
COPY settings.xml /usr/share/maven/conf/settings.xml
COPY . /home/app/src
WORKDIR /home/app/src
RUN --mount=type=cache,target=/root/.m2 mvn dependency:go-offline
RUN --mount=type=cache,target=/root/.m2 mvn -pl user clean package

#
# Package stage
#
FROM openjdk:17-slim
RUN mkdir /app
COPY --from=build /home/app/src/user/target/*.jar /app/spring-project-dima.jar
ENTRYPOINT ["java",\
              "-XX:+UseContainerSupport",\
              "-XX:-UseAdaptiveSizePolicy",\
              "-Xmx5120m",\
              "-Xms256m",\
              "-Xss256k",\
              "-Djava.security.egd=file:/dev/./urandom",\
              "-jar",\
              "/app/spring-project-dima.jar"]
