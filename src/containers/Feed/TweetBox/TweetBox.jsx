import React from "react";
import "./TweetBox.scss";
import { Avatar, Button, Input } from "@material-ui/core";
import Background from "../../../assets/images/1500x500.jpg";

function TweetBox() {
	return (
		<div className="tweetBox">
			<form>
				<div className="tweetBox__input">
					<Avatar className="avatar" src={Background} />
					<Input placeholder="What's happening" type="text" />
					{/*<Input placeholder="Enter url image" type="text" />*/}
				</div>

				<div className="margin" />
				<div>
					<div className="btnAdd">
						<Button className="btnFont btnWidth">Add</Button>
					</div>
				</div>
				<div className="margin" />

				<div className="row">
					<div className="col">
						<Button className="btnFont">Cancel</Button>
					</div>

					<div className="col">
						<Button className="btnFont">Draft</Button>
					</div>

					<div className="col">
						<Button className="btnFont" color="#ff5c5c">Tweet</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TweetBox;