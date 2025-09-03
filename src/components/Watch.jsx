import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { FaBackward } from "react-icons/fa6";
import './Watch.css'
import { useNavigate } from 'react-router-dom';
import useFetch from './Fetch/UseFetch';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Atom, Slab } from 'react-loading-indicators';
import api from "../api.js";


const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {"★".repeat(fullStars)}
      {halfStar && "☆"}
      {"☆".repeat(emptyStars)}
    </>
  );
};



const Watch = () => {
   const navigate = useNavigate();
  let { products, error, isLoading } = useFetch("https://try-1-bi0l.onrender.com/products/watch");
  const addToCart = async (product) => {
    try {
      await api.post(
        "/cartpost",
        { productId: product.id, quantity: 1 },
        { withCredentials: true }   // 👈 must be here if not global
      );
      alert("Added to cart!");
    } catch (err) {
      console.log("❌ Add to cart error:", err);
      alert("Please login first");
      navigate("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="loading-wrapper" style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100vw',height:'100vh',backgroundColor:'black'}}>
        <Atom color="#32cd32" size="xlarge" text="Loading" textColor="#32cd32" />
      </div>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="no-products">
        <Slab color="#49cc31" size="large" text="No Products Available" textColor="#ff0000" />
      </div>
    );
  }

    return (
    <div className='Book-Container'>
      {/* Back Button */}
      <div className="back-btn-wrapper">
        <Button className='back-button' onClick={() => navigate('/products')}>
          <FaBackward /> Back
        </Button>
      </div>

      {/* Products Display */}
      <div className="products-display">
        {products.map((product) => (
          <Card key={product.id} style={{ width: '18rem', margin: '1rem' }} className='card-product'>
            <Card.Img variant="top" src={product.imageUrl} alt={product.title} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>₹ {product.price.toFixed(2)}</ListGroup.Item>
              <ListGroup.Item>
                {renderStars(product.rating)} ({product.rating.toFixed(1)})
              </ListGroup.Item>
              <ListGroup.Item style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className="ad-btn" onClick={() => addToCart(product)}>
                  <FaCartPlus /> Add
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </div>

      {error && <div className="error-message">Error: {error}</div>}
    </div>
  )
}

export default Watch
