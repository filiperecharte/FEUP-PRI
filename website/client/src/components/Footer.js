import {Button, Col, Row} from "react-bootstrap";

export function Footer() {
  return (
    <div id="footer">
      <Row>
        <Col className="copyrightsDiv">copyrights@2021</Col>
        <Col className="buttonDiv"><a href="#">About Us</a></Col>
      </Row>
    </div>
  )
}