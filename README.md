# 🛍️ E-Commerce React App (Assignment Project)

A fully responsive e-commerce web application built using **React**, **TypeScript**, **Vite**, **Context API**, and **Cypress** for testing.  
This project includes product listing, product details, cart management, sorting, filtering, accessibility, and complete E2E testing.

---

## 🚀 Live Demo  
🔗 https://ecommerce-app-kappa-gules.vercel.app/

---

## 📦 Features

### 🏠 Home Page
- Responsive product grid  
- Category filters  
- Sorting functionality  
- URL-based filters  
- Accessible UI (`main`, `section`, `aside`, ARIA labels`)

### 🛒 Cart
- Add to cart  
- Increase/decrease quantity  
- Remove product  
- Clear cart  
- Persistent cart using `localStorage`  
- Total price calculation  

### 📄 Product Details Page
- Dynamic routing (`/product/:id`)  
- Product info display  
- Add to cart  
- Accessible image + alt text + ARIA labels  
- Back navigation  

### 🧪 Testing (Cypress)
- Home page tests  
- Product details tests  
- Cart tests  
- Product card tests  

### 🔧 Tech Stack
- React + TypeScript  
- Vite  
- React Router  
- Context API  
- Tailwind CSS  
- Cypress  
- FakeStore API  

---

## 📁 Folder Structure

```md
src/
  components/
    Navbar.tsx
    Footer.tsx
    Product.tsx
    ProductFilters.tsx
    ProductSort.tsx

  context/
    CartContext.tsx

  layout/
    Layout.tsx

  pages/
    Home.tsx
    ProductDetails.tsx
    Cart.tsx

  types/
    index.ts

  utils/
    api.ts

  App.tsx
  main.tsx

cypress/
  e2e/
    home.cy.ts
    cart.cy.ts
    product-details.cy.ts
  fixtures/
  support/

---

## 🛠️ Installation & Setup

Clone the repository:


git clone https://github.com/tiwari786/ecommerce-app.git
cd ecommerce-app

Install dependencies: 
npm install

Running the App (Development): 
npm run dev

Runs the app at:
👉 http://localhost:5173/


## 🏗️ Build for Production
npm run build


## 🧪 Run Cypress Tests

Open Cypress UI:
npx cypress open

Available test files:
home.cy.ts
product-details.cy.ts
cart.cy.ts



## 🌐 Deployment (Vercel)

Push project to GitHub

Go to https://vercel.com

Import your repository

Framework: Vite (Auto-detected)

Build command: npm run build

Output directory: dist 

Deploy 🚀 



## 👤 Author

Vipul Kumar Tiwari
E-commerce React Application with full functionality & Cypress E2E testing.


---

# 🎉 DONE!  