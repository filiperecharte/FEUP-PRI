import {Card, ListGroup} from "react-bootstrap";
import {AiFillStar} from "react-icons/ai";
import { BsFillCalendarWeekFill} from 'react-icons/bs';

export function BookCard() {
  return (
    <Card id="bookCard">
      <Card.Body>
        <Card.Title><a href="#">The Wicked Lover (Georgian, #2)</a></Card.Title>
        <Card.Subtitle className="mb-2 text-muted"><a href="#">by Julia Ross</a></Card.Subtitle>
        <ListGroup horizontal>
          <ListGroup.Item><AiFillStar/> 3.56</ListGroup.Item>
          <ListGroup.Item><BsFillCalendarWeekFill/> Published 2005</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}