/* eslint-disable no-template-curly-in-string */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import { Grid, Typography } from "@material-ui/core";
import TouiteurLogo from "../../assets/images/bird.png";
import "./Profil.scss";

export const Profil = () => {
	return (
		<Grid container direction={"column"} justify={"center"} alignItems={"center"}>
			<img width={64} height={64} src={TouiteurLogo} alt={"Touiteur Logo"} className="touiteur--style" />
			<Typography variant={"h3"} component={"h1"}>
				Deb Phoenix
			</Typography>
		</Grid>

	);
};


const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
}));

export function LetterAvatars() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Avatar className={classes.purple}>DP</Avatar>
		</div>
	);
}

export default Profil;
