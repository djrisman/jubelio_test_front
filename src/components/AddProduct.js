import React from 'react';
import Navigation from '../components/Navigation';
import { Jumbotron, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { observer } from "mobx-react";

class AddProduct extends React.Component {
  
  constructor(props){
  	super(props);
  		this.state = {
		  	product_name : " ",
		  	description:" ",
		  	price:" ",
		  	image:" ",
		  	sku:" ",
		  	redirect: false,
		  	data:[]
		}
	  	
  }


  
  addNewProduct = event => {
	event.preventDefault();

	this.addProductStore([{
				  		  product_name: this.state.product_name,
						  description: this.state.description,
						  price: this.state.price,
						  image: this.state.image,
						  sku: this.state.sku
				  	}]);
	this.setState({
			product_name : " ",
		  	description:" ",
		  	price:" ",
		  	image:" ",
		  	sku:" ",
	});
  }

  addProductStore = (data) => {
  	this.props.store.addProduct(data)
  }


  getTheValue = event => {
  	const target = event.target;
  	const name = target.name;
  	const value = target.value;
  	this.setState({
  		[name]: value
  	});
  	console.log([name], value, "inini");
  }

  getTheFile = event => {
  	const target = event.target;
  	const files = target.files;
  	this.setState({
  		image: files[0],
  	});
  	console.log(files[0]);
  	//console.log(files[0], "file");
  }

 
  render() {
    return(
    	<div>

    	<Navigation />
    	<h1 className="text-header">Add Product</h1>
    	<hr className="my-2" />
    	<Jumbotron className="product-wrap">

    		<form onSubmit={this.addNewProduct}>
		        <FormGroup>
		          <Label>Product's Name</Label>
		          <Input type="text" name="product_name" value={this.state.product_name} placeholder="Product's Name" onChange={this.getTheValue} />

		          <Label>Description</Label>
		          <Input type="text" name="description" value={this.state.description} placeholder="Product's Description" onChange={this.getTheValue} />

		          <Label>Price</Label>
		          <Input type="number" name="price" value={this.state.price} placeholder="Price"  onChange={this.getTheValue} />

		          <Label>URL Image</Label>
		          <Input type="text" name="image" onChange={this.getTheValue} />
		          <Label>SKU</Label>
		          <Input type="text" name="sku" value={this.state.sku} placeholder="SKU" onChange={this.getTheValue} />
		        </FormGroup>
		        
		        <Input type="submit" value="Add" />
        	</form>

    	</Jumbotron>
    	</div>
    	);
  }
}

AddProduct = observer(AddProduct);

export default AddProduct