import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Animated Rings */}
      <div className="rings-wrapper">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section text-center">
        <Container>
          <h1 className="hero-title">Welcome to RSN TeleMart</h1>
          <p className="hero-subtitle">
            Shop the best deals on watches, shoes, groceries, books, and health essentials.
          </p>
          <div className="auth-buttons">
            <Button
              variant="success"
              size="lg"
              className="me-3"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <Container>
          <h2 className="section-title text-center">Categories Available</h2>
          <Row className="justify-content-center">
            {[
              { name: "Watches", path: "watch", desc: "Premium and stylish watches for every occasion." },
              { name: "Shoes", path: "shoe", desc: "Trendy footwear for sports, casual, and formal wear." },
              { name: "Books", path: "books", desc: "Explore a wide range of books across all genres." },
              { name: "Grocery", path: "grocery", desc: "Fresh groceries and daily essentials delivered fast." },
              { name: "Health", path: "health", desc: "Healthcare and wellness products you can trust." },
            ].map((cat, idx) => (
              <Col key={idx} md={4} sm={6} xs={12} className="mb-4">
                <Card
                  className="category-card"
                >
                  <Card.Body>
                    <Card.Title>{cat.name}</Card.Title>
                    <Card.Text>{cat.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
