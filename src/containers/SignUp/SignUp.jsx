import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import Link from "../../components/Link/Link";
import TouiteurLogo from "../../components/TouiteurLogo/TouiteurLogo";
import axios from "axios";
import {checkAuth} from "../../api/auth";
import {withRouter} from "react-router";
import PageLoader from "../../components/PageLoader/PageLoader";
import "./SignUp.scss";

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

export const signUpFormInitial = {
	firstname: "",
	lastname: "",
	username: "",
	email: "",
	password: ""
};

export const SignUp = (props) =>
{
	const classes = useStyles();
	const [isLoading, setLoading] = useState(true);

	useEffect(() =>
	{
		checkLog();
	}, []);

	const checkLog = async () =>
	{
		if (!await checkAuth())
		{
			setLoading(false);
			return;
		}
		props.history.push("/home");
	};

	/**
	 * Register the user on form submit.
	 */
	const onSubmit = async (values, { setSubmitting }) =>
	{
		// if the form as valid information send a post req
		if (Object.values(values).every(item => item !== undefined && item !== null))
		{
			try
			{
				const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/register`, {
					...values
				});
			}
			catch (err)
			{
				console.log(err);
			}
		}
	};

	return isLoading ? <PageLoader /> : (
		<Container className={"signup"} component="main" maxWidth="xs">
			<div className={classes.paper}>
				<TouiteurLogo />
				<Typography className={"page-header"} component="h1" variant="h3">
					SIGN UP
				</Typography>
				<Formik initialValues={signUpFormInitial} onSubmit={onSubmit}>
					<Form>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<Field
									component={TextField}
									autoComplete="fname"
									name="firstname"
									variant="outlined"
									required
									fullWidth
									id="firstname"
									label="First Name"
									autoFocus
									type="text"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Field
									component={TextField}
									variant="outlined"
									required
									fullWidth
									id="lastname"
									label="Last Name"
									name="lastname"
									autoComplete="lname"
									type="text"
								/>
							</Grid>
							<Grid item xs={12}>
								<Field
									component={TextField}
									variant="outlined"
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoComplete="uname"
									type="text"
								/>
							</Grid>
							<Grid item xs={12}>
								<Field
									component={TextField}
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									type="email"
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
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link to={"/signin"}>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</div>
		</Container>
	);
};

export default withRouter(SignUp);