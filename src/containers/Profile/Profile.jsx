import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Grid, Typography, Tab, Tabs, Button, Paper, Avatar, Box, Hidden, Divider } from "@material-ui/core";
import { CalendarToday, NavigateBefore, NavigateNext, } from "@material-ui/icons";
import PhoenixAvatar from "../../assets/images/avatar.png";
import EditProfile from "./EditProfile";
import Main from "../Main/Main";
import "./Profile.scss";

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
	avatar: {
		border: "3px solid white",
		height: "8rem",
		width: "8rem",
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
	const [tab, setTab] = React.useState("Tweets");
	const [editProfile, setEditProfile] = React.useState(false);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleNextTab = () => {
		let newValue = value;
		if (newValue !== 3) {
			newValue = newValue + 1;
			setValue(newValue);
		}
	};

	const handleBackTab = () => {
		let newValue = value;
		if (newValue !== 0) {
			newValue = newValue - 1;
			setValue(newValue);
		}
	};

	const openProfileEditor = () => {
		setEditProfile(true);
	};

	return (
		<Main>
			<Grid className={"profile"} container justify="center" spacing={1}>
				<main style={{ width: "100%", marginTop: "0px" }}>
					<Grid item xs={12}>
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<div className={classes.avatarBox}>
									<Box>
										<Avatar className={classes.avatar}>B</Avatar>
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
								<Button onClick={openProfileEditor} className="btn">
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
									<Typography id="username">
										<small>@Blueblue</small>
									</Typography>
								</span>
							</div>
							<div style={{ marginBottom: "1rem" }}>
								<span>
									<Typography variant={"h6"} component={"h6"} id="status">"I'm blue & this is
								my bio"</Typography>
								</span>
							</div>
							<div style={{ marginBottom: "1rem" }}>
								<div className={classes.horizontalDiv}>
									<CalendarToday fontSize="small" />
									<div style={{width: "0.8rem"}}/>
									<Typography id="date-joined">Date Joined</Typography>
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
										label="Tweets"
										onClick={() => setTab("Tweets")}
										className={classes.tab}
									/>
									<Tab
										tabIndex={1}
										label="Tweets & replies"
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
					<EditProfile
						open={editProfile}
						onClose={() => setEditProfile(false)}
						closeModal={() => setEditProfile(false)}
					/>
				</main>

				<Grid container spacing={1}>
					<Grid item xs={2}  className="avatarFeed--style">
						<div>
							<Avatar alt="Déb Phoenix" src={PhoenixAvatar} className={classes.large}/>
						</div>
					</Grid>
					<Grid item xs={10}>
						<div>Deb Phoenix @deb__phoenix - 26/10/2020</div>
						<div style={{ marginRight: "1em" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
					</Grid>
				</Grid>
			</Grid>
		</Main>
	);
};

export default Profile;