import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Grid, Typography, Tab, Tabs, Button, Paper, Box, Hidden, Divider } from "@material-ui/core";
import { CalendarToday, NavigateNext, } from "@material-ui/icons";
import EditProfile from "./EditProfile";
import Main from "../Main/Main";
import axios from "axios";
import "./Profile.scss";
import {withRouter} from "react-router";
import Avatar from "../../components/Avatar/Avatar";
import {randomImage} from "../../utils/utils";
import * as uuid from "uuid";
import LazyLoad from "react-lazyload";
import Tweet from "../Home/Tweet/Tweet";
import TabPanel from "../../components/TabPanel/TabPanel";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		position: "sticky",
		top: "0rem",
		marginBottom: "0rem",
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
		marginLeft: "1em",
	},
	tab: {
		minWidth: "100px",
		textTransform: "capitalize",
		borderBottomColor: "rgb(29, 161, 242)",
		"&:hover": {
			backgroundColor: "#1DA2F1",
			color: "#fff",
		},
		"&:focus": {
			backgroundColor: "#0078ff",
			color: "#fff",
		},
	},
	tabs: {
		flexGrow: 1,
		display: "flex",
		fontSize: "15px",
		width: "100%",
		"& .MuiTabs-indicator": {
			backgroundColor: "#1DA2F1",
		},
		[theme.breakpoints.down("xs")]: {
			minWidth: "80px",
		},
	},
	paper: {
		backgroundColor: "#ccc",
		backgroundSize: "cover !important",
		height: "12rem",
		top: "0rem",
		marginTop: "0rem",
	},
	horizontalDiv: {
		display: "flex",
		flexDirection: "row",
	},
	div1: {
		display: "flex",
		flexDirection: "row",
		marginTop: "0",
	},
	backArrow: {
		color: "rgba(29,161,242,1.00)",
	},
	avatarBox: {
		position: "relative",
		bottom: "1rem",
		top: "8rem",
		marginLeft: "0.7rem",
	},
	nameTypo: {
		color: "black",
		font: "inherit",
		fontWeight: "bold",
		fontSize: "20px",
	},
	linksDiv: {
		display: "flex",
		flexDirection: "row",
		marginBottom: "1rem",
	},
	links: {
		textDecoration: "none",
		font: "inherit",
		color: "white",
		fontWeight: "100px",
		fontSize: "15px",
	},
}));

const Profile = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [, setTab] = React.useState("Tweets");
	const [editProfile, setEditProfile] = React.useState(false);
	const [state, setState] = React.useState({});

	useEffect(() =>
	{
		// get user profile
		try
		{
			const fetchData = async () =>
			{
				const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/user/${props.match.params.id}`);
				console.log(response);
				setState({
					...response.data.user
				});
			};
			fetchData();
		}
		catch (e)
		{
			console.log(e);
		}
	}, [props.match.params.id]);

	/**
	 * On tab change callback.
	 */
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	/**
	 * Click on next arrow callback.
	 */
	const handleNextTab = () => {
		let newValue = value;
		if (newValue !== 3) {
			newValue = newValue + 1;
			setValue(newValue);
		}
	};

	/**
	 * Click on back arrow callback.
	 */
	// eslint-disable-next-line no-unused-vars
	const handleBackTab = () => {
		let newValue = value;
		if (newValue !== 0) {
			newValue = newValue - 1;
			setValue(newValue);
		}
	};

	/**
	 * Open the profile editor modal.
	 */
	const openProfileEditor = () => {
		setEditProfile(true);
	};

	return (
		<Main>
			<Grid className={"profile"} container justify="center">
				<section style={{ width: "100%", marginTop: "0px" }}>
					<Grid item xs={12}>
						<Grid item xs={12}>
							<Paper className={classes.paper} style={{background: `url(${randomImage()})`}}>
								<div className={classes.avatarBox}>
									<Box>
										<Avatar author={state} className={"profile-avatar"} />
									</Box>
								</div>
							</Paper>
						</Grid>
						<Grid style={{ marginLeft: "1rem" }} item xs={12}>
							<div
								style={{ justifyContent: "space-between" }}
								className={classes.horizontalDiv}
							>
								<div/>
								<Button onClick={openProfileEditor} className="btn"
									style={{ margin: "1em", visibility: props.match.params.id === localStorage.getItem("userid") ? "shown" : "hidden" }}>
									<span>Edit profile</span>
								</Button>
							</div>
							<div style={{ marginBottom: "1rem" }}>
								<div
									style={{ marginTop: "1rem" }}
									className={classes.horizontalDiv}
								>
								</div>
								<span>
									<Typography id="name" variant={"h5"} component={"span"}>
										{state.name}
									</Typography>
									<Typography id="username" variant={"subtitle1"} component={"span"}>
										<small>@{state.username}</small>
									</Typography>
								</span>
							</div>
							<div style={{ marginBottom: "1rem" }}>
								<span>
									<Typography variant={"h6"} component={"h6"} id="status">{state.bio}</Typography>
								</span>
							</div>
							<div style={{ marginBottom: "1rem" }}>
								<div className={classes.horizontalDiv}>
									<CalendarToday fontSize="small" />
									<div style={{width: "0.8rem"}}/>
									<Typography id="date-joined">Date Joined {state.createdAt}</Typography>
								</div>
							</div>
							<div className={classes.linksDiv}>
								<Link className={classes.links} to="/following">
									Following
								</Link>
								<div style={{width: "2.5rem"}}/>
								<Link className={classes.links} to="/followers">
									Followers
								</Link>
							</div>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid style={{ flexGrow: 1 }} item xs={12}>
							<div>
								<Tabs
									variant="fullWidth"
									component="nav"
									className={classes.tabs}
									value={value}
									indicatorColor="primary"
									onChange={handleChange}
								>
									<Tab
										tabIndex={0}
										label="Touits"
										onClick={() => setTab("Tweets")}
										className={classes.tab}
									/>
									<Tab
										tabIndex={1}
										label="Retouits"
										onClick={() => setTab("Tweets & replies")}
										className={classes.tab}
									/>
									<Tab
										tabIndex={2}
										label="Media"
										onClick={() => setTab("Media")}
										className={classes.tab}
									/>
									<Tab
										tabIndex={3}
										label="Likes"
										onClick={() => setTab("Likes")}
										className={classes.tab}
									/>
								</Tabs>
								<Divider />
								<Hidden smUp>
									<Button onClick={handleNextTab}>
										<NavigateNext className={classes.backArrow} />
									</Button>
								</Hidden>
							</div>
						</Grid>

					</Grid>
					{props.match.params.id === localStorage.getItem("userid") ? (
						<EditProfile
							open={editProfile}
							onClose={() => setEditProfile(false)}
							closeModal={() => setEditProfile(false)}
						/>
					) : null}
					<TabPanel value={value} index={0}>
						<Grid className={"profile-data"} container justify={"center"} alignItems={"center"}>
							<ul>
								{state.tweets?.slice(0).reverse().map(tweet => (
									<li key={uuid.v4()}>
										<LazyLoad height={200}>
											<Tweet author={state} tweet={tweet} />
										</LazyLoad>
									</li>
								))}
							</ul>
						</Grid>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Grid className={"profile-data"} container justify={"center"} alignItems={"center"}>
							<ul>
								{state.retweets?.slice(0).reverse().map(item => (
									<li key={uuid.v4()}>
										<LazyLoad height={200}>
											<Tweet author={item.user} tweet={item.tweet} />
										</LazyLoad>
									</li>
								))}
							</ul>
						</Grid>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Grid className={"profile-data"} container justify={"center"} alignItems={"center"}>
							<ul>
								{state.medias?.slice(0).reverse().map(media => (
									<li key={uuid.v4()}>
										<LazyLoad height={200}>

										</LazyLoad>
									</li>
								))}
							</ul>
						</Grid>
					</TabPanel>
					<TabPanel value={value} index={3}>
						<Grid className={"profile-data"} container justify={"center"} alignItems={"center"}>
							<ul>
								{state.likes?.slice(0).reverse().map(item => (
									<li key={uuid.v4()}>
										<LazyLoad height={200}>
											<Tweet author={item.user} tweet={item.tweet} />
										</LazyLoad>
									</li>
								))}
							</ul>
						</Grid>
					</TabPanel>
				</section>
			</Grid>
		</Main>
	);
};

export default withRouter(Profile);