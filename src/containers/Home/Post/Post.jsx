import React, {useState} from "react";
import {Button, Container, Grid} from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import GifIcon from "@material-ui/icons/Gif";
import Link from "../../../components/Link/Link";
import Avatar from "../../../components/Avatar/Avatar";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import PropTypes from "prop-types";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import "./Post.scss";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router";

export const postFormInitial = {
	content: ""
};

/**
 * Post a tweet.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const Post = (props) =>
{
	const [formMessage, setFormMessage] = useState(null);
	const history = useHistory();

	/**
	 * Post tweet callback.
	 */
	const onSubmit = async (values) =>
	{
		// if the form as valid information send a post req
		if (Object.values(values).every(item => item !== undefined && item !== null))
		{
			try
			{
				const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/tweet`, {
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
			// post callback
			if (props.onPost)
				props.onPost();

			// redirect if on /post page
			if (history.location.pathname === "/post")
				history.push("/home");
		}
	};

	return (
		<Container component={"article"} className={`tweetBox ${props.className}`}>
			<Formik initialValues={postFormInitial} onSubmit={onSubmit}>
				<Form>
					<Grid container>
						<Grid item xs={2} md={1}>
							<Grid container justify={"center"} alignItems={"center"}>
								<Avatar id={props.user.username} />
							</Grid>
						</Grid>
						<Grid item xs={10} md={11}>
							<Field
								component={TextField}
								name="content"
								className="input"
								placeholder="What's new?"
								type="text"
								multiline
								fullWidth
								rows={props.rows || 4}
							/>
							<span className="total-words--style">0/140 characters</span>
						</Grid>
					</Grid>
					<Grid className={"tweetBox__icons"} container justify={"space-between"} alignItems={"center"}>
						<section>
							<Link to={"/home"}>
								<IconButton aria-label="emojis">
									<EmojiEmotionsIcon/>
								</IconButton>
							</Link>
							<Link to={"/home"}>
								<IconButton aria-label="medias">
									<AddAPhotoIcon/>
								</IconButton>
							</Link>
							<Link to={"/home"}>
								<IconButton aria-label="gifs">
									<GifIcon/>
								</IconButton>
							</Link>
						</section>
						<section>
							<Button color={"primary"} variant={"contained"} type={"submit"} className="btn">Tweet</Button>
						</section>
					</Grid>
					<Grid container>
						<Typography color={"secondary"} align={"center"} variant={"h6"} component={"h3"}>
							{formMessage}
						</Typography>
					</Grid>
				</Form>
			</Formik>
		</Container>
	);
};
Post.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		username: PropTypes.string,
		avatar: PropTypes.number
	}),
	rows: PropTypes.number,
	onPost: PropTypes.func
};

export default Post;