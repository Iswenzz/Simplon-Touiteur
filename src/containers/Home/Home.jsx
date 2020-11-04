import React, {useEffect} from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import Tweet from "./Tweet/Tweet";
import Media from "../../components/Media/Media";
import TestImage from "../../assets/images/1500x500.jpg";
import {Search} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as uuid from "uuid";
import {useMediaQuery} from "react-responsive/src";
import NavBar from "../UI/NavBar/NavBar";
import "./Home.scss";

export const trendingPlaceholder = [
	<Typography variant={"h6"} component={"h6"} align={"center"}>
		Test
	</Typography>,
	<Typography variant={"h6"} component={"h6"} align={"center"}>
		Test
	</Typography>,
	<Typography variant={"h6"} component={"h6"} align={"center"}>
		Test
	</Typography>,
	<Typography variant={"h6"} component={"h6"} align={"center"}>
		Test
	</Typography>
];

/**
 * Home page feed.
 * @returns {JSX.Element}
 * @constructor
 */
export const Home = () =>
{
	const isLgBp = useMediaQuery({ query: "(max-width: 1280px)" });
	const isTabletOrMobileDevice = useMediaQuery({ query: "(max-device-width: 1224px)" });
	const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

	useEffect(() =>
	{
		// TODO get user feed
	}, []);

	return (
		<>
			<Grid className={"home"} container>
				{/*Left Section*/}
				<Grid className={"home-aside"} component={"aside"} item xs={12} lg={2}>
					<NavBar />
				</Grid>

				{/*Tweets*/}
				<Grid component={"section"} item xs={12} lg={8}>
					<Tweet user={{ name: "Red", username: "redred", date: "26/10/2020"}}
						   tweet={{ content: "I love you more than pizza 🍕" }}
						   medias={[ <Media media={TestImage} /> ]} />
					<Tweet user={{ name: "Yellow", username: "yellowyellow", date: "26/10/2020"}}
						   tweet={{ content: "Symfony is my fav framework !!" }} />
					<Tweet user={{ name: "Green", username: "greengreen", date: "26/10/2020"}}
						   tweet={{ content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }} />
					<Tweet user={{ name: "Red", username: "redred", date: "26/10/2020"}}
						   tweet={{ content: "I love you more than pizza 🍕" }}
						   medias={[ <Media media={TestImage} /> ]} />
					<Tweet user={{ name: "Yellow", username: "yellowyellow", date: "26/10/2020"}}
						   tweet={{ content: "Symfony is my fav framework !!" }} />
					<Tweet user={{ name: "Green", username: "greengreen", date: "26/10/2020"}}
						   tweet={{ content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }} />
				</Grid>

				{/*Right Section*/}
				<Grid item xs={12} lg={2}>
					{isTabletOrMobileDevice || isPortrait || isLgBp ? null : (
						<Grid container justify={"center"} alignItems={"center"}>
							{/*Search Tweet*/}
							<form noValidate autoComplete="off">
								<TextField fullWidth id="search-tweet" placeholder="Search Tweet" InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Search />
										</InputAdornment>
									),
								}} />
							</form>
							{/*Trending Hashtags*/}
							<Container>
								<Grid container className={"home-recommend"} direction={"column"} justify={"center"} alignItems={"center"}>
									<List component="nav" aria-label="mailbox folders">
										{trendingPlaceholder.map(item => (
											<ListItem key={uuid.v4()} button divider>
												<ListItemText>
													{item}
												</ListItemText>
											</ListItem>
										))}
									</List>
								</Grid>
							</Container>
							{/*Trending profiles*/}
							<Container>
								<Grid container className={"home-recommend"} direction={"column"} justify={"center"} alignItems={"center"}>
									<List component="nav" aria-label="mailbox folders">
										{trendingPlaceholder.map(item => (
											<ListItem key={uuid.v4()} button divider>
												<ListItemText>
													{item}
												</ListItemText>
											</ListItem>
										))}
									</List>
								</Grid>
							</Container>
						</Grid>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default Home;