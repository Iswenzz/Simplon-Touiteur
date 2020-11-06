import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import {
	Avatar,
	Backdrop,
	Button,
	Grid,
	IconButton,
	Modal,
	Paper,
	Typography
} from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import {Chat, Close, Favorite, Share} from "@material-ui/icons";
import Media from "../../components/Media/Media";
import TestImage from "../../assets/images/1500x500.jpg";
import Tweet from "../Home/Tweet/Tweet";
import Main from "../Main/Main";
import Link from "../../components/Link/Link";
import * as uuid from "uuid";
import "./TweetPage.scss";
import axios from "axios";
import {withRouter} from "react-router";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: "auto",
		borderBottomLeftRadius: "1rem",
		borderBottomRightRadius: "1rem",
		height: "70%",
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
		margin: "1em 0"
	},
	paper: {
		flexGrow: 1,
	},
	input: {
		display: "none",
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
	}
}));

export const replyFormInitial = {
	message: ""
};

export const ModalContent = (props) =>
{
	const classes = useStyles();

	const onReplySubmit = async (values) =>
	{
		// if the form as valid information send a post req
		if (Object.values(values).every(item => item !== undefined && item !== null))
		{
			// TODO comment a tweet
			try
			{
				const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/tweet/id/post`, {
					...values
				});
				console.log(response);
			}
			catch (err)
			{
				console.log(err);
			}
		}
		props.closeModal();
	};

	return (
		<>
			<Grid component="nav" className={classes.header} item>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<IconButton onClick={props.closeModal}>
						<Close className={classes.icon} />
					</IconButton>
				</div>
			</Grid>
			<Grid container className={classes.root}>
				<Paper className={classes.paper}>
					{/*Tweet*/}
					<Grid className={"reply-card"} container>
						<Grid item xs={2} md={1}>
							<Grid container justify={"center"} alignItems={"center"}>
								<Avatar id={props.user.id} />
							</Grid>
						</Grid>
						<Grid item xs={9} md={10}>
							<Grid container direction={"column"}>
								<Link to={`/profile/${props.user.id || 0}`}>
									<Typography className={"reply-card-name"} variant={"h5"} component={"span"}>
										{props.user.name}
									</Typography>
									<Typography className={"reply-card-username"} variant={"h5"} component={"span"}>
										@{props.user.username}
									</Typography>
								</Link>
								<Typography variant={"subtitle1"} component={"p"} paragraph>
									{props.tweet.content}
								</Typography>
								<ul>
									{props.medias?.map(e => (
										<li key={uuid.v4()}>{e}</li>
									))}
								</ul>
							</Grid>
						</Grid>
					</Grid>
					{/*Reply*/}
					<Grid className={"reply-card"} container>
						<Grid item xs={2} md={1}>
							<Grid container justify={"center"} alignItems={"center"}>
								<Avatar id={props.user.id} />
							</Grid>
						</Grid>
						<Grid item xs={10} md={11}>
							<Formik initialValues={replyFormInitial} onSubmit={onReplySubmit}>
								<Form className={classes.form} noValidate>
									<Grid container justify={"center"} alignItems={"center"}>
										<Field
											component={TextField}
											name="message"
											variant="filled"
											fullWidth
											id="reply"
											placeholder={"Touit your reply"}
											autoFocus
											multiline
										/>
									</Grid>
									<Button color={"primary"} type={"submit"} variant={"contained"} className={classes.btn}>
										Touit
									</Button>
								</Form>
							</Formik>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</>
	);
};

export const TweetPage = (props) =>
{
	const classes = useStyles();
	const [state, setState] = useState({
		user: {
			name: "Red",
			username: "redred",
			date: "26/10/2020"
		},
		tweet: {
			content: "I love you more than pizza 🍕"
		},
		medias: [
			<Media media={TestImage} />
		]
	});
	const [replyModalOpen, setReplyModalOpen] = React.useState(false);
	const ref = React.createRef();

	useEffect(() =>
	{
		// @TODO get the user tweet + comments
	}, []);

	/**
	 * Modal close callback.
	 */
	const handleClose = () => setReplyModalOpen(false);

	/**
	 * Modal open callback.
	 */
	const handleOpen = () => setReplyModalOpen(true);

	return (
		<Main {...props}>
			<Tweet {...state} />
			<section>
				{/*Test Reply Button*/}
				<Grid className={"tweetpage-icons"} container justify={"space-around"}
					  alignItems={"center"}>
					<IconButton aria-label="comments" onClick={handleOpen}>
						<Chat />
					</IconButton>
					<IconButton aria-label="likes">
						<Favorite />
					</IconButton>
					<IconButton aria-label="share">
						<Share />
					</IconButton>
				</Grid>
				<Modal
					ref={ref}
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={replyModalOpen}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<ModalContent closeModal={handleClose} {...state} />
				</Modal>
			</section>
		</Main>
	);
};

export default withRouter(TweetPage);