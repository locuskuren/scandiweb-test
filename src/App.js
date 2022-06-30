import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import ProductListingPage from './pages/ProductListingPage/ProductListingPage';
import BadRoute from './components/BadRoute/BadRoute';
import Cart from './pages/Cart/Cart';

export class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact index path="/">
            <ProductListingPage />
          </Route>
          <Route path="/product/:id">
            <ProductDetailsPage />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/:id">
            <ProductListingPage />
          </Route>
          <Route path="*">
            <BadRoute />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
