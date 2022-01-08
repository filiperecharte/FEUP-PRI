import {NavBar} from "../components/Navbar";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {BsArrowDown, BsArrowUp, BsSearch} from 'react-icons/bs';
import {BookCard} from "../components/BookCard";
import {useEffect, useState} from "react";
import Select from 'react-select';
import axios from "axios";
import {Footer} from "../components/Footer";
import {Pagination} from "@mui/material";

//TODO => when searching, if input is changed, pagination needs to update
//TODO => pôr cards com a mesma height
// TODO => pôr uma imagem quando não vou resultados
// TODO => pôr um loading enquanto o pedido não é completado

export function MainPage() {
  const [booksList, setbooksList] = useState([]);
  const [booksFound, setBooksFound] = useState(0);
  const [previousInput, setPreviousInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    handleInput(false, 0);
  }, [])

  const handleInput = (isSearching, pageNumber) => {
    let inputText;
    setIsLoading(true);
    if (isSearching) {
      const ele = document.getElementById('enter');
      inputText = ele.value.replace(/ +(?= )/g, '');
      if (inputText === " ") inputText = "";
      setPreviousInput(inputText);
    } else
      inputText = previousInput;
    console.log(inputText);
    axios.get(`http://localhost:3001/books/search`, {
      params: {
        inputText,
        pageNumber
      }
    }).then((res) => {
      console.log(res);
      setbooksList(res.data.books);
      setBooksFound(res.data.numberFound);
      setIsLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }

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
                    <Button id="clear" onClick={() => handleInput( true, 0)}><BsSearch/></Button>
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
                {booksFound !== 0 ? <h6>{booksFound} books found</h6> : null }
                <Row>
                  {
                    booksList.map((book, index) => {
                      return (
                        <BookCard key={index} book={book}/>
                      )
                    })
                  }
                </Row>
                <Row>
                  <Pagination count={Math.round(booksFound / 10)}
                              onChange={(event, value) => handleInput(false, value - 1)}
                              showFirstButton
                              showLastButton />
                </Row>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
      <Footer/>
    </>
  )
}