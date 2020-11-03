import React from "react";
import {Avatar, Button, Input} from "@material-ui/core";
import Background from "../../../assets/images/1500x500.jpg";
import "./Post.scss";

function Post() {
	return (
		<>
			<article className="tweetBox">
				<form method={"POST"}>
					<div className="tweetBox__input">
						<Avatar className="avatar" src={Background} />
						<Input placeholder="What's happening" type="text" />
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
			</article>
		</>
	);
}

export default Post;