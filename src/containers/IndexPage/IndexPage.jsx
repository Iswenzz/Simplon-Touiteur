import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TouiteurLogo from "../../components/TouiteurLogo/TouiteurLogo";
import {Container} from "@material-ui/core";
import Link from "../../components/Link/Link";
import "./IndexPage.scss";

export function IndexPage() {
	return (
		<Grid className={"index"} container direction={"column"} justify={"flex-start"} alignItems={"center"}>
			<figure>
				<TouiteurLogo />
			</figure>
			<Container maxWidth={"sm"}>
				<Typography className={"page-header"} variant={"h3"} component={"h1"}>
					See what's happening in the world right now!
				</Typography>
				<Link
					to={"/signup"}
					component={Button}
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className= "btn"
				>
					Register
				</Link>
				<Link
					to={"/signin"}
					component={Button}
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className= "btn"
				>
					Log in
				</Link>
			</Container>
		</Grid>
	);
}

export default IndexPage;