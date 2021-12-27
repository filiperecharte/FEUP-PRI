import {Nav, Navbar} from "react-bootstrap";


export function NavBar() {
  return(
    <Navbar collapseOnSelect expand="lg" id="navbar">
        <Navbar.Brand href="#home">
          <img
            src="logo_1.png"
            width="70"
            height="70"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#">Authors</Nav.Link>
            <Nav.Link href="#">Genres</Nav.Link>
            <Nav.Link href="#">Top 20</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
