import "./Header.css";

export const Header = () =>{
	return (
	<div className="header">
		<img src={process.env.PUBLIC_URL + '/CreativeCorner.png'} alt="Logo" />
	</div>
	)
}