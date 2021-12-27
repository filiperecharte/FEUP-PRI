import {NavBar} from "../components/Navbar";
import {Image} from "react-bootstrap";
import { BsSearch } from 'react-icons/bs';

export function MainPage() {
  return (
    <>
      <NavBar />
      <div id="mainPage">
        <form action="#">
          <div className="searchContainer">
            <Image src="/img/books2.jpg"
                   className="d-inline-block align-top"
                   alt="books">
            </Image>
            <div className="centered col-md-8">
                <div className="buttonIn ">
                  <input className="col-md-8" type="text" placeholder="Search for books here..." name="search" id="enter"/>
                    <button id="clear" type="submit"><BsSearch/></button>
                </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}