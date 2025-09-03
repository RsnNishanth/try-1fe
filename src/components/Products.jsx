import React from 'react';
import './Products.css';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { IoCartSharp } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa6";
import api from "../api.js";
import useFetch from './Fetch/UseFetch';
import { Atom, Slab } from 'react-loading-indicators';

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

const Products = () => {
  const navigate = useNavigate();

  const { products, error, isLoading } = useFetch("https://try-1-bi0l.onrender.com/products");

const addToCart = async (product) => {
  try {
    await api.post("/cartpost", { productId: product.id, quantity: 1 });
    alert("Added to cart!");
  } catch (err) {
    console.log(err);
    alert("Login first");
    navigate("/login");
  }
};


  const handleLogout = async () => {
    try {
      await api.post("/logout");
      alert("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  if (isLoading) {
    return (
      <div className="loading-wrapper" style={{
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', width: '100vw', height: '100vh', backgroundColor: 'black'
      }}>
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
    <div className="product-container">
      {/* CATEGORY NAV */}
      <div className="links-wrapper">
        <Link to="/watch" className="a">Watch</Link>
        <Link to="/shoe" className="a">Shoe</Link>
        <Link to="/health" className="a">Health</Link>
        <Link to="/books" className="a">Books</Link>
        <Link to="/grocery" className="a">Grocery</Link>

        <div className='log-cart' style={{
          gap: '1.5rem', right: '1rem',
          position: 'absolute', display: 'flex', alignItems: 'center'
        }}>
          <Button onClick={() => navigate('/cart')}><IoCartSharp /></Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
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
  );
};

export default Products;
