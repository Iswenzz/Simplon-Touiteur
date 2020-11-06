import React, {useEffect, useState} from "react";
import Tweet from "./Tweet/Tweet";
import Media from "../../components/Media/Media";
import TestImage from "../../assets/images/1500x500.jpg";
import Main from "../Main/Main";
import Post from "./Post/Post";
import {withRouter} from "react-router";
import axios from "axios";
import {getAuthHeader} from "../../api/auth";
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
				const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/tweets`);
				console.log(response);
				setState(response.data);
			};
			fetchData();
		}
		catch (e)
		{
			console.log(e);
		}
	}, []);

	return (
		<Main {...props}>
			<Post user={{ name: "Red", username: "redred", date: "26/10/2020"}} />
			{state.tweets?.map(tweet => (
				<Tweet user={tweet.author} tweet={tweet} />
			))}
		</Main>
	);
};

export default withRouter(Home);