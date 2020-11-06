import React, {useEffect, useState} from "react";
import Tweet from "./Tweet/Tweet";
import Main from "../Main/Main";
import Post from "./Post/Post";
import {withRouter} from "react-router";
import axios from "axios";
import {checkAuth} from "../../api/auth";
import * as uuid from "uuid";
import "./Home.scss";
import PageLoader from "../../components/PageLoader/PageLoader";

/**
 * Home page feed.
 * @returns {JSX.Element}
 * @constructor
 */
export const Home = (props) =>
{
	const [state, setState] = useState({});

	useEffect(() =>
	{
		// TODO get user feed
		try
		{
			const init = async () =>
			{
				if (!await checkAuth())
				{
					props.history.push("/");
					return;
				}

				const tweets = await axios.get(`${process.env.REACT_APP_BACKEND}/api/tweets`);
				const user = await axios.get(`${process.env.REACT_APP_BACKEND}/api/user/${localStorage.getItem("userid")}`);
				setState({
					...tweets.data,
					user: user.data.user
				});
			};
			init();
		}
		catch (e)
		{
			console.log(e);
		}
	}, [props.history]);

	return (
		<Main {...props}>
			{state.user ? (
				<Post user={state.user} />
			) : <PageLoader />}
			<ul>
				{state.tweets?.map(tweet => (
					<li key={uuid.v4()}>
						<Tweet user={tweet.author} tweet={tweet} />
					</li>
				))}
			</ul>
		</Main>
	);
};

export default withRouter(Home);