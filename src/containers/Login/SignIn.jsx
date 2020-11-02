/* eslint-disable no-template-curly-in-string */
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "../../components/Link/Link";
import "./SignIn.scss";
import TouiteurLogo from "../../components/TouiteurLogo/TouiteurLogo";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	}
}));

export const SignIn = () =>
{
	const classes = useStyles();

	/**
	 * On form submit callback.
	 * @param e - The form event.
	 */
	const onSubmit = (e) =>
	{
		e.preventDefault();
	};

	return (
		<Container className={"signin"} component="main" maxWidth="xs">
			<div className={classes.paper}>
				<TouiteurLogo />
				<Typography variant={"h3"} component={"h1"}>
					LOGIN
				</Typography>
				<form className={classes.form} onSubmit={onSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className= "btn"
					>
						Log in
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to={"/forgot"}>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link to={"/signup"}>
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default SignIn;