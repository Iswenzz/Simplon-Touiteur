import React, {memo} from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import Avatar from "../../../components/Avatar/Avatar";
import Link from "../../../components/Link/Link";
import * as uuid from "uuid";
import PropTypes from "prop-types";
import "./Comment.scss";

/**
 * Comment component.
 * @param props
 * @constructor
 */
export const Comment = (props) =>
{
	return (
		<Container className={"comment"}>
			<section>
				<Grid className={"comment-card"} container>
					<Grid item xs={2} md={1}>
						<Grid container justify={"center"} alignItems={"center"}>
							<Avatar author={props.author} />
						</Grid>
					</Grid>
					<Grid item xs={10} md={11}>
						<Grid container direction={"column"}>
							<Link to={`/profile/${props.author.username || 1}`}>
								<Typography className={"comment-card-name"} variant={"h5"} component={"span"}>
									{props.author.name}
								</Typography>
								<Typography className={"comment-card-username"} variant={"h5"} component={"span"}>
									@{props.author.username}
								</Typography>
							</Link>
							<Typography variant={"subtitle1"} component={"p"} paragraph>
								{props.content}
							</Typography>
							<ul>
								{props.medias?.map(e => (
									<li key={uuid.v4()}>{e}</li>
								))}
							</ul>
						</Grid>
					</Grid>
				</Grid>
			</section>
		</Container>
	);
};

Comment.propTypes = {
	author: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		username: PropTypes.string,
		avatar: PropTypes.shape({
			id: PropTypes.number,
			url: PropTypes.string
		})
	}),
	content: PropTypes.string,
	medias: PropTypes.arrayOf(PropTypes.instanceOf(Object))
};

export default memo(Comment);