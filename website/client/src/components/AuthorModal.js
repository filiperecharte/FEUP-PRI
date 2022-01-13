import {Button, Col, Image, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {BookCover} from "./BookCover";

//TODO => add default when author's image is non existent
//TODO => Add a no-description warning for authors with no description
export function AuthorModal(props) {
  const [readMore, setReadMore] = useState(props.description.length > 200);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggle = () => {
    setReadMore(!readMore);
  };

  useEffect(() => {
    document.title = "Books4You | Search";
    axios.get("http://localhost:3001/books/author", {params: {name: props.name}}).then((res) => {
      setBooks(res.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="authorModal"
    >
      <Modal.Header closeButton>

      </Modal.Header>
      <Modal.Body>
        <Row className="mb-5">
          <Col md={4}>
            <Image src={props.image} alt="Author image" />
          </Col>
          <Col md={8}>
            <h1 className="mb-2">{props.name}</h1>
            <p>
              {readMore ? props.description.slice(0, 200) + "..." : props.description}
            </p>
            <div className="col-md-8 moreDiv">
              <span onClick={toggle} className="read-or-hide">
                {readMore ? "read more" : "show less"}
              </span>
              </div>
          </Col>
        </Row>
        {!loading ? <Row>
          <h3 className="mb-4">Book Catalogue ({books.numberFound} books found)</h3>
          {
            books.books.map((book) => {
              return (
                <BookCover img={book.authorPic} bookId={book.id} key={book.id} />
              )
            })
          }
        </Row> : null}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}