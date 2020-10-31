import React, {useEffect} from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import Avatar from "../Avatar/Avatar";
import PropTypes from "prop-types";
import Media from "../Media/Media";
import Link from "../Link/Link";
import * as uuid from "uuid";
import "./Tweet.scss";

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
			<Link component={"section"} to={`/tweet/${props.user.id || 0}`}>
				<Grid className={"tweet-card"} container>
					<Grid item xs={3}>
						<Avatar id={props.user.id} />
					</Grid>
					<Grid item xs={9}>
						<Grid container direction={"column"}>
							<Typography variant={"h5"} component={"h5"}>
								<Link to={`/profile/${props.user.id || 0}`}>
									{props.user.name} @{props.user.username}
								</Link>
							</Typography>
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
			</Link>
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