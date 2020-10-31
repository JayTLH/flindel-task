// creating a separate route file for different paths of the api
const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.get('/', (req, res) => {
  // assuming that transaction ids and product ids can only be numbers, validate incoming value as number
  const transactionId = Number(req.query.transactionId);
  if (transactionId < 0 || isNaN(transactionId) || req.query.transactionId === '') {
    return res.send({ error: true, message: 'Incorrect value entered.' });
  }

  // retrieve data from frontend
  const { date, returnDaysSettings, onSaleSettings } = req.query

  // locating transaction information in the database
  const transaction = db.findTransaction(transactionId)
  if (transaction) {
    // if transaction exists, send the appropriate response

    // check to see if the return date has expired, have to trim out white space to parse correctly
    const currentDate = Date.parse(date.replace(/\s/g, ''));
    const transactionDate = Date.parse(transaction.transaction_date.replace(/\s/g, ''));
    const differenceInTime = Math.abs(currentDate - transactionDate);
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    // checking to see if the user specified return date settings
    const eligibleDays = returnDaysSettings ? returnDaysSettings : 30;
    if (differenceInDays > eligibleDays) {
      return res.send({ error: true, message: 'Transaction no longer eligible for return.' });
    }

    // locate the products that are eligible for returns
    const products = transaction.prods;
    const result = [];
    products.forEach(product => {
      const productFound = db.findProduct(product.id);
      // if the settings allow for the return of on sale items, handle the result properly
      if (productFound.returnable) {
        if (onSaleSettings) {
          result.push(productFound)
        } else {
          if (!product.onsale) result.push(productFound);
        }
      }
    });

    // return the results found
    if (result.length) {
      return res.send({ result: result, message: 'Successfully found returnable items.' });
    } else {
      return res.send({ error: true, message: 'No returnable items in transaction.' });
    }
  } else {
    // if transaction cannot be found, return an error message
    return res.send({ error: true, message: 'Transaction not found.' });
  }
});

module.exports = router;
