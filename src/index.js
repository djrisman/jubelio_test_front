import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jubelio from './Jubelio';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ContentDb from './components/ContentDb';
import appStore from './store/Store';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Jubelio} />
      
      <Route path="/addproduct" render={(props) => <AddProduct store={appStore} {...props} />} />
      <Route path="/editproduct/:id" component={EditProduct} />
      <Route path="/productdb" render={(props) => <ContentDb store={appStore} {...props} />} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
