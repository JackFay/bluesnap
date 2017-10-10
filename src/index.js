import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./js/store"


/* Pages */
import Dashboard from './js/pages/Dashboard';

const app = document.getElementById('app');

const Root = () => {
  return(
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Dashboard} />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<Root />, app);
