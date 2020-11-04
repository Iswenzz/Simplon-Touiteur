/* eslint-disable no-template-curly-in-string */
import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TouiteurLogo from "../../assets/images/bird.png";
import "./NotLog.scss";

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

export function NotLog() {
	const classes = useStyles();

	return (

		<Container className={"notlog"} component="main" maxWidth="xs">
			<Grid container direction={"column"} justify={"center"} alignItems={"center"}>
				<img width={64} height={64} src={TouiteurLogo} alt={"Touiteur Logo"} className="touiteur--style"/>
				<Typography variant={"h3"} component={"h1"}>
					See what happening in the world right now!
				</Typography>
			</Grid>
			<div className={classes.paper}>
				<Typography variant={"h5"} className="h5--style">Not member yet? Register now!<br/>
				Not log? Just log in here!
				</Typography>
				<form className={classes.form} noValidate>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className= "btn"
					>
						Register
					</Button>
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
							<Link href="#" variant="body2" className="link--style">
								Forgot password?
							</Link>
						</Grid>

					</Grid>
				</form>
			</div>
		</Container>
	);
}

export default NotLog;