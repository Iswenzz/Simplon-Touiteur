import React from "react";
import TouiteurLogo from "../../../components/TouiteurLogo/TouiteurLogo";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import {Bookmark, Explore, Notifications, Person} from "@material-ui/icons";
import { useMediaQuery } from "react-responsive/src";
import "./NavBar.scss";

/**
 * NavBar container.
 * @returns {JSX.Element}
 * @constructor
 */
export const NavBar = () =>
{
	const isTabletOrMobileDevice = useMediaQuery({ query: "(max-device-width: 1224px)" });
	const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

	const desktopNavbar = (
		<Grid className={"navbar"} component={"nav"} container direction={"column"} alignItems={"center"} justify={"center"}>
			<TouiteurLogo />
			<Grid container direction={"column"} justify={"center"} alignItems={"center"}>
				<Button size="large" color="primary" startIcon={<HomeIcon />}>
					Home
				</Button>
				<Button size="large" color="primary" startIcon={<Explore />}>
					Explore
				</Button>
				<Button size="large" color="primary" startIcon={<Notifications />}>
					Notification
				</Button>
				<Button size="large" color="primary" startIcon={<Bookmark />}>
					Bookmarks
				</Button>
				<Button size="large" color="primary" startIcon={<Person />}>
					Profile
				</Button>
			</Grid>
		</Grid>
	);

	const mobileNavbar = (
		<h2>TODO</h2>
	);

	return isTabletOrMobileDevice || isPortrait ? mobileNavbar : desktopNavbar;
};

export default NavBar;