import {useState} from "react";

export function ReviewCard({review}) {
  const [isReadMore, setIsReadMore] = useState(review.length > 300);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className="col-md-8" id="reviewCard">
      <p>
        {isReadMore ? review.slice(0, 300) + "..." : review}
      </p>
      {
        review.length > 300 ? <div className="moreDiv">
          <span onClick={toggleReadMore} className="read-or-hide">
            {isReadMore ? "read more" : " show less"}
          </span>
        </div> : null
      }
    </div>
  )
}