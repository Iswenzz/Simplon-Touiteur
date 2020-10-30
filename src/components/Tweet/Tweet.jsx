import React, {useEffect} from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import Avatar from "../Avatar/Avatar";
import PropTypes from "prop-types";
import "./Tweet.scss";
import Media from "../Media/Media";

/**
 * Tweet component.
 * @param props
 * @constructor
 */
export const Tweet = (props) =>
{
	useEffect(() =>
	{
		// @TODO get the user tweet
	}, []);

	return (
		<Container className={"tweet"} maxWidth={"sm"}>
			<Grid container>
				<Grid item xs={3}>
					<Avatar />
				</Grid>
				<Grid item xs={9}>
					<Grid container direction={"column"}>
						<Typography variant={"h5"} component={"h5"}>
							{props.user.name} @{props.user.username}
						</Typography>
						<Typography variant={"subtitle1"} component={"p"} paragraph>
							{props.tweet.content}
						</Typography>
						{props.medias}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

Tweet.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		username: PropTypes.string,
		avatar: PropTypes.number
	}),
	tweet: PropTypes.shape({
		id: PropTypes.number,
		content: PropTypes.string
	}),
	medias: PropTypes.arrayOf(PropTypes.instanceOf(Media))
};

export default Tweet;