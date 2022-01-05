import {useEffect, useState} from "react";
import {NavBar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {Col, Image, Row} from "react-bootstrap";
import {BookCover} from "../components/BookCover";

export function AuthorPage() {
  const text = "Nora Roberts is the #1 New York Times bestselling author of more than 200 novels, including Hideaway, Under Currents, Come Sundown, The Awakening, Legacy, and coming in November 2021 -- The Becoming -- the second book in The Dragon Heart Legacy. She is also the author of the futuristic suspense In Death series written under the pen name J.D. Robb. There are more than 500 million copies of her books in print.";
  const [isReadMore, setIsReadMore] = useState(text.length > 250);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  useEffect(() => {
    document.title = "Books4You | Author"
  }, [])

  return (
    <>
      <NavBar needsBottom={true}/>
      <div className="layout box" id="authorPage">
        <Row className="firstRow">
          <Col md={4} className="coverHolder">
            <Image fluid={true} src="img/defaultAuthor.png" alt="Author Image"/>
          </Col>
          <Col md={8} className="mt-4">
            <h1 className="mb-4">Nora Roberts</h1>
            <p className="col-md-8">
              {isReadMore ? text.slice(0, 250) + "..." : text}
            </p>
            {
              text.length > 250 ? <div className="col-md-8 moreDiv">
              <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "read more" : " show less"}
              </span>
              </div> : null
            }
          </Col>
        </Row>
        <hr/>
        <Row md={8} className="catalogueRow">
          <h3 className="mb-4">Book Catalogue</h3>
          <BookCover img="/img/cover.png" bookId="719593" />
          <BookCover img="/img/cover.png" bookId="719593"/>
          <BookCover img="/img/cover.png" bookId="719593"/>
          <BookCover img="/img/cover.png" bookId="719593"/>
        </Row>
      </div>
      <Footer/>
    </>
  )
}