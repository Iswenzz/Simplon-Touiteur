import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import Tweet from "../../components/Tweet/Tweet";
import TouiteurLogo from "../../components/TouiteurLogo/TouiteurLogo";
import "./Home.scss";
import Media from "../../components/Media/Media";
import TestImage from "../../assets/images/1500x500.jpg";

/**
 * Home page feed.
 * @returns {JSX.Element}
 * @constructor
 */
export const Home = () =>
{
	useEffect(() =>
	{
		// TODO get user feed
	}, []);

	return (
		<Grid container direction={"column"} justify={"center"} alignItems={"center"}>
			<TouiteurLogo />
			<Tweet user={{ name: "Red", username: "redred", date: "26/10/2020"}}
				   tweet={{ content: "I love you more than pizza 🍕" }}
				   medias={[ <Media media={TestImage} width={"100%"} height={150} /> ]} />
			<Tweet user={{ name: "Yellow", username: "yellowyellow", date: "26/10/2020"}}
				   tweet={{ content: "Symfony is my fav framework !!" }} />
			<Tweet user={{ name: "Green", username: "greengreen", date: "26/10/2020"}}
				   tweet={{ content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }} />
		</Grid>
	);
};

export default Home;