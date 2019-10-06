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
	      products:[],
	      detail_product:[],
	      isLoading: true
	    };
	  }

	componentDidMount(){

	  axios.get('http://localhost:3000/tesapi')
	  .then((response) => {

	    this.setState({
			      products : response.data,
		});
	  	response.data.map( (v,k)=>{
	  		console.log(response.data[k].prdNo, "prod1");
	  		const detail = this.getDetailProd(v.prdNo);
	  		console.log(detail,"darigetdet");
	  	
	    	response.data[k].detail = detail;
	  	});
	    	
	    console.log(this.state.products, "prod2")
	    console.log(this.state.products[0].detail[0], "prod3")
	    
	  });

	 
	}

	getDetailProd = (id) => {
		var ggg = [];
		//console.log(id, "id prdNo dari map")
	    axios.get(`http://localhost:3000/prod_detail/${id}`)
		  .then((response) => {
		  	ggg[0] = response.data;
		  	
		  this.setDetail(response.data);
	  	});
		
		return ggg
	}

	setDetail = (data) => {
		this.setState({
			detail_product: [...this.state.detail_product, data],
		});

		const newproduct = Object.assign(this.state.products, this.state.detail_product);

		this.setState({
			products: newproduct,
			isLoading: false
		});
	}

	SaveDb (event){
		console.log(this.state.products, "adakah?")
		event.preventDefault();

		this.state.products.map((val,key) => {

			axios.post('http://localhost:3000/add_product', {
						  		  product_name: val.prdNm,
								  description: val.htmlDetail,
								  price: val.selPrc,
								  image: val.prdImage01,
								  sku: val.sellerPrdCd
						  	})
					  .then(function (response) {
					  	console.log(response, "add to db");
					    
					  }.bind(this))
					  .catch(function (error) {
					    console.log(error);
			});

		});
			
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
    	console.log(this.state.detail_product, "detail_product");
    	console.log(this.state.products, "prod4");
		return(
			 this.state.isLoading ? 
			 <div className="loading-wrap">
			     	<img src={require('../assets/images/loading.gif')} />
			 </div> : 
			<div>
				 <div className="header">
				 <h3 className="display-3">List Products from APi</h3> <Button className="link" onClick={this.SaveDb.bind(this)}>Save to Database</Button> <Link className="link" to="/productdb">List Product From Database</Link>
			     </div>
			     <hr className="my-2" />
			     
			     
				<Jumbotron className="product-wrap">

				{this.state.products.map((list, index) => {
                return <Card key ={index} className="card">
				        <CardImg  top width="100%" src={list.prdImage01}  alt="Card image cap" />
				        <CardBody>
				          <CardTitle>Product Name: {list.prdNm}</CardTitle>
				          <CardSubtitle>Price : {list.selPrc} | SKU : {list.sellerPrdCd}</CardSubtitle>
				          <CardText>Description : {list.htmlDetail}</CardText>
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