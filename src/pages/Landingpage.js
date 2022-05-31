import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import logo from "../assets/struzzo-03.png";
import compositionRight from "../assets/composizione-finale.png";
import { FooterShared } from "../components/FooterShared";
import { useNavigate } from "react-router-dom";

export const Landingpage = () => {
  const navigate = useNavigate();
  function handleLoginButton() {
    navigate("/Homepage");
  }

  return (
    <div className=" vw-100 vh-100 fredoka gradient">
      <div className="centrale-landing">
        <div className="d-flex flex-column align-items-start gap-5 w-75 h-100 ctn-log">
          <div>
            <Image src={logo} alt="logo" className=" logo align-self-center" />
          </div>
          <h1 className="text-lnd">Discover our new social network!</h1>
          <button
            className="visit-btn fw-bold rounded-pill border-0 py-1 px-5 shadow heartbeat"
            onClick={handleLoginButton}
          >
            Visit
          </button>
        </div>
        <div className="h-100">
          <Image
            src={compositionRight}
            alt="immagine destra"
            className="h-100"
          />
        </div>
      </div>
      <FooterShared />
    </div>
  );
};
