import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as uuid from "uuid";
import {useMediaQuery} from "react-responsive/src";
import NavBar from "../UI/NavBar/NavBar";
import "./Main.scss";

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
 * Main page.
 * @returns {JSX.Element}
 * @constructor
 */
export const Main = (props) =>
{
	const isLgBp = useMediaQuery({ query: "(max-width: 1280px)" });
	const isTabletOrMobileDevice = useMediaQuery({ query: "(max-device-width: 1224px)" });
	const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

	return (
		<>
			<Grid className={"main"} container>
				{/*Left Section*/}
				<Grid className={"main-aside"} component={"aside"} item xs={12} lg={2}>
					<NavBar />
				</Grid>

				{/*Tweets*/}
				<Grid component={"section"} item xs={12} lg={8}>
					{props.children}
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
								<Grid container className={"main-recommend"} direction={"column"} justify={"center"} alignItems={"center"}>
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
								<Grid container className={"main-recommend"} direction={"column"} justify={"center"} alignItems={"center"}>
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

export default Main;