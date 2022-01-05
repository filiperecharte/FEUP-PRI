import {useEffect, useState} from "react";
import {NavBar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {Col, Image, Row} from "react-bootstrap";
import {RatingsDist} from "../components/RatingsDist";
import {BookDetails} from "../components/BookDetails";
import {AiFillStar, AiOutlineNumber} from "react-icons/ai";
import {ReviewCard} from "../components/ReviewCard";

export function BookPage() {
  const text = "It was the last thing he expected...to catch a beautiful intruder disguised as a man, rummaging through his bedroom. The fair lady claimed she was stealing one of his cravats for a wager, but Robert Sinclair Dovenby\u2014known throughout fashionable London as Dove\u2014suspects there is far more to \"George\" than meets the eye.Little does Dove imagine, however, that Sylvie Georgiana, Countess of Montevrain, is an agent hired to determine whether he's guilty of treason. To uncover his well-guarded secrets, Sylvie finds herself having to stay dangerously close to her mischievous adversary. But when the masquerade comes undone, will she be able to betray the one man she thinks she could love?";
  const [isReadMore, setIsReadMore] = useState(text.length > 250);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  useEffect(() => {
    document.title = "Books4You | Book"
  }, [])

  //This changes once we have Solr connection
  const genres = ["Romance", "Historical Romance", "Historical",
    "Georgian"];

  const reviews = [
    "This is one of those books that sat in my TBR pile for so long that I totally forgot why I put it there. Continuing my attempt to reduce the mentioned pile last week decided to pick it up. It is a spy story with a twist.The story opens with the hero's mistress, Lady Grenham, setting his clothes on fire and so kicking him out of her life. Dove, the hero, is a bit surprised but takes it in stride after he finds out that she had found another woman in his bedchamber. The woman in the bedchamber, supposedly his other lover is accompanied by a manservant that Dove soon realises is a woman. The woman is Sylvie, the widow countess of Montevrain who has been helping the Duke of Yveshire by finding information that more orthodox spies cannot. The fact is that the Duke blames Dove for the death of his brother and wants Sylvie to uncover information that can ruin him.The plot sounded interesting although one could predictably guess that Dove wouldn't be the villain that Sylvie believed him to be. Unfortunately, in the end, the story did not work for me... The thing is that Sylvie and Dove were not that interesting to me and I found myself thinking of giving up their story several times. There wasn't enough tension between them and Sylvie wasn't anguished enough by her decision of spying on the man she was falling for. There's a mystery for most of the book about what really happened between Dove and Yveshire's brother and when all is revealed I was sorry that that was not a part of the story also. It would have provided the angst that I felt the story needed. And I must say I would have loved to know more about Iveshire and Lady Grenham's relationship.Grade: 3.5/5 ",
    "This novel is a slow burn. Sylvie Georgiana has been hired by the Duke of Yveshire to find evidence to lead to the downfall of Robert Dovenby aka Dove, for the death of his younger brother. Disguised as a boy, she attempts to infiltrate his household and gather evidence. However, Dove already sees through her disguise and attempts to uncover her true purpose in a long cat and mouse chase that takes up the majority of the novel. The explanations and action happen late in the novel. In fact, compared to the excruciatingly long slow burn of the intrigue between Dove and Sylvie, everything just gets wrapped up too quick and perhaps a bit too tidy. The plot very much runs like a gothic novel minus the dark castle and evil guardian. The twists and turns are very convoluted. The reveal at the end comes out of nowhere and the development falls very short compared to the beginning. In spite of it, it still is a very engaging story. ",
    "Awww, man. The second book in the Georgian series falls squarely within the category of it was okay. Which is a real disappointment considering how good the first book",
    "Sylvie Georgiana, Countess of Montevrain became a spy for England after being widowed and impoverished in Italy. Her latest mission is to infiltrate Robert Sinclair Dovenby's household - as a man, to try and get something on him for the Duke of Yveshire. Yveshire thinks Dove deliberately ruined his brother, Edward Vane. In fact, Edward was involved in an operation that drugged young girls and then sexually abused them. When he kidnapped and raped Lady Margaret, Countess of Grenham's young daughter when she rejected Edward in favor of his brother, she enlists Dove to get revenge. Dove pretends to befriend him and slowly bankrupts him and uses the money to pay back those he's defrauded. Edward is finally killed in a duel but Yveshire blames Dove, not knowing what Edward was doing. George falls in love with Dove but doesn't understand the whole story. When Margaret finally releases him from his vow of secrecy it's almost too late, but they do finally pull off a happy ending.",
    "Boring",
    "All I can really say is that the writing is particularly elegant and beautiful. The sentences are almost flawless and there's a beauty in the phrasing that isn't seen often within romance books. To some, that can be more dramatic and fun, to other readers, however, that can be a pain in the butt.While it took me a little while to get into the story, and appreciate the plot, I never quite got over the wording. Ms Ross is a talented lady, and she has a unique turn of phrase that just makes the story seem superfluous. The dialogue is witty, charming, and oftentimes brilliantly paced. However at some points, the action is almost an afterthought.Regardless, this was a good tale. Even if the focus is more on the storytelling rather than the story.",
    "Historical romance. A woman disguises herself as a man to get at the truth behind the rogue who will become her lover. Okay, not one of Ross' best.",
    "\u201cvery entertaining, and actually pretty well written, even with a fair amount of writing being devoted to sexual encounters.\u201d"
  ]

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
            {
              text.length > 250 ? <div className="col-md-8 moreDiv">
              <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "read more" : " show less"}
              </span>
              </div> : null
            }
          </Col>
        </Row>
        <Row>
          <Col className="m-auto">
            <div className="ratingsDiv">
              <AiFillStar/> 3.56
            </div>
            <Row className="text-center numbersRow justify-content-center">
              <Col md={5}>
                <AiOutlineNumber/>8 Reviews
              </Col>
              <Col md={5}>
                <AiOutlineNumber/>114000 Ratings
              </Col>
            </Row>
          </Col>
          <Col className="m-auto">
            <RatingsDist five="22" four="33" three="26" two="10" one="7"/>
          </Col>
          <Col className="m-auto">
            <BookDetails isbn="0425199967" pages="352" languages="Spanish; Castilian" genres={genres} />
          </Col>
        </Row>
        <Row md={8} className="reviewsRow">
          <h3 className="mb-4">Reviews</h3>
          {
            reviews.map((review, index) => {
              return (
                <ReviewCard review={review} key={index} />
              )
            })
          }
        </Row>
      </div>
      <Footer/>
    </>
  )
}