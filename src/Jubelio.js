import React, {Component} from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import Content from './components/Content';
import appStore from './store/Store';
import { autorun, observable, computed, action, decorate } from "mobx";
import { observer } from "mobx-react";

const App	= observer(class App extends Component {
  componentDidMount(){
	  axios.get('http://api.elevenia.co.id/rest/prodservices/product/listing', {
		 headers: {
		    openapikey: '721407f393e84a28593374cc2b347a98'
		 }
	  })
	  .then((response) => {
	    console.log("dattt");
	  });

  }

  render(){
  	
  	console.log(appStore, "aps");
      return (
        <div>
          <Navigation />
          <Content store={appStore} />  
        </div> 
      );
  }
 
})


export default App;
