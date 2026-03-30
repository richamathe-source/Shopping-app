import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./App.css"
import { Provider } from 'react-redux';
import { store,persistor } from './Redux/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( 

 <Provider store={store}>
    <PersistGate loading={<h3>Loading...</h3>} persistor={persistor}>

      <Elements stripe={stripePromise}>
        <App />
      </Elements>

    </PersistGate>
  </Provider>
    // <Provider store={store}>
    //  <PersistGate loading={<h3>Loading...</h3>} persistor={persistor}>
    //     <App />
    //   </PersistGate>
    // </Provider>

);



