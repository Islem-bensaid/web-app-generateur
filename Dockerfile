FROM openjdk:17-alpine

EXPOSE 6666

copy ./guru-server/target/guru-server-1.0.0.jar guru-server-1.0.0.jar

ENTRYPOINT [ "java", "-jar", "guru-server-1.0.0.jar"]

 
