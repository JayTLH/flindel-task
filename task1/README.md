# Flindel Task 1
By Jason Huang

To start the app, navigate into into the client folder and run `npm i` then `npm run build`. Afterwards navigate back into the root directory and run `npm i` then `node server.js`. The app will be located http://localhost:5000/.

### Steps

- The first modifications made were to the backend where I created a separate route file for the api where the bulk of the calculations will take place to avoid flooding the server.js with code.
- In the frontend, I created a `getRequest` function to retreive the data from the api which will pass the query to the backend which will respond by providing a result array as data.
- Styling was added to give it a dark mode theme to make it easier on the eyes. Class names follow the BEM naming convention for consistency. Changed the layout to work better for the desktop screen width.
- Settings were added to include addtional eligibility for product returns and modified the backend to accomodate for it.

Comments are left throughout the modified code to explain reasoning.

The task makes use of several additional packages:

- `axios` - as a promised based method to communicate with the server.
- `cors` - to communication from the frontend to backend.
- `node-sass` - for styling purposes.

# Task Overview

Currently this app allow user to enter a transaction id, but will not do anything.

**Task**: You need to display all the products in the transaction that are eligible for return.

Product are eligible to return if

- purchased for less than 30 days
- not on sale when purchased
- is a returnable product

### Important notes

- Explain your assumptions, decisions, code in detail to help us better understand your code
- You can add npm if you want, but please explain why
- You can use the `db` interface which provide the functions (`findTransaction(id)` and `findProduct(id)`) to access the dummy database for this excerise.
- To get the date for "today", use `getCurrentDate()` in `App.js`
- Explain why if you modify any existing code, e.g. `db` functions, the database...etc
- It is important to think about scalability, e.g. how to make your code easy to maintain and add new feature?

Absolutely feel free to make the app better, although it is not neccessary to do more than the task, doing so can help us see your skill with more confidence! The following are a few suggestions but don't let that stop your imagination :)

- Better UI
- Better hierarchy and code design
- Add new/extend features, e.g. what if different company have different policy?

## Run app for testing

1. Start backend by `npm install` and `npm start`
2. Start frontend by go to `client` then `npm install` and `npm start`
3. Go to your browser and type `localhost:3000`, now you can test your work under this domain
