import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Media from "../Media/Media";
import DefaultAvatar from "../../assets/images/avatar.png";
import "./Avatar.scss";
import Link from "../Link/Link";

export class Avatar extends PureComponent
{
	render()
	{
		return (
			<Link to={`/profile/${this.props.id || 0}`}>
				<Media className={"avatar"} media={DefaultAvatar} noredirect />
			</Link>
		);
	}
}

Avatar.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string
};

export default Avatar;