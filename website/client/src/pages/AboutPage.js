import {NavBar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {ContactCard} from "../components/ContactCard";
import {Col, Row} from "react-bootstrap";
import {useEffect} from "react";

export function AboutPage() {

  useEffect(() => {
    document.title = "Books4You | About"
  }, [])

  return (
    <div id="aboutPage">
      <NavBar />
      <div className="layout box">
          <h1>About Us</h1>
          <div className="aboutApp">
            <h2>About Books 4 You</h2>
            <p>
              <strong>Books 4 You</strong> is a website that allows users to search for books.
            </p>
            <p>
              Our database includes about 100,300 books, that should fulfill your reading needs!
            </p>
            <p>
              In this web app, you can search for books either by name, genre, author, etc. Besides the book information you also have some reviews, so you can get a better idea of the impact of the said book on people.
            </p>
          </div>
        <div className="aboutTeam">
          <h2>Our Team</h2>
          <Row className="justify-content-center">
            <Col md={4} sm={12}>
              <ContactCard name="Ana Cruz" img="/img/ana.jpg" email="up201806460@up.pt"/>
            </Col>
            <Col md={4} sm={12}>
              <ContactCard name="Inês Quarteu" img="/img/ines.jpg" email="201806279@up.pt"/>
            </Col>
            <Col md={4} sm={12}>
              <ContactCard name="Filipe Recharte" img="/img/filipe.jpg" email="201806743@up.pt"/>
            </Col>
          </Row>
        </div>
      </div>
      <Footer current={true}/>
    </div>
  )
}