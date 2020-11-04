import React from "react";
import {Button, Container, Grid} from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import GifIcon from "@material-ui/icons/Gif";
import Link from "../../../components/Link/Link";
import Avatar from "../../../components/Avatar/Avatar";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import PropTypes from "prop-types";
import "./Post.scss";
import axios from "axios";
import {Favorite} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import PostPage from "../../PostPage/PostPage";

export const postFormInitial = {
	message: ""
};

/**
 * Post a tweet.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const Post = (props) =>
{
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
				const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/tweet/post`, {
					...values
				});
				console.log(response);
			}
			catch (err)
			{
				console.log(err);
			}
		}
	};

	return (
		<Container component={"article"} className={`tweetBox ${props.className}`}>
			<Formik initialValues={postFormInitial} onSubmit={onSubmit}>
				<Form>
					<Grid container>
						<Grid item xs={2} md={1}>
							<Grid container justify={"center"} alignItems={"center"}>
								<Avatar id={props.user.id} />
							</Grid>
						</Grid>
						<Grid item xs={10} md={11}>
							<Field
								component={TextField}
								name="message"
								className="input"
								placeholder="What's happening"
								type="text"
								multiline
								fullWidth
								rows={props.rows || 4}
							/>
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
							<Button color={"primary"} variant={"contained"} type={"submit"} className={"tweetBox__submit"}>Tweet</Button>
						</section>
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
	rows: PropTypes.number
};

export default Post;