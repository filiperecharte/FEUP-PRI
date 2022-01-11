import {NavBar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {AuthorCard} from "../components/AuthorCard";
import {Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {CircularProgress} from "@mui/material";

export function AuthorsPage() {
  const [authors, setAuthors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Books4You | Authors"
    axios.get("http://localhost:3001/books/authors").then((res) => {
      setAuthors(res.data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <div id="authorsPage">
      <NavBar authors={true} needsBottom={true}/>
      <div className="layout box">
        <h1>Authors</h1>
        {
          isLoading ? <Row className="justify-content-center">
              <CircularProgress/>
            </Row> :

            <Row>
              {
                authors.map((author, index) => {
                  return (
                    <AuthorCard name={author.name} books={author.numberOfBooks} img="/img/defaultAuthor.png"
                                key={index}/>
                  )
                })
              }
            </Row>}
      </div>
      <Footer/>
    </div>
  )
}