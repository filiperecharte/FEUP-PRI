import {Card, Col, ListGroup} from "react-bootstrap";
import {AiFillStar} from "react-icons/ai";
import { BsFillCalendarWeekFill} from 'react-icons/bs';

export function BookCard({book}) {
  return (
    <Col md={6}>
      <Card id="bookCard">
        <Card.Body>
          <Card.Title><a href={"/book" + book.id}>{book.name}</a></Card.Title>
          <Card.Subtitle className="mb-2 text-muted"><a href="#">by {book.author}</a></Card.Subtitle>
          <ListGroup horizontal>
            <ListGroup.Item><AiFillStar/> {book.rating}</ListGroup.Item>
            <ListGroup.Item><BsFillCalendarWeekFill/> Published {book.publishYear}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  )
}