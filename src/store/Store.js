import {observable, decorate, action} from 'mobx';
import axios from 'axios';
import React, {Component} from 'react';

class Store {
  
  product = []

  NewProduct = []

  getProduct(e){
  	this.product = [...e]
  }

  addProduct(data){
  	console.log(data[0],"axio");
  	axios.post('http://localhost:3000/add_product', data[0])
			  .then(function (response) {
			    console.log(response);
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
  	this.NewProduct = [...data]
  }

}

decorate(Store, {
  product: observable,
  NewProduct: observable,
  getProduct: action,
  addProduct: action
})

const appStore = new Store()


export default appStore;