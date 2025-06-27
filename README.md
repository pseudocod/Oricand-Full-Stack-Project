# Oricând – Full-Stack E-Commerce Platform

**Oricând** (Romanian for _"Anytime"_) is a full-stack e-commerce platform for themed coffee product drops. Built as part of a Bachelor's thesis for Polytehnics University of Timisoara, the project combines a cinematic frontend with a secure, scalable backend. This repository contains both the client and server applications required to run the platform.

The system supports product browsing, shopping carts, authentication, order placement, loyalty tracking and administrative content management.

---

## Repository Structure

```
Oricand-Full-Stack-Project/
├── Oricand-Backend/          # Spring Boot backend
└── Oricand-Frontend-V2/      # React + Vite frontend
```

---

## Technology Stack

### Backend

- Java 17, Spring Boot 3.3.1
- Spring Security, JWT, PostgreSQL
- MapStruct, JavaMail, Docker (for PostgreSQL)

### Frontend

- React 19.1.0, Vite 6.3.5
- Tailwind CSS, Framer Motion
- Axios, React Context API

---

## Setup Instructions

### Prerequisites

- Java 17+
- Node.js 18+ and npm
- PostgreSQL 12+ (or Docker)
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/pseudocod/Oricand-Full-Stack-Project.git
cd Oricand-Full-Stack-Project
```

---

## 2. Backend Setup

### Option A: Start PostgreSQL using Docker

```bash
docker run --name oricand-db \
  -e POSTGRES_DB=oricand-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=devpassword \
  -p 5432:5432 \
  -d postgres:latest
```

### Option B: Set up PostgreSQL manually

1. Open a terminal and enter the PostgreSQL shell:

```bash
psql -U postgres
```

2. Inside the shell, run the following SQL commands:

```sql
CREATE DATABASE "oricand-db";
CREATE USER postgres WITH PASSWORD 'devpassword';
GRANT ALL PRIVILEGES ON DATABASE "oricand-db" TO postgres;
```

3. Exit the shell:

```bash
\q
```

### Configure environment variables

You can either define the following settings directly in `application.properties`, or (recommended) create a `.env` file and use a tool like [spring-dotenv](https://github.com/paulschwarz/spring-dotenv), which the project already includes and declares in `build.gradle`.

Example `.env` file:

```
DB_URL=jdbc:postgresql://localhost:5432/oricand-db
DB_USERNAME=postgres
DB_PASSWORD=devpassword

JWT_SECRET=your-super-secret-key
JWT_ACCESS_EXPIRATION=900000
JWT_REFRESH_EXPIRATION=604800000

GMAIL_USERNAME=oricandcoffee@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
```

Example `application.properties` using these values:

```
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

jwt.secret=${JWT_SECRET}
jwt.access-token-expiration=${JWT_ACCESS_EXPIRATION}
jwt.refresh-token-expiration=${JWT_REFRESH_EXPIRATION}

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${GMAIL_USERNAME}
spring.mail.password=${GMAIL_APP_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

spring.servlet.multipart.max-file-size=200MB
spring.servlet.multipart.max-request-size=250MB
```

> ℹ️ Use [Google App Passwords](https://support.google.com/accounts/answer/185833?hl=en) if 2FA is enabled for the Gmail account.

### Configure `application.properties` directly (without .env):

```
spring.datasource.url=jdbc:postgresql://localhost:5432/oricand-db
spring.datasource.username=postgres
spring.datasource.password=devpassword

jwt.secret=YOUR_SECRET_KEY
jwt.access-token-expiration=900000
jwt.refresh-token-expiration=604800000

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

spring.servlet.multipart.max-file-size=200MB
spring.servlet.multipart.max-request-size=250MB
```

### Run the backend

```bash
cd Oricand-Backend
./gradlew build
./gradlew bootRun
```

App starts at: `http://localhost:8080`

---

## 3. Frontend Setup

```bash
cd Oricand-Frontend-V2
npm install
```

### Configure `.env` file:

```
VITE_API_URL=http://localhost:8080/api
VITE_MEDIA_URL=http://localhost:8080
```

### Run the frontend

```bash
npm run dev
```

App opens at: `http://localhost:5173`

---

## Notes for Testing

- Admin functionality requires login with a user that has `ROLE_ADMIN`. You can register a user normally, then manually update their role in the database using:

  ```sql
  UPDATE users SET role = 'ROLE_ADMIN' WHERE email = 'your-admin-email@example.com';
  ```

- Orders, voting, and loyalty actions require authenticated users
- Guest checkout is also supported

---

## Author

**Name**: Vlad-Andrei Mocan  
**Institution**: Politehnica University of Timișoara  
**Faculty**: Faculty of Automation and Computers  
**Degree**: Bachelor's in Computer and Technology Information, English Section  
**Year**: 2025  
**Project Title**: _Oricând – A Themed E-Commerce Platform for Coffee and Culture_

---

For full documentation, API details or screenshots, please refer to the bachelor’s thesis documentation or the individual backend/frontend folders found in this repository.
