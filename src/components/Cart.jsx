import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { FaBackward } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Atom, Slab } from 'react-loading-indicators';
import './Cart.css'
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

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ fetch cart function with useCallback
  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
      alert("Please login first");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]); // ✅ safe: fetchCart is memoized with useCallback

  const removeFromCart = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("❌ Error removing cart item:", err);
      setError("Failed to remove item. Try again.");
    }
  };

const buyCart = async () => {
  try {
    await api.post("/cart/send-email", {}); // send empty object
    alert("Cart ordered! We will contact you soon.");
    setCart([]);
  } catch (err) {
    console.error("❌ Email request failed:", err);
    alert("Failed to send email.");
  }
};


  if (isLoading) {
    return (
      <div className="loading-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', backgroundColor: 'black' }}>
        <Atom color="#32cd32" size="xlarge" text="Loading" textColor="#32cd32" />
      </div>
    );
  }

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="no-products">
        <Slab color="#49cc31" size="large" text="No Products Available" textColor="#ff0000" />
      </div>
    );
  }

  return (
    <div className='Cart-Container'>
      <div className="back-btn-wrapper">
        <Button className='back-button' onClick={() => navigate('/products')}>
          <FaBackward /> Back
        </Button>
      </div>
       {isLoading &&
    
      <div className="loading-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', backgroundColor: 'black' }}>
        <Atom color="#32cd32" size="xlarge" text="Loading" textColor="#32cd32" />
      </div>
  }

      <div className="products-display">
        {cart.map((product) => (
          <Card key={product.id} style={{ width: '18rem', margin: '1rem' }} className='card-product'>
            <Card.Img variant="top" src={product.product.imageUrl} alt={product.product.title} />
            <Card.Body>
              <Card.Title>{product.product.title}</Card.Title>
              <Card.Text>{product.product.description}</Card.Text>
              <Button variant="danger" onClick={() => removeFromCart(product.id)}>
                Remove
              </Button>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>₹ {product.product.price.toFixed(2)}</ListGroup.Item>
              <ListGroup.Item>{renderStars(product.product.rating)} ({product.product.rating.toFixed(1)})</ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </div>

      <Button variant="success" className="buy-cart-btn" onClick={buyCart}>
  Buy Cart
</Button>

      {error && <div className="error-message">Error: {error}</div>}
    </div>
  );
};

export default Cart;
