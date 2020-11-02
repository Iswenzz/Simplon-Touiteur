/* eslint-disable no-template-curly-in-string */
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TouiteurLogo from "../../assets/images/bird.png";
import "./SignIn.scss";
import Link from "../../components/Link/Link";

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

export function SignIn() {
	const classes = useStyles();

	return (

		<Container className={"signin"} component="main" maxWidth="xs">
			<Grid container direction={"column"} justify={"center"} alignItems={"center"}>
				<img width={64} height={64} src={TouiteurLogo} alt={"Touiteur Logo"} className="touiteur--style"/>
				<Typography variant={"h3"} component={"h1"}>
					LOGIN
				</Typography>
			</Grid>
			<div className={classes.paper}>
				<form className={classes.form} noValidate>
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
}

export default SignIn;