  axios.get(`http://localhost:3000/prod_detail/${}`)
	  .then((response) => {
	    console.log(response.data, "prod1");
	    this.setState({
	      products : response.data
	    });
	    console.log(this.state.products, "prod2")
	  });

<ul>
				{
					this.state.products.map((val, key) => {
					return <li key={key} >{val.prdNm} | {val.htmlDetail}</li>
					})
				}
				</ul>

{this.state.products.map((list, index) => {
                return <Card onLoad={this.loadPic.bind(this)} key ={index} className="card">
				        <CardImg  top width="100%"  alt="Card image cap" />
				        <CardBody>
				          <CardTitle>Product Name: {list.prdNm}</CardTitle>
				          <CardSubtitle>Price : {list.selPrc} | SKU : {list.sellerPrdCd}</CardSubtitle>
				          <CardText>Description : {list.prdNm}</CardText>
				        <Link className="link" to={location => `${location.pathname}editproduct/${list.prdNo}`} >
						  Edit Product</Link>
						 <Button className="link" onClick={() => this.DeleteProduct(`${list.prdNo}`)}>Delete Product</Button>
				        </CardBody>
				      	</Card>
           		})}


{this.state.exp[1].map( (v, k) => {

					return<div>{v.wtf}{v.wth}</div>

					}
				  )
				}


getDetailProd(id){
		axios.get(`http://localhost:3000/prod_detail/${id}`)
		  .then((response) => {
		    
		    this.setState({
		      products : response.data
		    });
		    console.log(this.state.products, "prod2")
		  });
}


 axios.get(`http://localhost:3000/prod_detail/28022257`)
		  .then((response) => {
		  	console.log(response, "res");
	  });

	data.push({"data":response.data});

console.log(this.props.store.product[0], "niii2");


//////////////////////////////////////////

	console.log(response.data, `data axios get with param ${id}`)
		  	this.setState({
		  		exp: [...this.state.exp, response.data],
		  	});

		  	let listProducts = [...this.state.products];

		  	listProducts.map((v,k)=>{
	    		listProducts[k].detail1 = [...this.state.exp, response.data];
	  		});
		  
		  	this.setState({
		  		products: [listProducts]
		  	});