import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Media from "../Media/Media";
import Link from "../Link/Link";
import "./Avatar.scss";

export class Avatar extends PureComponent
{
	render()
	{
		return (
			<Link className={this.props.className} to={`/profile/${this.props.author?.username || 0}`}>
				<Media className={"avatar"} media={this.props.author?.avatar?.url || this.props.media} noredirect />
			</Link>
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