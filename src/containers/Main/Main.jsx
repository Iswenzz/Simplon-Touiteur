import React, {useEffect, useState} from "react";
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
import {checkAuth} from "../../api/auth";
import {withRouter} from "react-router";
import PageLoader from "../../components/PageLoader/PageLoader";
import axios from "axios";

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
	const [isLoading, setLoading] = useState(true);
	const [state, setState] = useState({});
	const isLgBp = useMediaQuery({ query: "(max-width: 1280px)" });
	const isTabletOrMobileDevice = useMediaQuery({ query: "(max-device-width: 1224px)" });
	const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

	useEffect(() =>
	{
		const checkLog = async () =>
		{
			if (!await checkAuth())
			{
				props.history.push("/");
				return;
			}
			setLoading(false);

			// TODO actually trending
			const trendingHashtags = await axios.get(`${process.env.REACT_APP_BACKEND}/api/hashtags`);
			const trendingUsers = await axios.get(`${process.env.REACT_APP_BACKEND}/api/users`);
			setState({
				hashtags: trendingHashtags.data.hashtags.slice(0, 5),
				users: trendingUsers.data.users.slice(0, 5)
			});
		};
		checkLog();
	}, [props.history]);

	console.log(state);

	return (
		<>
			<Grid className={"main"} container>
				{/*Left Section*/}
				<Grid className={"main-aside"} component={"aside"} item xs={12} lg={2}>
					<NavBar />
				</Grid>

				{/*Tweets*/}
				<Grid component={"section"} item xs={12} lg={8}>
					{isLoading ? <PageLoader /> : props.children}
				</Grid>

				{/*Right Section*/}
				<Grid item xs={12} lg={2}>
					{isTabletOrMobileDevice || isPortrait || isLgBp ? null : (
						<Grid container justify={"center"} alignItems={"center"}>
							{/*Search Comment*/}
							<form noValidate autoComplete="off">
								<TextField fullWidth id="search-tweet" placeholder="Search Comment" InputProps={{
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
									<Typography variant={"h6"} component={"h2"} align={"center"}>
										Trending Hashtags
									</Typography>
									<List component="nav" aria-label="mailbox folders">
										{state.hashtags?.map(item => (
											<ListItem key={uuid.v4()} button divider>
												<ListItemText>
													<Typography className={"wordwrap"} variant={"subtitle1"} component={"h6"} align={"center"}>
														#{item.name}
													</Typography>
												</ListItemText>
											</ListItem>
										))}
									</List>
								</Grid>
							</Container>
							{/*Trending users*/}
							<Container>
								<Grid container className={"main-recommend"} direction={"column"} justify={"center"} alignItems={"center"}>
									<Typography variant={"h6"} component={"h2"} align={"center"}>
										Trending Users
									</Typography>
									<List component="nav" aria-label="mailbox folders">
										{state.users?.map(item => (
											<ListItem key={uuid.v4()} button divider>
												<ListItemText>
													<Typography className={"wordwrap"} variant={"subtitle1"} component={"h6"} align={"center"}>
														@{item.username}
													</Typography>
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

export default withRouter(Main);