import {NavBar} from "../components/Navbar";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import { BsSearch} from 'react-icons/bs';
import {BookCard} from "../components/BookCard";

export function MainPage() {
  return (
    <>
      <NavBar />
      <div id="mainPage">
        <Form action="#">
          <div className="searchContainer">
            <Image src="/img/books2.jpg"
                   className="d-inline-block align-top"
                   alt="books">
            </Image>
            <div className="centered col-md-8 col-sm-9">
                <div className="buttonIn ">
                  <input className="col-md-8 col-sm-9" type="text" placeholder="Search for books here..." name="search" id="enter"/>
                    <Button id="clear" type="submit"><BsSearch/></Button>
                </div>
            </div>
          </div>
          <Container>
            <Row>
              <Col className="filtersCol" md={4}>
                <div>
                  <h5>Sort by:</h5>
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label={"Publish Date"}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Publish Date"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Rating"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Rating"
                    />
                  </div>
                </div>
                <div>
                  <h5>Filter by:</h5>
                  <Form.Label>Pages Number</Form.Label>
                  <Form.Range />
                </div>
              </Col>
              <Col md={8} className="resultsCol">
                <h2>Results</h2>
                <BookCard/>
                <BookCard/>
                <BookCard/>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    </>
  )
}