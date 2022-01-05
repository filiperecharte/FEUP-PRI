import {Card, Col} from "react-bootstrap";

export function AuthorCard({name, books, img}) {
  return (
    <Col md={3} sm={3} className="mb-4">
      <Card id="authorCard">
        <Card.Img src={img} alt="Author image"/>
        <Card.ImgOverlay>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{books} books</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </Col>
  )
}