import React from 'react';
import Navigation from '../components/Navigation';
import { Jumbotron, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EditProduct extends React.Component {
  
  constructor(props){
  	super(props);
  		this.state = {
		  	product_name : " ",
		  	description:" ",
		  	price:" ",
		  	image:" ",
		  	sku:" ",
		  	redirect: false,
		  	id: this.props.match.params.id
		}
	  	
  }
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/productdb' />
    }
  }

  componentDidMount(){
  let id = this.props.match.params.id;
  axios.get(`http://localhost:3000/productdetail/${id}`)
  .then((response) => {
    console.log(response.data.data[0], "dattt");
    this.setState({
      	product_name : response.data.data[0].product_name,
		description:response.data.data[0].description,
		price:response.data.data[0].price,
		image:response.data.data[0].image,
		sku:response.data.data[0].sku,
    });
  });
 }

  UpdateProduct = event => {
		  	event.preventDefault();
		  	const data = new FormData()
  			data.append('file', this.state.image);
  			console.log(data,"dat");
			  axios.put(`http://localhost:3000/update_product/${this.state.id}`, {
			  product_name: this.state.product_name,
			  description: this.state.description,
			  price: this.state.price,
			  image: this.state.image,
			  sku: this.state.sku
			  })
			  .then(function (response) {
			    console.log(response);
            this.setState({
            redirect:true 
            })
			  }.bind(this))
			  .catch(function (error) {
			    console.log(error);
			  });
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
  	console.log(this.state, "sdf");
    return(
    	<div>

    	<Navigation />
    	<h1 className="text-header">Update Product</h1>
    	<hr className="my-2" />
    	<Jumbotron className="product-wrap">

    		<form onSubmit={this.UpdateProduct}>
		        <FormGroup>
		          <Label>Product's Name</Label>
		          <Input type="text" name="product_name" value={this.state.product_name} placeholder="Product's Name" onChange={this.getTheValue} />

		          <Label>Description</Label>
		          <Input type="text" name="description" value={this.state.description} placeholder="Product's Description" onChange={this.getTheValue} />

		          <Label>Price</Label>
		          <Input type="number" name="price" value={this.state.price} placeholder="Price"  onChange={this.getTheValue} />

		          <Label>URL Image</Label>
		          <Input type="text" name="image" value={this.state.image} onChange={this.getTheValue} />
		          <Label>SKU</Label>
		          <Input type="text" name="sku" value={this.state.sku} placeholder="SKU" onChange={this.getTheValue} />
		        </FormGroup>
		        {this.renderRedirect()}
		        <Button>Edit</Button>
        	</form>

    	</Jumbotron>
    	</div>
    	);
  }
}
export default EditProduct