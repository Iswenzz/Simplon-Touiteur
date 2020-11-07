import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Media from "../Media/Media";
import Link from "../Link/Link";
import "./Avatar.scss";
import {randomImage} from "../../utils/utils";

export class Avatar extends PureComponent
{
	render()
	{
		return (
			<Link className={this.props.className} to={`/profile/${this.props.id || 0}`}>
				<Media className={"avatar"} media={randomImage()} />
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