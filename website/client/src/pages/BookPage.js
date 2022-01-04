import {useEffect, useState} from "react";
import {NavBar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {Col, Image, Row} from "react-bootstrap";
import {RatingsDist} from "../components/RatingsDist";

export function BookPage() {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const text = "It was the last thing he expected...to catch a beautiful intruder disguised as a man, rummaging through his bedroom. The fair lady claimed she was stealing one of his cravats for a wager, but Robert Sinclair Dovenby\u2014known throughout fashionable London as Dove\u2014suspects there is far more to \"George\" than meets the eye.Little does Dove imagine, however, that Sylvie Georgiana, Countess of Montevrain, is an agent hired to determine whether he's guilty of treason. To uncover his well-guarded secrets, Sylvie finds herself having to stay dangerously close to her mischievous adversary. But when the masquerade comes undone, will she be able to betray the one man she thinks she could love?";

  useEffect(() => {
    document.title = "Books4You | Book"
  }, [])

  return (
    <>
      <NavBar />
      <div className="layout box" id="bookPage">
        <Row>
          <Col md={4} className="coverHolder">
            <Image src="img/cover.png" alt="book cover"/>
          </Col>
          <Col md={8} className="mt-4">
            <h1 className="mb-4">The Wicked Lover (Georgian, #2)</h1>
            <h4 className="mb-4">by <a href="#">Julia Ross</a></h4>
            <p className="col-md-8">
              {isReadMore ? text.slice(0, 250) + "..." : text}
            </p>
            <div className="col-md-8 moreDiv">
              <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "read more" : " show less"}
            </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            hi
          </Col>
          <Col>
            <RatingsDist five="22" four="33" three="26" two="10" one="7"/>
          </Col>
          <Col>
            hi
          </Col>
        </Row>
      </div>
      <Footer/>
    </>
  )
}