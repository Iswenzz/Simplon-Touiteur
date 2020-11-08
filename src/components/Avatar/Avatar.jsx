import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Media from "../Media/Media";
import Link from "../Link/Link";
import {Avatar as MuiAvatar} from "@material-ui/core";
import "./Avatar.scss";

export class Avatar extends PureComponent
{
	render()
	{
		return this.props.author?.avatar ? (
			<Link className={this.props.className} to={`/profile/${this.props.author?.username || 0}`}>
				<Media className={"avatar"} media={this.props.author?.avatar?.url || this.props.media} noredirect />
			</Link>
		) : (
			<MuiAvatar className={`avatar-gen ${this.props.className}`}>
				{this.props.author.username ? this.props.author.username[0].toUpperCase() : null}
			</MuiAvatar>
		);
	}
}

Avatar.propTypes = {
	author: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		username: PropTypes.string,
		avatar: PropTypes.shape({
			id: PropTypes.number,
			url: PropTypes.string
		})
	}),
	className: PropTypes.string,
	media: PropTypes.any
};

export default Avatar;