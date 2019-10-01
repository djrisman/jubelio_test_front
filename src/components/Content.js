import React, {Component} from 'react';
import { Jumbotron, Button, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import '../assets/css/style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { observer } from "mobx-react";

class Content extends Component {

	 constructor(props) {
	    super(props);
	    this.state = {
	      data : [],
	    };
	  }


	componentDidMount(){
	  axios.get('http://localhost:3000/productlist')
	  .then((response) => {
	    console.log(response.data.data, "dat1");
	    this.setState({
	      data : response.data.data
	    });
	    console.log(this.state.data, "dat2")
	    this.getProduct(this.state.data);
	  });

	}

	getProduct = (data) => {
    this.props.store.getProduct(data)
  	}

	DeleteProduct (id){
		
			axios.delete(`http://localhost:3000/delete_product/${id}`)
			  .then(function (response) {
			    console.log(response);
			  })
			  .catch(function (error) {
			    console.log(error);
			});

		window.location.reload();
	}

	render(){
    	console.log(this.props.store.product[0], "niii2");
		return(
			<div>
				 <div className="header">
				 <h3 className="display-3">List Products</h3> <Link className="link" to="/addproduct">Add New Product</Link>
			     </div>
			     <hr className="my-2" />
				<Jumbotron className="product-wrap">
			        
			   	{this.props.store.product.map((list, index) => {
                return <Card key ={index} className="card">
				        <CardImg top width="100%" src={list.image} alt="Card image cap" />
				        <CardBody>
				          <CardTitle>Product Name: {list.product_name}</CardTitle>
				          <CardSubtitle>Price : {list.price} | SKU : {list.sku}</CardSubtitle>
				          <CardText>Description : {list.description}</CardText>
				        <Link className="link" to={location => `${location.pathname}editproduct/${list.id}`} >
						  Edit Product</Link>
						 <Button className="link" onClick={() => this.DeleteProduct(`${list.id}`)}>Delete Product</Button>
				        </CardBody>
				      	</Card>
           		})}


			       
		      	</Jumbotron>
			</div>

		);
	}

}

Content = observer(Content);

export default Content;