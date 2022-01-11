import {Card, ListGroup} from "react-bootstrap";

export function BookDetails({isbn, pages, languages, genres, day, month, year}) {
  return (
    <Card id="detailsCard">
      <Card.Body>
        <Card.Title>Details</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>ISBN: </strong>{isbn}</ListGroup.Item>
          <ListGroup.Item><strong>Publish Date: </strong>{day}-{month}-{year}</ListGroup.Item>
          <ListGroup.Item><strong>Pages Number: </strong>{pages}</ListGroup.Item>
          <ListGroup.Item><strong>Languages: </strong>{languages.replace(";", ",")}</ListGroup.Item>
          <ListGroup.Item><strong>Genres: </strong>
            {
              genres.map((genre, index) => {
                return (
                  index === genres.length-1 ? <span key={index}>{genre}</span> : <span key={index}>{genre}, </span>
                )
              })
            }
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
)
}