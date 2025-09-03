import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation } from 'react-router-dom';
import './app.css';

function NavBar() {
  const location = useLocation();

  // Check if current path is "/products"
  const isProductsPage = location.pathname === "/products";

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`shadow-sm  ${isProductsPage ? "products-navbar" : "custom-navbar"}`}
    >
      <Container fluid>
        <Navbar.Brand
          style={{
            color: 'white',
            position: 'absolute',       // ✅ stay absolute
            left: '50%',
            top:'50%' ,               // ✅ push to middle
            transform: 'translateX(-50%)', // ✅ center it
          }}
        >
          RSN TeleMart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* Nav content if any */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
