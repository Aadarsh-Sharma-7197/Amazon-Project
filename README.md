# Amazon Project

A lightweight, browser-based e-commerce demo that emulates key shopping experiences found on major retail sites. Built entirely with standard web technologies, this project showcases a full client-side workflow—from product browsing to order tracking—without any server backend. It is ideal for learning, experimentation, and as a starting point for more complex applications.

## Project Structure

```
index.html             # Home page for browsing products
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

## Key Features

- **Product catalog** rendered from a local JSON resource (`products.json`).
- **Shopping cart** supporting quantity adjustments and item removal.
- **Checkout experience** with order and payment summaries.
- **Order history** display and **shipment tracking** simulation.
- Utility modules providing formatting and simple validation (e.g. `money.js`).

## Technologies

- **HTML5 & CSS3** for structure and styling.
- **Vanilla JavaScript** for dynamic behavior.
- **Jasmine** for unit testing utility functions.

## Getting Started

1. Clone or download the repository:
   ```bash
   git clone https://github.com/Aadarsh-Sharma-7197/Amazon-Project.git
   ```
2. Navigate to the project directory and open `index.html` in a browser to explore the storefront.
3. To verify functionality, open `tests/tests.html` which runs the included Jasmine suite.

## Contributing

Contributions are appreciated. If you have ideas for improvements or bug fixes, please submit an issue or pull request. This project is a good place to experiment with JavaScript patterns and front-end architecture.
