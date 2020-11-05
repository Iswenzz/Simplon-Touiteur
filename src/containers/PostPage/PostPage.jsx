import React, {useEffect} from "react";
import Main from "../Main/Main";
import Post from "../Home/Post/Post";
import {Grid, Typography} from "@material-ui/core";
import "./PostPage.scss";
import {withRouter} from "react-router";

/**
 * Post a tweet page.
 * @returns {JSX.Element}
 * @constructor
 */
export const PostPage = (props) =>
{
	useEffect(() =>
	{
		// TODO get own user feed
	}, []);

	return (
		<Main {...props}>
			<section className={"postpage"}>
				<Post rows={20} user={{ name: "Red", username: "redred", date: "26/10/2020"}} />
			</section>
		</Main>
	);
};

export default withRouter(PostPage);