import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import SettingIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles( {root: { width: 500, backgroundColor:"#1da2f1", }, });
//LabelBottomNavigation
export default function Footer() {
	const classes = useStyles();
	const [value, setValue] = React.useState("tweet");
	const handleChange = (event, newValue) => {
		setValue(newValue);	
	};
	
	return (
		<div className="footer">
			<BottomNavigation value={value} onChange={handleChange} className={classes.root}>
    		<BottomNavigationAction label="Settings" value="settings" icon={<SettingIcon />} component={Link} to='/settings' />
    		<BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} component={Link} to='/' />
    		<BottomNavigationAction label="Tweet" value="tweet" icon={<CreateIcon />} component={Link} to='/feed' />
			</BottomNavigation>
		</div>
		
	);
}
	