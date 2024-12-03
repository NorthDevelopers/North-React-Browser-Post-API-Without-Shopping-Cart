# Securely Embed Payments in a ReactJS App

This is a JavaScript application that uses the React framework and Node.js to demonstrate an embedded payment solution with [North's Browser Post API](https://developer.paymentshub.com/products/card-not-present/browser-post). The code in this repository handles the front-end payment process and adds a simple payment form to a website. The code that handles back-end part of the payment process is located in a [separate repository](https://github.com/PaymentsHubDevelopers/PaymentsHub-Node-Browser-Post-API), allowing each to be deployed separately. This application does not include a shopping cart, making it a great fit for businesses that sell one item per transaction, such as utility services or other professional services.

For a React ecommerce application with a shopping cart that allows customers to purchase multiple items at once, head over to [this repository](https://github.com/PaymentsHubDevelopers/PaymentsHub-React-Browser-Post-API-With-Shopping-Cart) and follow along with [this tutorial](https://developer.paymentshub.com/blog/embedded-payments-react-app-shopping-cart).

## Get Sandbox Credentials

To get started, create a free [North Developer Portal account](https://developer.paymentshub.com/auth/signup). This will allow you to get the sandbox credentials that are required to test the app. Log in to your account to view the official [Browser Post API Integration Guide](https://developer.paymentshub.com/products/card-not-present/browser-post/integration), then [contact](https://developer.paymentshub.com/contact) North's Sales Engineering team to get sandbox credentials added to your Developer Portal account.

## Follow Along with the Tutorial

When you're ready to start building your app, you can follow along with [this tutorial](https://developer.paymentshub.com/blog/embedded-payments-react-app) for step-by-step instructions.

## Completed App

Your completed ecommerce app will look similar to the following:

![](/src/assets/payments-hub-react-browser-post-api.png)

Click the "View Details" button to open a product page:

![](/src/assets/payments-hub-react-browser-post-api-product.png)

Click the "Purchase Now" button to open a new tab with a checkout form where customers can enter their payment information and submit an order:

![](/src/assets/payments-hub-react-browser-post-api-checkout.png)
