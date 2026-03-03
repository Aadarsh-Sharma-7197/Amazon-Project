# Amazon Project

This repository contains a simple e-commerce web application inspired by Amazon. It consists of a front-end built with HTML, CSS, and JavaScript along with supporting data files and tests. The goal is to simulate basic shopping workflow including browsing products, adding items to cart, checking out, viewing orders, and tracking shipments.

## Project Structure

```
amazon.html             # Home page for browsing products
checkout.html           # Checkout page with order and payment summary
orders.html             # Page showing user orders
tracking.html           # Page for tracking shipment

backend/
  products.json         # Sample product data used by front-end scripts

data/                   # JavaScript modules for handling application logic
  cart-class.js
  cart-oop.js
  cart.js
  deliveryOptions.js
  orders.js
  products.js
  tracking.js

images/                 # Assets for the UI (icons, product images, ratings, etc.)

scripts/                # Custom JavaScript for different pages
  amazon.js
  checkout.js
  checkout/
    OrderSummary.js
    PaymentSummary.js
  utils/
    money.js

styles/                 # CSS styles organized by page and shared components
  pages/
    amazon.css
    orders.css
    tracking.css
    checkout/
      checkout-header.css
      checkout.css
  shared/
    amazon-header.css
    general.css

tests/                  # Jasmine tests for utility functions
  moneyTest.js
  tests.html            # Runner for tests
  lib/                  # Jasmine library files
    jasmine-5.1.1/
      boot0.js
      boot1.js
      jasmine-html.js
      jasmine.css
      jasmine.js
  MIT.LICENSE
```

## Features

- Browse products using `amazon.html` powered by `amazon.js` and `products.json` data.
- Add, update, and remove items from shopping cart.
- Checkout flow with order and payment summary on `checkout.html`.
- View past orders on `orders.html` and track shipments on `tracking.html`.
- Basic client-side validation and price formatting utilities (`money.js`).

## Technologies

- **HTML5 & CSS3** for structure and styling.
- **Vanilla JavaScript** for dynamic behavior.
- **Jasmine** for unit testing utility functions.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Amazon-Project.git
   ```
2. Open `amazon.html` in a web browser to start using the application.
3. Run tests by opening `tests/tests.html` in a browser.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for enhancements or bug fixes.

