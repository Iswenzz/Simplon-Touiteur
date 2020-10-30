import React from "react";
import "./Home.scss";
import {Grid, Typography} from "@material-ui/core";
import TouiteurLogo from "../../assets/images/bird.png";

export const Home = () =>
{
	return (
		<Grid container direction={"column"} justify={"center"} alignItems={"center"}>
			<img width={64} height={64} src={TouiteurLogo} alt={"Touiteur Logo"} />
			<Typography variant={"h3"} component={"h1"}>
				Home Page
			</Typography>
		</Grid>
	);
};

export default Home;