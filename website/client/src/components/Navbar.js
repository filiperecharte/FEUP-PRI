import {Nav, Navbar} from "react-bootstrap";

export function NavBar({needsBottom, authors}) {
  return(
    <Navbar collapseOnSelect expand="lg" id="navbar" className={needsBottom ? "withBottom" : null}>
        <Navbar.Brand href="/">
          <div>
            <img
              src="logo_1.png"
              width="60"
              height="60"
              alt="logo"
            />
            <span className="company">Books 4 You</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/authors" className={authors ? "active" : null} id="author-link">Authors</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
