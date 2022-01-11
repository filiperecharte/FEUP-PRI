import {NavBar} from "../components/Navbar";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {BsArrowDown, BsArrowUp, BsSearch} from 'react-icons/bs';
import {BookCard} from "../components/BookCard";
import {useEffect, useState} from "react";
import Select from 'react-select';
import axios from "axios";
import {Footer} from "../components/Footer";
import {CircularProgress, Pagination, Slider} from "@mui/material";

//TODO => pôr cards com a mesma height
//TODO => apply search on to give more weights to those fields

export function MainPage() {
  const [booksList, setbooksList] = useState([]);
  const [booksFound, setBooksFound] = useState(0);
  const [previousInput, setPreviousInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("none");
  const [numberPages, setNumberPages] = useState('3000');
  const [notFound, setNotFound] = useState(false);
  const [languages, setLanguages] = useState({});
  const [genres, setGenres] = useState({});
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const fields = [
    {label: "name", value: "name"},
    {label: "publisher", value: "publisher"},
    {label: "description", value: "description"},
    {label: "author", value: "author"},
    {label: "genres", value: "genres"},
    {label: "language", value: "language"},
    {label: "reviews", value: "reviews"}
  ]

  function valuetext(value) {
    return `${value}`;
  }

  useEffect(() => {
    document.title = "Books4You | Search";
    axios.get("http://localhost:3001/books/filters", {params: {field: "language"}}).then((res) => {
      setLanguages(res.data);
    }).catch((error) => {
      console.log(error);
    })
    axios.get("http://localhost:3001/books/filters", {params: {field: "genres"}}).then((res) => {
      setGenres(res.data);
    }).catch((error) => {
      console.log(error);
    })
    setPage(1);
    handleInput(false, 1);
  }, [sort, numberPages, selectedLanguages, selectedGenres])

  const handleSort = (e) => {
    if(e.target.checked) {
      setSort(e.target.id);
    }
    else {
      setSort("none");
    }
  }

  const handleLanguageChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
  }

  const handleGenresChange = (selectedOptions) => {
    setSelectedGenres(selectedOptions);
  }

  const handlePages = (e) => {
    const span = document.querySelector('.MuiSlider-valueLabelLabel');
    setNumberPages(span.innerHTML);
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
        sort,
        numberPages,
        selectedLanguages,
        selectedGenres
      }
    }).then((res) => {
      console.log(res);
      setbooksList(res.data.books);
      setBooksFound(res.data.numberFound);
      setIsLoading(false);
      setNotFound(false);
    }).catch((error) => {
      console.error(error);
      setNotFound(true);
      setBooksFound(0);
    });
  }

  if(!notFound) {
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
                    <div>
                      <Form.Label>Pages Number</Form.Label>
                      <Slider
                        aria-label="Always visible"
                        getAriaValueText={valuetext}
                        defaultValue={numberPages}
                        step={1}
                        marks={[{value: 0, label: '0'}, {value: 3000, label: '3000+'}]}
                        min={0}
                        max={3000}
                        valueLabelDisplay="on"
                        onChangeCommitted={(e) => handlePages(e)}
                      />
                    </div>
                    <div className="select">
                      <Form.Label>Select languages:</Form.Label>
                      <Select
                        isMulti
                        name="fields"
                        options={languages}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleLanguageChange}
                      />
                    </div>
                    <div className="select">
                      <Form.Label>Select genres:</Form.Label>
                      <Select
                        isMulti
                        name="fields"
                        options={genres}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleGenresChange}
                      />
                    </div>
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
                      {booksFound !== 0 && !isLoading ? <h6>{booksFound} books found</h6> : null }
                    </Col>
                  </Row>
                  {
                    isLoading ?
                      <Row className="justify-content-center">
                        <CircularProgress />
                      </Row> :
                      <Row className="mb-4">
                        {
                          booksList.map((book, index) => {
                            return (
                              <BookCard key={index} book={book}/>
                            )
                          })
                        }
                      </Row> }
                  <Row>
                    {booksFound > 10 && !isLoading ?
                      <Pagination count={Math.round(booksFound / 10)}
                                  page={page}
                                  onChange={(event, value) => handleInput(false, value)}
                                  showFirstButton
                                  showLastButton /> : null}
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
  else {
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
                    <div>
                      <Form.Label>Pages Number</Form.Label>
                      <Slider
                        aria-label="Always visible"
                        getAriaValueText={valuetext}
                        defaultValue={numberPages}
                        step={1}
                        marks={[{value: 0, label: '0'}, {value: 3000, label: '3000+'}]}
                        min={0}
                        max={3000}
                        valueLabelDisplay="on"
                        onChangeCommitted={(e) => handlePages(e)}
                      />
                    </div>
                    <div className="select">
                      <Form.Label>Select languages:</Form.Label>
                      <Select
                        isMulti
                        name="fields"
                        options={languages}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleLanguageChange}
                      />
                    </div>
                    <div className="select">
                      <Form.Label>Select genres:</Form.Label>
                      <Select
                        isMulti
                        name="fields"
                        options={genres}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleGenresChange}
                      />
                    </div>
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
                      <h6>{booksFound} books found</h6>
                    </Col>
                  </Row>
                  <Row>
                      <h6>That book is yet to be written....</h6>
                      <h6>Try searching for something else!</h6>
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

}