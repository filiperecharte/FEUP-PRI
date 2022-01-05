import {Col, Image} from "react-bootstrap";

export function BookCover({img, bookId}) {
  return (
    <Col md={3} sm={4} id="bookCover" className="mb-3">
      <a href={"/book" + bookId}>
        <Image fluid={true} src={img} alt="Book Cover"/>
      </a>
    </Col>
  )
}