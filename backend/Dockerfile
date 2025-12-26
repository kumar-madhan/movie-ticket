# Use lightweight JDK image
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy and build
COPY pom.xml .
COPY src ./src
RUN ./mvnw -B -DskipTests package

# Expose port and run app
EXPOSE 3001
ENTRYPOINT ["java", "-jar", "target/movie-ticket-backend-1.0.0.jar"]
