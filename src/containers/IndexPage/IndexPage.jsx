import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TouiteurLogo from "../../components/TouiteurLogo/TouiteurLogo";
import {Container} from "@material-ui/core";
import Link from "../../components/Link/Link";
import {checkAuth} from "../../api/auth";
import {withRouter} from "react-router";
import PageLoader from "../../components/PageLoader/PageLoader";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import "./IndexPage.scss";

export const IndexPage = (props) =>
{
	const [isLoading, setLoading] = useState(true);

	useEffect(() =>
	{
		const checkLog = async () =>
		{
			if (!await checkAuth())
			{
				setLoading(false);
				return;
			}
			props.history.push("/home");
		};
		checkLog();
	}, [props.history]);

	return isLoading ? <PageLoader /> : (
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
					component={ButtonLink}
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
					component={ButtonLink}
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
};

export default withRouter(IndexPage);