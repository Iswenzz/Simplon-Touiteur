import React, {memo} from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import Avatar from "../../../components/Avatar/Avatar";
import Link from "../../../components/Link/Link";
import * as uuid from "uuid";
import IconButton from "@material-ui/core/IconButton";
import {Chat, Favorite, Share} from "@material-ui/icons";
import PropTypes from "prop-types";
import "./Tweet.scss";

/**
 * Comment component.
 * @param props
 * @constructor
 */
export const Tweet = (props) =>
{
	return (
		<Container className={"tweet"}>
			<Link component={"section"} to={`/tweet/${props.tweet.id || 1}`}>
				<Grid className={"tweet-card"} container>
					<Grid item xs={2} md={1}>
						<Grid container justify={"center"} alignItems={"center"}>
							<Avatar author={props.author} />
						</Grid>
					</Grid>
					<Grid item xs={10} md={11}>
						<Grid container direction={"column"}>
							<Link to={`/profile/${props.author.username || 1}`}>
								<Typography className={"tweet-card-name"} variant={"h5"} component={"span"}>
									{props.author.name}
								</Typography>
								<Typography className={"tweet-card-username"} variant={"h5"} component={"span"}>
									@{props.author.username}
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
							<Grid container justify={"flex-end"} alignItems={"center"}>
								<section>
									<IconButton aria-label="likes">
										<Favorite />
									</IconButton>
									<Typography variant={"subtitle1"} paragraph component={"span"}>
										0
									</Typography>
								</section>
								<section>
									<IconButton aria-label="comments">
										<Chat />
									</IconButton>
									<Typography variant={"subtitle1"} paragraph component={"span"}>
										0
									</Typography>
								</section>
								<section>
									<IconButton aria-label="share">
										<Share />
									</IconButton>
								</section>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Link>
		</Container>
	);
};

Tweet.propTypes = {
	author: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		username: PropTypes.string,
		avatar: PropTypes.shape({
			id: PropTypes.number,
			url: PropTypes.string
		})
	}),
	tweet: PropTypes.shape({
		id: PropTypes.number,
		content: PropTypes.string
	}),
	medias: PropTypes.arrayOf(PropTypes.instanceOf(Object))
};

export default memo(Tweet);