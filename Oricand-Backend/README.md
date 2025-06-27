# ORICÂND – Coffee E-Commerce Backend

A comprehensive, full-stack e-commerce platform for premium coffee drops, built as part of a Bachelor's degree project in Computer Engineering. This backend provides a robust foundation for managing coffee products, user authentication, order processing, and community features like voting campaigns.

---

## Project Overview

**Oricând** (meaning "Anytime" in Romanian) is a modern e-commerce platform that specializes in limited-edition coffee drops. The platform features user authentication, product management, shopping cart functionality, order processing, loyalty programs, and community voting systems.

### Key Features
- **User Management**: Registration, authentication, profile management, and password reset
- **Product Catalogue**: Product creation, attribute management, image handling, and filtering/sorting
- **Shopping Experience**: Cart management, guest user support, and seamless checkout
- **Order Processing**: Order creation, status tracking, and history management
- **Loyalty Program**: Points system, status upgrades, and exclusive benefits
- **Community Features**: Voting campaigns for upcoming coffee drops
- **Admin Panel**: Management interface for all platform features
- **Email Notifications**: Automated emails for orders, password resets, and contact forms

---

## Technology Stack

### Backend
- **Java 17** - Modern Java features and performance
- **Spring Boot 3.3.1** - Rapid application development framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database abstraction and ORM
- **PostgreSQL** - Relational database
- **MapStruct** - Type-safe object mapping
- **JWT** - Stateless authentication tokens
- **BCrypt** - Password hashing
- **JavaMail** - Email functionality

### Development Tools
- **Gradle** - Build automation
- **Docker** - Containerized database
- **IntelliJ IDEA** - IDE (recommended)
- **Postman** - API testing

---

## Project Architecture

The project follows a **layered architecture** with **package-by-feature** organization:

```
src/main/java/dd/projects/demo/
├── auth/                     # Authentication & authorization
│   ├── AuthController.java
│   ├── AuthService.java
│   ├── RefreshToken.java
│   └── RefreshTokenService.java
├── user/                     # User management
│   ├── User.java
│   ├── UserController.java
│   ├── UserService.java
│   └── PasswordResetService.java
├── product/                  # Product catalog
│   ├── Product.java
│   ├── ProductController.java
│   ├── ProductService.java
│   └── image/               # Product images
├── cart/                     # Shopping cart
│   ├── Cart.java
│   ├── CartController.java
│   └── CartService.java
├── order/                    # Order processing
│   ├── Order.java
│   ├── OrderController.java
│   └── OrderService.java
├── category/                 # Product categories
├── attribute/                # Product attributes
├── loyalty/                  # Loyalty program
├── voting/                   # Community voting
├── contact/                  # Contact form handling
├── email/                    # Email notifications
├── address/                  # Address management
└── security/                 # Security configuration
```

---

## Quick Start

### Prerequisites
- Java 17 or higher
- PostgreSQL 12 or higher
- Docker (optional, for containerized database)
- Gradle 7.0 or higher

### 1. Database Setup

#### Option A: Docker (Recommended)
```bash
# Start PostgreSQL container
docker run --name oricand-db \
  -e POSTGRES_DB=oricand-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=devpassword \
  -p 5432:5432 \
  -d postgres:latest
```

#### Option B: Local PostgreSQL
1. Install PostgreSQL
2. Create database: `oricand-db`
3. Create user: `postgres` with password: `devpassword`

### 2. Environment Configuration

Create `application.properties` or set environment variables:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/oricand-db
spring.datasource.username=postgres
spring.datasource.password=devpassword

# JWT Configuration
jwt.secret=YOUR_SUPER_SECRET_KEY_CHANGE_IN_PRODUCTION
jwt.access-token-expiration=900000
jwt.refresh-token-expiration=604800000

# Email Configuration (Gmail)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# File Upload
spring.servlet.multipart.max-file-size=200MB
spring.servlet.multipart.max-request-size=250MB
```

### 3. Build and Run

```bash
# Clone the repository
git clone https://github.com/pseudocod/Oricand-Full-Stack-Project.git
cd Oricand-Backend

# Build the project
./gradlew build

# Run the application
./gradlew bootRun
```

The application will start on `http://localhost:8080`

## Authentication & Security

### JWT Token System
- **Access Tokens**: Short-lived (15 minutes) for API requests
- **Refresh Tokens**: Long-lived (7 days) for token renewal
- **Token Storage**: Secure database storage with automatic cleanup

### Role-Based Access Control
- **ROLE_USER**: Regular customers
- **ROLE_ADMIN**: Administrative users with full access

### Security Features
- BCrypt password hashing
- CORS configuration

---

## API Endpoints

### Authentication
```
POST /auth/register          # User registration
POST /auth/login            # User login
POST /auth/refresh          # Token refresh
POST /auth/logout           # User logout
POST /auth/logout-all       # Logout from all devices
```

### User Management
```
GET    /api/users/me                    # Get current user
PUT    /api/users/me                    # Update profile
PUT    /api/users/me/password           # Change password
PATCH  /api/users/me/default-delivery-address/{id}
PATCH  /api/users/me/default-billing-address/{id}
```

### Products
```
GET    /api/products                    # List all products
GET    /api/products/{id}               # Get product details
GET    /api/products/category/{id}      # Products by category
GET    /api/products/featured           # Featured products
POST   /api/products                    # Create product (admin)
PUT    /api/products/{id}               # Update product (admin)
DELETE /api/products/{id}               # Delete product (admin)
```

### Cart & Orders
```
GET    /api/cart/me                     # Get user cart
POST   /api/cart/entries                # Add to cart
PUT    /api/cart/entries/{id}           # Update cart entry
DELETE /api/cart/entries/{id}           # Remove from cart
POST   /api/orders                      # Place order
GET    /api/orders                      # Get user orders
POST   /api/orders/guest                # Guest order
```

### Loyalty Program
```
GET    /api/loyalty/my-card             # Get loyalty card
GET    /api/loyalty/discount            # Get discount percentage
GET    /api/loyalty/can-vote            # Check voting eligibility
```

### Voting System
```
GET    /api/voting/current              # Get active campaign
POST   /api/voting/vote                 # Submit vote
GET    /api/voting/eligibility          # Check eligibility
```

### Admin Endpoints
```
GET    /api/admin/orders                # All orders (admin)
PUT    /api/admin/orders/{id}/status    # Update order status (admin)
GET    /api/admin/contact-messages      # Contact messages (admin)
PUT    /api/admin/contact-messages/{id} # Update message status (admin)
```
---

## Email Templates

The application uses HTML email templates located in `src/main/resources/templates/email/`:

- `welcome.html` - New user welcome email
- `order-confirmation.html` - Order confirmation
- `forgot-password.html` - Password reset
- `contact-confirmation.html` - Contact form confirmation
- `contact-notification.html` - Admin notification

---

##  Configuration

### Database Configuration
```properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### File Upload Configuration
```properties
spring.servlet.multipart.max-file-size=200MB
spring.servlet.multipart.max-request-size=250MB
spring.web.resources.static-locations=classpath:/static/,file:uploads/
```

### CORS Configuration
Configured for frontend development on `http://localhost:5173`

---

## Documentation

This project is part of a Bachelor's degree thesis and includes:

- **System Architecture**: Layered design with clean separation of concerns
- **Database Design**: Entity relationships and data modeling
- **Security Model**: Authentication, authorization, and data protection
- **API Documentation**: Complete endpoint documentation
- **Frontend Integration**: React-based admin panel and user interface

---

## Author

- **Name**: Vlad Mocan
- **Institution**: Polytehnics University of Timisoara
- **Degree**: Bachelor's in Computer and Technology Information, English
- **Year**: 2025
- **Project**: E-Commerce Platform for Premium Coffee Drops

---
