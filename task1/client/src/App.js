// GENERAL INFORMATION IN THE README

// using useState hook to update DOM
import React, { useState } from 'react';
// using BEM class naming convention and sass for styling
import './App.scss';

// importing api methods
import { getRequest } from './api/api';

// importing components
import Product from './components/Product/Product';
import Settings from './components/Settings/Settings';

// Use this function to get Current Date
function getCurrentDate() {
  return "2020-06-20T12:27:40 +04:00"
}

function App() {
  // declaring a state variable to render products
  const [products, setProducts] = useState([]);
  // state variale to toggle settings
  const [settings, setSettings] = useState(false);
  // state variable to trigger animations
  const [productsFade, setProductsFade] = useState(true);
  const [settingsFade, setSettingsFade] = useState(false);

  // event handler for submitting the id
  const submitHandler = (event) => {
    event.preventDefault();
    // creating a query to pass to the server api
    const transactionId = event.target.transactionId.value;
    const returnDaysSettings = event.target.returnDays ? event.target.returnDays.value : null;
    const onSaleSettings = event.target.onSale ? event.target.onSale.value : null;;
    const query = {
      date: getCurrentDate(),
      transactionId,
      returnDaysSettings,
      onSaleSettings
    }

    // triggers the animation to fade out before fading in the new data
    setProductsFade(false)

    // fetching data from the server, setTimeout is only for animations to occur
    setTimeout(() => {
      getRequest(query)
        .then(res => {
          // check to see if the returned result is usuable information
          if (res.data.error) {
            setProducts([res.data])
          } else {
            setProducts(res.data.result)
          }
          // fade in animation
          setProductsFade(true)
        })
        .catch(err => {
          console.error(err)
        });
    }, 100);
  }

  // render the products array or return an error message
  const renderProduct = () => {
    if (products.length) {
      // return the error message if the request was not successful
      if (products[0].error) {
        return <div className={`app_error ${productsFade ? 'fade-in' : 'fade-out'}`}>
          <h2 className="app__error-message">{products[0].message}</h2>
        </div>
      }

      // otherwise return the products
      return products.map((product, index) => {
        return <Product key={`${product.id}${index}`} {...product} animation={productsFade} />
      })
    } else {
      return
    }
  }

  // adding additional settings
  const toggleSettings = (event) => {
    if (settings) {
      // animation for settings, setTimeout for animations to occur
      setSettingsFade(!settingsFade)
      return setTimeout(() => {
        setSettings(!settings)
      }, 100);
    }
    setSettingsFade(!settingsFade)
    return setSettings(!settings)
  }

  // renders addtional settings when event is triggered
  const renderSettings = () => {
    if (settings) {
      return <Settings animation={settingsFade} />
    } else {
      return
    }
  }

  return (
    <div className="app">
      <aside className="app__side-bar">
        <h1 className="app__header">Flindel</h1>
        <h2 className="app__intro">Enter transaction id to check returnable product</h2>
        <form className="app__form" onSubmit={submitHandler}>
          <div className="app__main-input">
            <input
              className="app__input"
              type="text"
              placeholder="Transacion id"
              name="transactionId"
            />
            <button className="app__button">Submit</button>
          </div>
          <p className="app__settings" onClick={toggleSettings}>
            {settings ? "Return policy settings ↑" : "Return policy settings ↓"}
          </p>
          {renderSettings()}
        </form>
      </aside>
      <main className="app__display">
        {renderProduct()}
      </main>
    </div>
  );
}

export default App;
