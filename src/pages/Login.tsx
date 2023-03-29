import "./Login.css";
import GoogleButton from "react-google-button";
import {signInWithPopup} from "firebase/auth"
import { auth, provider } from "../config/firebase";
import {useNavigate} from "react-router-dom"


export const Login = () => {
  const navigate = useNavigate();
  const signInGoogle = async () =>{
    const result = await signInWithPopup(auth,provider);
    navigate("/");
  }
  return (
    <div className="login-container">
      <div className="login-form">
        <form>
          <input type="text" placeholder="Enter email" />
          <input type="password" placeholder="Enter password" />
          <div>
            <button>Login</button>
            <button>SignUp</button>
          </div>
        </form>
      </div>
      <div className="or-container">
        <div className="or-line"></div>
        <div className="or-text">OR</div>
        <div className="or-line"></div>
      </div>
      <div className="login-google">
        <GoogleButton onClick={signInGoogle}/>
      </div>
    </div>
  );
};
