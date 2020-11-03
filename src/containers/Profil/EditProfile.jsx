import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Container, Grid, Paper, TextField, Fab, Button,
	IconButton, Typography, Modal, Backdrop, Avatar, Box,
}
	from "@material-ui/core";
import { CameraAlt, Close } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "50%",
		height: "90%",
		marginTop: "2.5rem",
		borderRadius: "1rem",
		font: "inherit",
		marginLeft: "2.5rem",
		[theme.breakpoints.up("sm")]: {
			margin: "2.5rem auto",
		},
		[theme.breakpoints.up("md")]: {
			margin: "2.5rem auto",
		},
		overflowY: "scroll",
		overflowX: "Hidden",
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
		marginTop: "1rem",
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
	header: {
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	typo: {
		font: "inherit",
		fontSize: "25px",
		marginTop: "1rem",
		fontWeight: "bold",
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
	const ref = React.forwardRef();
	return (
		<Grid container className={classes.root}>
			<Paper className={classes.paper}>
				<Grid component="nav" className={classes.header} item>
					<div style={{ display: "flex", flexDirection: "row" }}>
						<IconButton ref={ref} onClick={props.closeModal}>
							<Close className={classes.icon} />{" "}
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
								required
								placeholder="Add your website"
								fullWidth
								id="website"
								label="website"
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
	);
};

const EditProfile = (props) => {
	const classes = useStyles();
	const ref = React.createRef();
	return (
		<Container className={classes.root} maxWidth="xs">
			<Grid item>
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
			</Grid>
		</Container>
	);
};

export default EditProfile;