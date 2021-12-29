import {NavBar} from "../components/Navbar";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import { BsSearch, BsArrowDown, BsArrowUp} from 'react-icons/bs';
import {BookCard} from "../components/BookCard";

export function MainPage() {
  return (
    <>
      <NavBar />
      <div id="mainPage">
        <Form action="#">
          <div className="searchContainer">
            <Image src="/img/books3.jpg"
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
                  <h5 className="mb-3">Sort by:</h5>
                  <div className="mb-3">
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" />
                        <Form.Check.Label>Publish Date <BsArrowUp/></Form.Check.Label>
                    </Form.Check>
                    <Form.Check type="checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Check.Label>Publish Date <BsArrowDown/></Form.Check.Label>
                    </Form.Check>
                    <Form.Check type="checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Check.Label>Rating <BsArrowUp/></Form.Check.Label>
                    </Form.Check>
                    <Form.Check type="checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Check.Label>Rating <BsArrowDown/></Form.Check.Label>
                    </Form.Check>
                  </div>
                </div>
                <div>
                  <h5 className="mb-3">Filter by:</h5>
                  <Form.Label>Pages Number</Form.Label>
                  <Form.Range variant='secondary'/>
                </div>
              </Col>
              <Col md={8} className="resultsCol">
                <h2 className="mb-3">Results</h2>
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