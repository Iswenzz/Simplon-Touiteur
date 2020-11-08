import React from "react";
import TouiteurLogo from "../../../components/TouiteurLogo/TouiteurLogo";
import {Grid} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import {Bookmark, ExitToApp, Explore, Notifications, Person} from "@material-ui/icons";
import { useMediaQuery } from "react-responsive/src";
import {makeStyles} from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SettingIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";
import Link from "../../../components/Link/Link";
import ButtonLink from "../../../components/ButtonLink/ButtonLink";
import "./NavBar.scss";
import {useHistory} from "react-router";
import axios from "axios";

const useStyles = makeStyles({
	root: {
		backgroundColor:"#1da2f1",
	}
});

/**
 * NavBar container.
 * @returns {JSX.Element}
 * @constructor
 */
export const NavBar = () =>
{
	const classes = useStyles();
	const [value, setValue] = React.useState("tweet");
	const isLgBp = useMediaQuery({ query: "(max-width: 1280px)" });
	const isTabletOrMobileDevice = useMediaQuery({ query: "(max-device-width: 1224px)" });
	const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
	const history = useHistory();

	/**
	 * Handle mobile navbar buttons
	 * @param event - The buttons change event.
	 * @param newValue - The new value.
	 */
	const handleChange = (event, newValue) => 
	{
		setValue(newValue);
	};

	/**
	 * Logout click callback.
	 */
	const logoutHandler = () =>
	{
		localStorage.setItem("auth", null);
		axios.defaults.headers.common["Authorization"] = "Bearer logout";
		history.push("/");
	};

	const desktopNavbar = (
		<Grid className={"navbar"} component={"nav"} container direction={"column"} alignItems={"center"} justify={"center"}>
			<TouiteurLogo />
			<Grid container direction={"column"} justify={"center"} alignItems={"center"}>
				<Link to={"/home"} component={ButtonLink} size="large" color="primary" startIcon={<HomeIcon />}>
					Home
				</Link>
				<Link to={"/home"} component={ButtonLink} size="large" color="primary" startIcon={<Explore />}>
					Explore
				</Link>
				<Link to={"/home"} component={ButtonLink} size="large" color="primary" startIcon={<Notifications />}>
					Notification
				</Link>
				<Link to={"/home"} component={ButtonLink} size="large" color="primary" startIcon={<Bookmark />}>
					Bookmarks
				</Link>
				<Link to={`/profile/${localStorage.getItem("userid") || 0}`} component={ButtonLink} size="large" color="primary" startIcon={<Person />}>
					Profile
				</Link>
				<ButtonLink size="large" color="primary" startIcon={<ExitToApp />} onClick={logoutHandler}>
					Logout
				</ButtonLink>
			</Grid>
		</Grid>
	);

	const mobileNavbar = (
		<nav className="navbar-mobile">
			<BottomNavigation showLabels component={"section"} value={value} onChange={handleChange} className={classes.root}>
				<BottomNavigationAction label="Settings" value="settings" icon={<SettingIcon />} component={Link} to="/profile" />
				<BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} component={Link} to="/home" />
				<BottomNavigationAction label="Comment" value="tweet" icon={<CreateIcon />} component={Link} to="/post" />
			</BottomNavigation>
		</nav>
	);

	return isTabletOrMobileDevice || isPortrait || isLgBp ? mobileNavbar : desktopNavbar;
};

export default NavBar;