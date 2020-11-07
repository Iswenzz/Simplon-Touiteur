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
			<Link to={`/profile/${this.props.id || 0}`}>
				<Media className={"avatar"} media={`https://lorempixel.com/640/480/?${Math.floor(Math.random() * Math.floor(40000))}`} />
			</Link>
		);
	}
}

Avatar.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	avatarId: PropTypes.number
};

export default Avatar;