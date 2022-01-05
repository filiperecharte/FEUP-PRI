import {Col, ProgressBar, Row} from "react-bootstrap";
import {AiFillStar} from "react-icons/ai";


export function RatingsDist(props) {
  return(
    <div id="ratingDist">
      <Row>
        <Col md={2} sm={2}>
        </Col>
        <Col md={9} sm={9}>
          <h5>
            Ratings Distribution
          </h5>
        </Col>
        <Col md={1} sm={1}>
        </Col>
      </Row>
      <Row>
        <Col md={2} sm={2} className="starsCol">
          5 <AiFillStar/>
        </Col>
        <Col md={9} sm={9} className="progressBarCol">
          <ProgressBar now={props.five}/>
        </Col>
        <Col md={1} sm={1} className="percentageCol">
          {props.five}%
        </Col>
      </Row>
      <Row>
        <Col md={2} sm={2} className="starsCol">
          4 <AiFillStar/>
        </Col>
        <Col md={9} sm={9} className="progressBarCol">
          <ProgressBar now={props.four}/>
        </Col>
        <Col md={1} sm={1} className="percentageCol">
          {props.four}%
        </Col>
      </Row>
      <Row>
        <Col md={2} sm={2} className="starsCol">
          3 <AiFillStar/>
        </Col>
        <Col md={9} sm={9} className="progressBarCol">
          <ProgressBar now={props.three}/>
        </Col>
        <Col md={1} sm={1} className="percentageCol">
          {props.three}%
        </Col>
      </Row>
      <Row>
        <Col md={2} sm={2} className="starsCol">
          2 <AiFillStar/>
        </Col>
        <Col md={9} sm={9} className="progressBarCol">
          <ProgressBar now={props.two}/>
        </Col>
        <Col md={1} sm={1} className="percentageCol">
          {props.two}%
        </Col>
      </Row>
      <Row>
        <Col md={2} sm={2} className="starsCol">
          1 <AiFillStar/>
        </Col>
        <Col md={9} sm={9} className="progressBarCol">
          <ProgressBar now={props.one}/>
        </Col>
        <Col md={1} sm={1} className="percentageCol">
          {props.one}%
        </Col>
      </Row>
    </div>
  )
}