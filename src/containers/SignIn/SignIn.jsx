import React from "react";
import Button from "@material-ui/core/Button";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "../../components/Link/Link";
import TouiteurLogo from "../../components/TouiteurLogo/TouiteurLogo";
import axios from "axios";
import "./SignIn.scss";

const useStyles = makeStyles((theme) => ({
	paper: {
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

export const signInFormInitial = {
	username: "",
	password: ""
};

export const SignIn = () =>
{
	const classes = useStyles();

	/**
	 * Log the user.
	 */
	const onSubmit = async (values, { setSubmitting }) =>
	{
		// if the form as valid information send a post req
		if (Object.values(values).every(item => item !== undefined && item !== null))
		{
			try
			{
				const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/login`, {
					...values
				});
				if (response.status === 200)
					localStorage.setItem("auth", response.data.token);
			}
			catch (err)
			{
				console.log(err);
			}
		}
	};

	return (
		<Container className={"signin"} component="main" maxWidth="xs">
			<div className={classes.paper}>
				<TouiteurLogo />
				<Typography className={"page-header"} variant={"h3"} component={"h1"}>
					LOGIN
				</Typography>
				<Formik initialValues={signInFormInitial} onSubmit={onSubmit}>
					<Form className={classes.form}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Field
									component={TextField}
									variant="outlined"
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoComplete="username"
									type="text"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<Field
									component={TextField}
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className="btn"
								>
									Log in
								</Button>
							</Grid>
						</Grid>
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
					</Form>
				</Formik>
			</div>
		</Container>
	);
};

export default SignIn;