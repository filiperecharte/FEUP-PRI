import {Col, Row} from "react-bootstrap";

export function Footer({current}) {
  return (
    <div id="footer">
      <Row>
        <Col className="copyrightsDiv">copyrights@2021</Col>
        <Col className="buttonDiv"><a href="/about" className={current ? 'active': 'nonactive'}>About Us</a></Col>
      </Row>
    </div>
  )
}