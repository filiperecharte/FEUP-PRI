import {Col, ProgressBar, Row} from "react-bootstrap";
import {AiFillStar} from "react-icons/ai";


export function RatingsDistMobile(props) {
  return(
    <div id="ratingDistMobile">
      <Row>
        <Col md={2} sm={2}>
        </Col>
        <Col md={9} sm={9}>
          <h5>
            Ratings Distribution
          </h5>
        </Col>
      </Row>
      <Row>
        <Col md={2} sm={2} className="starsCol">
          5 <AiFillStar/>
        </Col>
        <Col md={9} sm={9} className="progressBarCol">
          <ProgressBar now={props.five} label={props.five + '%'}/>
        </Col>
      </Row>
      <Row>
        <Col md={2} sm={2} className="starsCol">
          4 <AiFillStar/>
        </Col>
        <Col md={9} sm={9} className="progressBarCol">
          <ProgressBar now={props.four} label={props.four + '%'}/>
        </Col>
      </Row>
      <Row>
        <Col md={2} sm={2} className="starsCol">
          3 <AiFillStar/>
        </Col>
        <Col md={9} sm={9} className="progressBarCol">
          <ProgressBar now={props.three} label={props.three + '%'}/>
        </Col>
      </Row>
      <Row>
        <Col md={2} sm={2} className="starsCol">
          2 <AiFillStar/>
        </Col>
        <Col md={9} sm={9} className="progressBarCol">
          <ProgressBar now={props.two} label={props.two + '%'}/>
        </Col>
      </Row>
      <Row>
        <Col md={2} sm={2} className="starsCol">
          1 <AiFillStar/>
        </Col>
        <Col md={9} sm={9} className="progressBarCol">
          <ProgressBar now={props.one} label={props.one + '%'}/>
        </Col>
      </Row>
    </div>
  )
}