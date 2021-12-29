import {Card} from "react-bootstrap";

export function ContactCard({img, name, email}) {
  return (
    <Card id="contactCard">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          M.EIC student @ FEUP
        </Card.Text>
        <ins>
          <a className="mail" href={"mailto:" + email}>{email}</a>
        </ins>
      </Card.Body>
    </Card>
  )
}