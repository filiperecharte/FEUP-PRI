import {Nav, Navbar} from "react-bootstrap";

export function NavBar({needsBottom, authors}) {
  return(
    <Navbar collapseOnSelect expand="lg" id="navbar" className={needsBottom ? "withBottom" : null}>
        <Navbar.Brand href="/">
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
            <Nav.Link href="/authors" className={authors ? "active" : null}>Authors</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
