import React from "react";
import "./Feed.scss";
import TweetBox from "./TweetBox/TweetBox";
import Footer from "./Footer/Footer";
import Touiteur from "../../assets/images/bird.png";

function Feed() {
	return (
		<div>
			{/* Header */}
			<div className="margin" />
			<img className="birdImg" src={Touiteur} alt={"Touiteur Logo"} />

			{/* TweetBox */}
			<TweetBox />    

			{/* Footer */}
			<Footer />
		</div>
	);
}

export default Feed;