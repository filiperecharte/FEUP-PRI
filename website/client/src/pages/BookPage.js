import {useEffect, useState} from "react";
import {NavBar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {Button, Col, Image, Row} from "react-bootstrap";
import {BookDetails} from "../components/BookDetails";
import {AiFillStar, AiOutlineNumber} from "react-icons/ai";
import {ReviewCard} from "../components/ReviewCard";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {AuthorModal} from "../components/AuthorModal";
import {CircularProgress} from "@mui/material";

export function BookPage() {
  const [isReadMore, setIsReadMore] = useState(true);
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Books4You | Book"
    const id = location.pathname.substring(5);
    axios.get(`http://localhost:3001/books/book${id}`).then((res) => {
      setInfo(res.data);
      setError(false);
      setIsReadMore(res.data.description.length > 400);
      setIsLoading(false);
    }).catch((error) => {
      console.error(error);
      setError(true);
    });
  }, []);

  const handleClick = () => {
    navigate('/');
  }

  if(error) {
    return (
      <>
        <NavBar needsBottom={true}/>
          <div className="layout text-center" id="bookPage">
            <Image fluid={true} src="/img/404.svg" alt="Library Image" id="notFound" />
            <div className="bottom-left">
              <h1>404</h1>
              <h2>That book is yet to be written....</h2>
              <Button onClick={handleClick}>Main Page</Button>
            </div>
          </div>
        }
        <Footer/>
      </>
    )
  }
  return (
    <>
      <NavBar needsBottom={true}/>
      {!isLoading ? <div className="layout box" id="bookPage">
        <Row className="firstRow">
          <Col md={4} className="coverHolder">
            <Image fluid={true} src={info.bookImage === undefined ? "img/defaultCover.png" : info.bookImage} alt="book cover"/>
          </Col>
          <Col md={8} className="mt-4">
            <h1 className="mb-4">{info.name}</h1>
            <h4 className="mb-4">by <span onClick={() => setModalShow(true)}>{info.author}</span></h4>
            <p className="col-md-8">
              {isReadMore ? info.description.slice(0, 400) + "..." : info.description}
            </p>
            {
              info.description.length > 400 ? <div className="col-md-8 moreDiv">
              <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "read more" : "show less"}
              </span>
              </div> : null
            }
          </Col>
          <AuthorModal
            show={modalShow}
            name={info.author}
            description={info.authorDescription}
            image={info.authorImage}
            onHide={() => setModalShow(false)}
          />
        </Row>
        <hr/>
        <Row>
          <Col className="m-auto" md={6}>
            <div className="ratingsDiv">
              <AiFillStar/> {info.rating}
            </div>
            <Row className="text-center numbersRow justify-content-center">
              <Col md={5}>
                <AiOutlineNumber/>{info.countsOfReviews} Reviews
              </Col>
              <Col md={5}>
                <AiOutlineNumber/>15 Ratings
              </Col>
            </Row>
          </Col>
          <Col className="m-auto" md={4}>
            <BookDetails isbn={info.ISBN} pages={info.pagesNumber}
                         languages={info.language} genres={info.genres}
                         publisher={info.publisher}
                         day={info.publishDay} month={info.publishMonth}
                         year={info.publishYear} />
          </Col>
        </Row>
        <hr/>
        <Row md={8} className="reviewsRow">
          <h3 className="mb-4">Reviews</h3>
          {
            info.reviews ? info.reviews.map((review, index) => {
              return (
                <ReviewCard review={review} key={index} />
              )
            }) : <p>No reviews...</p>
          }
        </Row>
      </div> :
        <div className="layout text-center" id="bookPage">
          <Row className="justify-content-center">
            <CircularProgress />
          </Row>
        </div>
        }
      <Footer/>
    </>
  )
}