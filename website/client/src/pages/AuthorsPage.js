import {NavBar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {AuthorCard} from "../components/AuthorCard";
import {Row} from "react-bootstrap";
import {useEffect} from "react";

export function AuthorsPage() {

  useEffect(() => {
    document.title = "Books4You | Authors"
  }, [])

  return (
    <div id="authorsPage">
      <NavBar authors={true} needsBottom={true}/>
      <div className="layout box">
        <h1>Authors</h1>
        <Row>
          <AuthorCard name="Nora Roberts" books="1,179" img="/img/defaultAuthor.png" />
          <AuthorCard name="Nora Roberts" books="1,179" img="/img/defaultAuthor.png" />
          <AuthorCard name="Nora Roberts" books="1,179" img="/img/defaultAuthor.png" />
          <AuthorCard name="Nora Roberts" books="1,179" img="/img/defaultAuthor.png" />
          <AuthorCard name="Nora Roberts" books="1,179" img="/img/defaultAuthor.png" />
          <AuthorCard name="Nora Roberts" books="1,179" img="/img/defaultAuthor.png" />
        </Row>
      </div>
      <Footer/>
    </div>
  )
}