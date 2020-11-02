/* eslint-disable no-template-curly-in-string */
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TouiteurLogo from "../../assets/images/bird.png";
import "./SignIn.scss";

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
	},

	cssLabel: {
		color : "white"
	  },
	
	  cssOutlinedInput: {
		"&$cssFocused $notchedOutline": {
		  borderColor: "${theme.palette.primary.main} !important",
		}
	  },
	
	  cssFocused: {},
	
	  notchedOutline: {
		borderWidth: "1px",
		borderColor: "white !important"
	  },


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
						InputLabelProps={{
							classes: {
							  root: classes.cssLabel,
							  focused: classes.cssFocused,
							},
						  }}

						  InputProps={{
							classes: {
							  root: classes.cssOutlinedInput,
							  focused: classes.cssFocused,
							  notchedOutline: classes.notchedOutline,
							},
							inputMode: "numeric"
						  }}
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
						InputLabelProps={{
							classes: {
							  root: classes.cssLabel,
							  focused: classes.cssFocused,
							},
						  }}

						  InputProps={{
							classes: {
							  root: classes.cssOutlinedInput,
							  focused: classes.cssFocused,
							  notchedOutline: classes.notchedOutline,
							},
							inputMode: "numeric"
						  }}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className= "btn"
						// className= {classes.submit}
					>
						Log in
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2" className="link--style">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2" className="link--style">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}

export default SignIn;