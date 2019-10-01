import React, {Component} from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import Content from './components/Content';
import appStore from './store/Store';
import { autorun, observable, computed, action, decorate } from "mobx";
import { observer } from "mobx-react";

const App	= observer(class App extends Component {

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
