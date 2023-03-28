import "./Header.css";

export const Header = () => {
	return (
	  <div className="header">
		<div className="logo">
		  <img src={process.env.PUBLIC_URL + '/CreativeCorner.png'} alt="Creative Corner Logo" />
		  <div className="title">
			<h1>Creative Corner</h1>
			<p>Share Your Creativity</p>
		  </div>
		</div>
	  </div>
	);
  };
  