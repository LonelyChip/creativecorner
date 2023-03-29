import { auth} from "../../config/firebase";
import "./Header.css";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth"
import {useNavigate} from "react-router-dom"


export const Header = () => {
	const navigate = useNavigate();
	const LogOut = async () =>{
		await signOut(auth);
		navigate("/login");
	}

	const [user] = useAuthState(auth);
	return (
		<div className="header">
			<div className="logo">
			<img src={process.env.PUBLIC_URL + '/CreativeCorner.png'} alt="Creative Corner Logo" />
			<div className="title">
				<h1>Creative Corner</h1>
				<p>Share Your Creativity</p>
			</div>
			</div>
				{user &&
				<div className="userInfo">
				<div className="userName">{user?.displayName}</div>
				<div className="userImage"><img src={user?.photoURL||""}/></div>
				<div><button className="logout" onClick={LogOut}>Log Out</button></div>
				</div>
				}
		</div>
	);
  };
  