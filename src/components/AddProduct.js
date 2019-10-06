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

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/productdb' />
    }
  }
  
  addNewProduct (event) {
	event.preventDefault();
	axios.post('http://localhost:3000/add_product', {
				  		  product_name: this.state.product_name,
						  description: this.state.description,
						  price: this.state.price,
						  image: this.state.image,
						  sku: this.state.sku
				  	})
			  .then(function (response) {
			  	console.log(response);
			    this.setState({
					  	redirect: true
				});
			  }.bind(this))
			  .catch(function (error) {
			    console.log(error);
			  });

  }


  addProductStore = (data) => {
  	if(!data){
		throw this.getError("no data is inserted!");
	}
  	this.props.store.addProduct(data)
  }

  getError = (err) => {
  	console.log(err);
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

    		<form onSubmit={this.addNewProduct.bind(this)}>
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
		        {this.renderRedirect()}
		        <Button>Add</Button>
        	</form>

    	</Jumbotron>
    	</div>
    	);
  }
}

AddProduct = observer(AddProduct);

export default AddProduct