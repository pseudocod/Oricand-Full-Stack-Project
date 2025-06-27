# Oricând Frontend - E-commerce Coffee Platform

A modern, cinematic React-based e-commerce platform for Oricând, a mood-driven coffee brand. This frontend application provides features like themed product drops, loyalty programs, voting systems and  admin management.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [API Integration](#api-integration)

## Project Overview

Oricând is a sophisticated e-commerce platform that transforms coffee shopping into a cinematic, mood-driven experience. The platform features:

- **Themed Product Drops**: Each coffee collection has its own visual identity and story
- **Loyalty Program**: Points-based system with exclusive voting privileges
- **Admin Dashboard**: Comprehensive management system for products, orders, and campaigns
- **Responsive Design**: Seamless experience across all devices
- **Modern UI/UX**: Bold typography, smooth animations, and immersive visuals

## Features

### Customer Features
- **Cinematic Homepage**: Scroll-based layout with background videos and bold typography
- **Product Discovery**: Browse full catalog or explore themed drops
- **Product Details**: High-quality imagery, descriptions, and attribute selection
- **Shopping Cart**: Real-time updates and persistent cart across sessions
- **Checkout System**: Guest and registered user flows with address management
- **User Profiles**: Personal information, order history, and loyalty tracking
- **Voting System**: Loyal customers can vote on future product drops

### Admin Features
- **Product Management**: Create, edit, and organize products with attributes
- **Category/Drop Management**: Create themed collections with custom visuals
- **Order Management**: Process orders, update statuses, and view analytics
- **Voting Campaigns**: Create and manage community voting sessions
- **User Management**: View customer data and loyalty information

## 🛠 Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7
- **Routing**: React Router DOM 7.6.0
- **Animations**: Framer Motion 12.15.0
- **HTTP Client**: Axios 1.9.0
- **State Management**: React Context API
- **UI Components**: Custom components with Heroicons
- **Development**: ESLint, Hot Reload

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **Git** for version control
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/pseudocod/Oricand-Full-Stack-Project.git
cd Oricand-Frontend-V2
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the project root:

```bash
# Create environment file
touch .env
```

Add the following environment variables to your `.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:8080/api
VITE_MEDIA_URL=http://localhost:8080
```

**Environment Variables Explained:**
- `VITE_API_URL`: Base URL for all API requests (backend endpoint)
- `VITE_MEDIA_URL`: Base URL for serving images, videos, and other media files

### Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

```bash
# Start development server
npm run dev
```

### Development Workflow

1. **Start the development server**: `npm run dev`
2. **Make changes** to your code
3. **View changes** in real-time

##  Key Components

### Authentication System
- JWT-based authentication with refresh tokens
- Protected routes for user-specific content
- Role-based access control for admin features
- Password reset functionality

### Shopping Cart
- Persistent cart across browser sessions
- Real-time updates and quantity management
- Guest and registered user cart merging
- Secure checkout process

### Product Management
- Product filtering and sorting
- Category-based product organization
- Attribute-based product specifications
- High-quality image galleries

### Admin Dashboard
- Product management
- Order processing and status updates
- Category and drop creation
- Voting campaign management

##  API Integration

The frontend communicates with the backend through RESTful APIs:

- **Authentication**: Login, registration, password reset
- **Products**: Fetch, filter and manage products
- **Orders**: Create, view, and manage orders
- **Users**: Profile management and loyalty tracking
- **Admin**: Product, category, voting, order management

All API calls are handled through dedicated service modules in the `src/services/` directory.

##  Author

**Vlad-Andrei Mocan** - Bachelor's Degree Project
- GitHub: [@pseudocod](https://github.com/pseudocod)

**Oricând Frontend** - Where coffee meets cinematic experience
