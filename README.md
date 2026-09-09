# Securely Embed Payments in a ReactJS App

This is a JavaScript application that uses the React framework to demonstrate a single-item checkout experience with an embedded payment solution using [North's Embedded Checkout](https://developer.north.com/products/online/embedded-checkout). The application includes a React frontend that securely mounts the checkout form and a separate Node.js/Express backend [`North-Node-Embedded-Checkout-API`](https://github.com/NorthDevelopers/North-Node-Browser-Post-API) to securely generate checkout sessions and verify transaction status.

This application does not include a shopping cart, making it a great fit for businesses that sell one item per transaction, such as utility services or other professional services.

For a React ecommerce application with a shopping cart that allows customers to purchase multiple items at once, head over to [this repository](https://github.com/NorthDevelopers/North-React-Browser-Post-API-With-Shopping-Cart) and follow along with [this tutorial](https://developer.north.com/blog/embedded-payments-react-app-shopping-cart).

## Get Sandbox Credentials

To get started, create a free [North Developer Portal account](https://developer.north.com/register). This will allow you to get the sandbox credentials that are required to test the app. Log in to your account to view the official [Embedded Checkout Integration Guide](https://developer.north.com/products/online/embedded-checkout), then [contact](https://developer.north.com/contact) North's Sales Engineering team to get sandbox credentials added to your Developer Portal account.

## Follow Along with the Tutorial

When you're ready to start building your app, you can follow along with [this tutorial](https://developer.north.com/blog/embedded-payments-react-app) for step-by-step instructions.

## Completed App

Your completed ecommerce app will look similar to the following:

![](/src/assets/payments-hub-react-browser-post-api.png)

Click the "View Details" button to open a product page:

![](/src/assets/payments-hub-react-browser-post-api-product.png)

Click the "Purchase Now" button to open the secure checkout page, where a secure checkout form is embedded directly so customers can enter their payment information and submit an order:

![](/src/assets/payments-hub-react-browser-post-api-checkout.png)
