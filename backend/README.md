# Tailoring App Backend - Authentication API

## 🔹 Authentication Overview
This backend provides authentication using **JWT (JSON Web Token)** and **OAuth2 (Google/Auth0)**. It also supports **Role-Based Access Control (RBAC)** for managing different user roles.

---

## **1️⃣ JWT Authentication (Login Required)**

### **🔹 Protected Route**
- **URL:** `GET /protected`
- **Headers:**  
  `Authorization: Bearer <JWT_TOKEN>`
- **Response (Success)**  
  ```json
  {
    "message": "Access granted",
    "user": {
      "id": "user123",
      "email": "test@example.com",
      "role": "user"
    }
  }
  ```
- **Response (Unauthorized)**
  ```json
  { "error": "Unauthorized: Missing or invalid token" }
  ```

---

## **2️⃣ OAuth Authentication (Google)**

### **🔹 Google Login**
- **URL:** `GET /auth/google`
- Redirects to Google OAuth login.

### **🔹 Google Callback**
- **URL:** `GET /auth/google/callback`
- **Response (Success)**  
  ```json
  { "message": "Google Auth successful", "user": { "id": "google123", "email": "test@google.com" } }
  ```

---

## **3️⃣ Role-Based Access Control (RBAC)**
### **🔹 Role Authorization Middleware**

Roles Supported: `admin`, `user`, `tailor`

#### **How to Use RBAC in Your Routes**
- **Example:** Protecting an admin-only route
  ```typescript
  import { authenticateJWT, authorizeRole } from "../core/auth.middleware";

  app.get("/admin", authenticateJWT, authorizeRole("admin"), (req, res) => {
    res.json({ message: "Welcome, Admin!" });
  });
  ```

#### **Expected Responses:**
- ✅ **Admin Access Granted:**
  ```json
  { "message": "Welcome, Admin!" }
  ```
- ❌ **Forbidden (User Not Admin):**
  ```json
  { "error": "Forbidden: Insufficient permissions" }
  ```

---

## **4️⃣ Token Management**

### **🔹 Generate Token (For Testing)**
If needed for testing:
```sh
node -e "console.log(require('jsonwebtoken').sign({ id: 'user123', email: 'test@example.com', role: 'user' }, 'your_secret_key', { expiresIn: '1h' }))"
```
Use this token in the `Authorization` header.

---

## **Security & Best Practices**
✅ Use **HTTPS** in production.  
✅ Implement **token expiration & refresh tokens**.  
✅ Protect **sensitive environment variables** (`.env`).  
✅ Rate limiting applied to prevent **brute-force attacks**.  

---

## **API Reference (For Developers)**
- **`/auth/google`** → Initiates Google OAuth
- **`/auth/google/callback`** → Handles Google OAuth response
- **`/protected`** → Requires JWT authentication
- **`/admin`** → Requires admin role

---


## **1️⃣ Signup (User Registration)**

### **🔹 Endpoint**
`POST /auth/signup`

### **🔹 Request Body**
```json
{
  "email": "user@example.com",
  "password": "Secure@123"
}

### **🔹 Response (Success)**
```json
{
  "message": "User registered successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### **🔹 Response (Errors)**
| Status Code | Message |
|-------------|---------|
| 400 | User already exists |
| 400 | Invalid email format |
| 400 | Password must be at least 8 characters long |

---
## **2️⃣ Login**

### **🔹 Endpoint**
`POST /auth/login`

### **🔹 Request Body**
```json
{
  "email": "user@example.com",
  "password": "Secure@123"
}
```

### **🔹 Response (Success)**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here"
}
```

### **🔹 Response (Errors)**
| Status Code | Message |
|-------------|---------|
| 400 | Invalid credentials |
| 400 | Email and password are required |

---

## **3️⃣ Forgot Password**

### **🔹 Endpoint**
`POST /auth/forgot-password`

### **🔹 Request Body**
```json
{
  "email": "user@example.com"
}
```

### **🔹 Response (Success)**
```json
{
  "message": "Password reset link sent to your email"
}
```

📧 **Email Sent:**
```
Subject: Password Reset Request
Click the link below to reset your password:
http://localhost:5000/api/auth/reset-password/{resetToken}
```

### **🔹 Response (Errors)**
| Status Code | Message |
|-------------|---------|
| 400 | User not found |
| 400 | Email is required |

---

## **4️⃣ Reset Password**

### **🔹 Endpoint**
`POST /auth/reset-password`

### **🔹 Request Body**
```json
{
  "resetToken": "generated-reset-token",
  "newPassword": "NewSecure@123"
}
```

### **🔹 Response (Success)**
```json
{
  "message": "Password has been reset successfully"
}
```

### **🔹 Response (Errors)**
| Status Code | Message |
|-------------|---------|
| 400 | Invalid or expired reset token |
| 400 | Reset token and new password are required |

---

## **5️⃣ JWT Authentication (Protected Route)**

### **🔹 Endpoint**
`GET /protected`

### **🔹 Headers**
```
Authorization: Bearer <JWT_TOKEN>
```

### **🔹 Response (Success)**
```json
{
  "message": "Access granted",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### **🔹 Response (Unauthorized)**
```json
{ "error": "Unauthorized: Missing or invalid token" }
```

---

## **6️⃣ Using Swagger API Docs**
To view the interactive API documentation, start the server and visit:
👉 `http://localhost:5000/api-docs`

---

