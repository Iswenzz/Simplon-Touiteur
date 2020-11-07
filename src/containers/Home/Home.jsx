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
					author: user.data.user,
				});
			};
			init();
		}
		catch (e)
		{
			console.log(e);
		}
	}, [props.history]);

	/**
	 * Refresh the tweets feed.
	 * @returns {Promise<void>}
	 */
	const refreshFeed = async () =>
	{
		try
		{
			const tweets = await axios.get(`${process.env.REACT_APP_BACKEND}/api/tweets`);
			setState(prevState => ({
				...prevState,
				...tweets.data
			}));
		}
		catch (err)
		{
			console.log(err);
		}
	};

	return (
		<Main {...props}>
			{state.author ? (
				<Post author={state.author} onPost={refreshFeed} />
			) : <PageLoader />}
			<ul>
				{state.tweets?.slice(0).reverse().map(tweet => (
					<li key={uuid.v4()}>
						<Tweet author={tweet.author} tweet={tweet} />
					</li>
				))}
			</ul>
		</Main>
	);
};

export default withRouter(Home);