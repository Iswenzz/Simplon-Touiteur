import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Media from "../Media/Media";
import DefaultAvatar from "../../assets/images/avatar.png";
import "./Avatar.scss";

export class Avatar extends PureComponent
{
	render()
	{
		return (
			<Media className={"avatar"} media={DefaultAvatar} />
		);
	}
}

Avatar.propTypes = {
	className: PropTypes.string,
	id: PropTypes.number
};

export default Avatar;