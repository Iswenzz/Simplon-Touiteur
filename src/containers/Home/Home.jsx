import React, {useEffect, useState} from "react";
import Tweet from "./Tweet/Tweet";
import Main from "../Main/Main";
import Post from "./Post/Post";
import {withRouter} from "react-router";
import axios from "axios";
import "./Home.scss";

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
			const fetchData = async () =>
			{
				const tweets = await axios.get(`${process.env.REACT_APP_BACKEND}/api/tweets`);
				const user = await axios.get(`${process.env.REACT_APP_BACKEND}/api/user/1`);
				setState({
					...tweets.data,
					user: user.data.user
				});
			};
			fetchData();
		}
		catch (e)
		{
			console.log(e);
		}
	}, []);

	return state.user ? (
		<Main {...props}>
			<Post user={state.user} />
			{state.tweets?.map(tweet => (
				<Tweet user={tweet.author} tweet={tweet} />
			))}
		</Main>
	) : null;
};

export default withRouter(Home);