import "date-fns";
import React, {useRef, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Paper, Fab,
	IconButton, Typography, Modal, Backdrop, Avatar, Box,
} from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { CameraAlt, Close } from "@material-ui/icons";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: "auto",
		borderBottomLeftRadius: "1rem",
		borderBottomRightRadius: "1rem",
		height: "80%",
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

export const editFormInitial = {
	banner: "",
	avatar: "",
	name: "",
	bio: "",
	location: "",
	birthdate: ""
};

export const ModalContent = (props) =>
{
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = React.useState(null);
	const [formMessage, setFormMessage] = useState(null);
	const formRef = useRef();

	/**
	 * Edit the user profile.
	 */
	const onEditSubmit = async (values, { setSubmitting }) =>
	{
		// if the form as valid information send a post req
		if (Object.values(values).every(item => item !== undefined && item !== null))
		{
			try
			{
				// TODO update user profile
				const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/id`, {
					...values
				});
				console.log(response);
				setFormMessage(null);
			}
			catch (err)
			{
				setFormMessage(err.response.data.message);
				console.log(err);
			}
		}
		props.closeModal();
	};

	/**
	 * Date picker change callback.
	 * @param date - The selected date.
	 */
	const handleDateChange = (date) => setSelectedDate(date);

	/**
	 * Save profile button click callback.
	 */
	const onSaveClick = () =>
	{
		if (formRef.current)
			formRef.current.handleSubmit();
	};

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
					<div className={classes.btnDiv} onClick={onSaveClick}>
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
							name="banner"
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
										type="file"
										name="avatar"
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
					<Formik innerRef={formRef} initialValues={editFormInitial} onSubmit={onEditSubmit}>
						<Form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Field
										component={TextField}
										className={classes.textField}
										name="name"
										variant="filled"
										fullWidth
										id="Name"
										label="Name"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										component={TextField}
										className={classes.textField}
										name="bio"
										variant="filled"
										multiline
										fullWidth
										id="Bio"
										label="Bio"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										component={TextField}
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
							</Grid>
							<Grid item xs={12}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										className={classes.textField}
										margin="normal"
										id="date-picker-dialog"
										label="BirthDate"
										format="MM/dd/yyyy"
										variant="filled"
										inputVariant="filled"
										value={selectedDate}
										onChange={handleDateChange}
										KeyboardButtonProps={{
											"aria-label": "change date",
										}}
									/>
								</MuiPickersUtilsProvider>
							</Grid>
							<Grid container>
								<Typography color={"secondary"} align={"center"} variant={"h6"} component={"h3"}>
									{formMessage}
								</Typography>
							</Grid>
						</Form>
					</Formik>
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