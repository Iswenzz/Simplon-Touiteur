import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Paper, TextField, Fab, Button,
	IconButton, Typography, Modal, Backdrop, Avatar, Box,
} from "@material-ui/core";
import { CameraAlt, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: "auto",
		borderBottomLeftRadius: "1rem",
		borderBottomRightRadius: "1rem",
		height: "90%",
		[theme.breakpoints.down("md")]: {
			width: "100%"
		},
		[theme.breakpoints.up("lg")]: {
			width: "50%"
		},
		overflowY: "auto",
		overflowX: "hidden",
	},
	header: {
		marginTop: "2.5rem",
		display: "flex",
		margin: "auto",
		justifyContent: "space-between",
		flexDirection: "row",
		backgroundColor: "rgb(40, 40, 40)",
		borderTopLeftRadius: "1rem",
		borderTopRightRadius: "1rem",
		[theme.breakpoints.down("md")]: {
			width: "100%"
		},
		[theme.breakpoints.up("lg")]: {
			width: "50%"
		},
	},
	form: {
		width: "100%",
		marginTop: "6rem",
	},
	paper: {
		flexGrow: 1,
	},
	avatarBox: {
		position: "relative",
		bottom: "1rem",
		top: "0rem",
		marginLeft: "0.7rem",
	},
	avatar: {
		border: "3px solid white",
		height: "8rem",
		width: "8rem",
		marginTop: "0rem",
	},
	input: {
		display: "none",
	},
	darkArea: {
		backgroundColor: "rgb(204, 214, 221)",
		height: "12rem",
		opacity: "0.75",
	},
	icon: {
		color: "rgba(29,161,242,1.00)",
		height: "2rem",
		width: "2rem",
	},
	btnDiv: {
		width: "5rem",
	},
	btn: {
		backgroundColor: "rgba(29,161,242,1.00)",
		color: "white",
		fontWeight: "bold",
		fontSize: "15px",
		marginTop: "0.7rem",
		marginRight: "1rem",
		textTransform: "capitalize",
		"&:hover": {
			backgroundColor: "rgba(29,161,242,1.00)",
		},
		"&:focus": {
			backgroundColor: "rgba(29,161,242,1.00)",
		},
	},
	typo: {
		font: "inherit",
		fontSize: "25px",
		fontWeight: "bold",
		alignSelf: "center"
	},
	textField: {
		width: "90%",
		marginLeft: "5%",
		height: "15%",
	},
	camera: {
		marginLeft: "50%",
		marginTop: "4rem",
	},
}));

const ModalContent = (props) => {
	const classes = useStyles();

	return (
		<>
			<Grid component="nav" className={classes.header} item>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<IconButton onClick={props.closeModal}>
						<Close className={classes.icon} />
					</IconButton>
					<Typography className={classes.typo} variant="h4">
						Edit profile
					</Typography>
				</div>
				<Fab
					variant="extended"
					size="small"
					className={classes.btn}
					type="submit"
				>
					<div className={classes.btnDiv}>
						<span>Save</span>
					</div>
				</Fab>
			</Grid>
			<Grid container className={classes.root}>
				<Paper className={classes.paper}>
					<Grid className={classes.darkArea} item>
						<input
							accept="image/*"
							className={classes.input}
							id="contained-button-file"
							multiple
							type="file"
						/>
						<label htmlFor="contained-button-file">
							<IconButton
								className={classes.camera}
								aria-label="upload picture"
								component="span"
							>
								<CameraAlt className={classes.icon} />
							</IconButton>
						</label>
						<div className={classes.avatarBox}>
							<Box>
								<Avatar className={classes.avatar}>
									<input
										accept="image/*"
										className={classes.input}
										id="contained-button-file"
										multiple
										type="file"
									/>
									<label htmlFor="contained-button-file">
										<IconButton aria-label="upload picture" component="span">
											<CameraAlt className={classes.icon} />
										</IconButton>
									</label>
								</Avatar>
							</Box>
						</div>
					</Grid>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									name="Name"
									variant="filled"
									fullWidth
									id="Name"
									label="Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									name="Bio"
									variant="filled"
									multiline
									fullWidth
									id="Bio"
									label="Bio"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									name="location"
									variant="filled"
									fullWidth
									placeholder="Add your location"
									id="location"
									label="Location"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									className={classes.textField}
									name="website"
									variant="filled"
									placeholder="Add your website"
									fullWidth
									id="website"
									label="Website"
									autoFocus
								/>
							</Grid>
						</Grid>
					</form>
					<Grid item xs={12}>
						<div style={{ marginLeft: "5%" }}>
							<Typography>
								Birth date.{" "}
								<Button
									style={{
										color: "rgba(29,161,242,1.00)",
										textTransform: "capitalize",
									}}
								>
									Edit
								</Button>
							</Typography>
						</div>
						<div style={{ marginLeft: "5%" }}>
							<Typography>Add your date of birth</Typography>
						</div>
					</Grid>
				</Paper>
			</Grid>
		</>
	);
};

const EditProfile = (props) => {
	const classes = useStyles();
	const ref = React.createRef();

	return (
		<Modal
			ref={ref}
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={props.open}
			onClose={props.onClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<ModalContent closeModal={props.closeModal} />
		</Modal>
	);
};

export default EditProfile;