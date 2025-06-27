# ☕ ORICAND (Anytime) – Coffee E-Commerce Backend

Oricand is a modern, full-featured backend for an e-commerce platform that sells coffee and related products. Built as
part of a Bachelor's degree project, it emphasizes clean architecture, secure authentication, and scalable domain
modeling.

---

## 🚀 Features

- ✅ User registration, login, and JWT-based authentication
- ✅ Role-based authorization (admin/user)
- ✅ Profile editing and password management
- ✅ Product catalog with attribute filtering (e.g., flavor, roast level)
- ✅ Cart management with quantity tracking and total calculation
- ✅ Order placement and order history
- ✅ Address management with support for default billing/delivery addresses

---

## 🛠️ Technologies Used

- **Java 17**
- **Spring Boot 3**
- **Spring Security**
- **Spring Data JPA (Hibernate)**
- **MapStruct** (for DTO mapping)
- **PostgreSQL**
- **Docker** (for containerized DB)
- **JWT** (stateless authentication)

---

## 📁 Project Structure

```
dd.projects.demo
├── auth/                  # Login, registration, JWT token generation
├── user/                  # User profile, password, address logic
├── product/               # Product entity, filtering, attributes
├── order/                 # Orders and order items
├── cart/                  # Shopping cart and entries
├── attribute/             # Attribute types, values, and selections
├── address/               # Address creation and defaults
├── security/              # JWT filters, context access, password encoding
```

---

## 🔐 Authentication Flow

- On registration or login, a **JWT token** is issued and returned in the response.
- This token must be included in future requests as:

```
Authorization: Bearer <token>
```

- The backend uses this token to associate requests with the current user and authorize access to secured endpoints.

---

## 📦 Domain Highlights

- Products can be customized using **SelectedAttributes** (e.g., coffee flavor, strength).
- Product-to-attribute mapping is done through a `ProductAttribute` join entity.
- Cart is user-specific and supports multiple entries with quantities and dynamic pricing.
- Orders store snapshots of the purchased products, ensuring data consistency over time.

---

## 📄 Example API Endpoints

| Endpoint         | Method | Description                  |
|------------------|--------|------------------------------|
| `/auth/register` | POST   | Register new user            |
| `/auth/login`    | POST   | Login and receive JWT token  |
| `/api/users/me`  | GET    | Get current user profile     |
| `/api/users/me`  | PUT    | Update profile and addresses |
| `/api/products`  | GET    | List all products            |
| `/api/carts/me`  | GET    | View current user's cart     |
| `/api/orders`    | POST   | Place an order from cart     |

---

## 🧪 Testing

- Manual testing supported via IntelliJ `.http` client
- Includes token-based chaining (register → login → update → order)
- CORS, security headers, and HTTP standards respected

---

## 📚 Documentation (in progress)

This project is part of a Bachelor's thesis and will be accompanied by full documentation including:

- System design
- Entity relationships
- Security model
- Deployment setup

---

## ✨ About ORICAND

“Oricand” means “Anytime” in Romanian — a reference to the idea that **anytime is a good time for good coffee**.  
This platform aims to deliver that experience digitally, with a clean, secure, and modern backend foundation.

---

## 🧠 Author

- **Name:** Vlad
- **Role:** Full-Stack Developer & Computer Engineering Student
- **Project:** Bachelor's Degree Thesis – 2025
