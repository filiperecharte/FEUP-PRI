import {NavBar} from "../components/Navbar";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import { BsSearch, BsArrowDown, BsArrowUp} from 'react-icons/bs';
import {BookCard} from "../components/BookCard";
import {Footer} from "../components/Footer";
import {useEffect} from "react";
import Select from 'react-select';

export function MainPage() {
  const fields = [
    {label: "name", value: "name"},
    {label: "publisher", value: "publisher"},
    {label: "description", value: "description"},
    {label: "author", value: "author"},
    {label: "genres", value: "genres"},
    {label: "language", value: "language"},
    {label: "reviews", value: "reviews"}
  ]

  useEffect(() => {
    document.title = "Books4You"
  }, [])

  return (
    <>
      <NavBar />
      <div id="mainPage" className="layout">
        <Form action="#">
          <div className="searchContainer">
            <Image src="/img/books3.jpg"
                   className="d-inline-block align-top"
                   alt="books">
            </Image>
            <div className="centered col-9">
                <div className="buttonIn ">
                  <input type="text" placeholder="Search for books here..." name="search" id="enter"/>
                    <Button id="clear" type="submit"><BsSearch/></Button>
                </div>
            </div>
          </div>
          <Container>
            <Row>
              <Col className="filtersCol" md={3}>
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
                <div className="select">
                  <h5 className="mb-3">Search on:</h5>
                  <Select
                    isMulti
                    name="fields"
                    options={fields}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              </Col>
              <Col md={9} className="resultsCol">
                <h2 className="mb-3">Results</h2>
                <Row>
                  <Col md={6}>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                  </Col>
                  <Col md={6}>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
      <Footer />
    </>
  )
}