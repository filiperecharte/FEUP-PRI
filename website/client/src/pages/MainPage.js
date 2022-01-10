import {NavBar} from "../components/Navbar";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {BsArrowDown, BsArrowUp, BsSearch} from 'react-icons/bs';
import {BookCard} from "../components/BookCard";
import {useEffect, useState} from "react";
import Select from 'react-select';
import axios from "axios";
import {Footer} from "../components/Footer";
import {Pagination} from "@mui/material";

//TODO => pôr cards com a mesma height
//TODO => pôr uma imagem quando não vou resultados
//TODO => pôr um loading enquanto o pedido não é completado
//TODO => add genres and languages filter select

export function MainPage() {
  const [booksList, setbooksList] = useState([]);
  const [booksFound, setBooksFound] = useState(0);
  const [previousInput, setPreviousInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("none");
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
    document.title = "Books4You | Search";
    setPage(1);
    handleInput(false, 1);
  }, [sort])

  const handleSort = (e) => {
    if(e.target.checked) {
      setSort(e.target.id);
    }
    else {
      setSort("none");
    }
  }

  const handleInput = (isSearching, pageNumber) => {
    let input;
    setIsLoading(true);
    if (isSearching) {
      input = document.getElementById('enter').value;
      setPreviousInput(input);
      setPage(1);
    } else{
      input = previousInput;
      setPage(pageNumber);
    }

    axios.get(`http://localhost:3001/books/search`, {
      params: {
        input,
        pageNumber,
        sort
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
        <Form >
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
                    <div className="form-check">
                      <input className="form-check-input"
                             type="radio"
                             onChange={(e) => handleSort(e)}
                             name="flexRadioDefault" id="yearUp"/>
                      <label className="form-check-label" htmlFor="yearUp">
                        Publish Year <BsArrowUp/>
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input"
                             type="radio"
                             onChange={(e) => handleSort(e)}
                             name="flexRadioDefault" id="yearDown"/>
                      <label className="form-check-label" htmlFor="yearDown">
                        Publish Year <BsArrowDown/>
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input"
                             type="radio"
                             onChange={(e) => handleSort(e)}
                             name="flexRadioDefault" id="ratingUp"/>
                        <label className="form-check-label" htmlFor="ratingUp">
                          Rating <BsArrowUp/>
                        </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input"
                             type="radio"
                             onChange={(e) => handleSort(e)}
                             name="flexRadioDefault" id="ratingDown"
                             />
                        <label className="form-check-label" htmlFor="ratingDown">
                          Rating <BsArrowDown/>
                        </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input"
                             type="radio"
                             onChange={(e) => handleSort(e)}
                             name="flexRadioDefault" id="none"
                             defaultChecked={true}
                      />
                      <label className="form-check-label" htmlFor="none">
                        No sort
                      </label>
                    </div>
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
                <Row>
                  <Col>
                    <h2 className="mb-3">Results</h2>
                  </Col>
                  <Col className="numberOfResults">
                    {booksFound !== 0 ? <h6>{booksFound} books found</h6> : null }
                  </Col>
                </Row>
                <Row className="mb-4">
                  {
                    booksList.map((book, index) => {
                      return (
                        <BookCard key={index} book={book}/>
                      )
                    })
                  }
                </Row>
                <Row>
                  {booksFound > 10 ?
                  <Pagination count={Math.round(booksFound / 10)}
                              page={page}
                              onChange={(event, value) => handleInput(false, value)}
                              showFirstButton
                              showLastButton /> : null }
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