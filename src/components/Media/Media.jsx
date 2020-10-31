import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Link from "../Link/Link";

export class Media extends PureComponent
{
	componentDidMount()
	{
		// TODO get the media from the backend
	}

	render()
	{
		return !this.props?.noredirect ? (
			<Link to={`/media/${this.props.id || 0}`} component={"picture"} className={this.props.className}>
				<img width={this.props.width || "100%"} height={this.props.height || "auto"}
					 alt={"Profile"} src={this.props.media} />
			</Link>
		) : (
			<picture className={this.props.className}>
				<img width={this.props.width || "100%"} height={this.props.height || "auto"}
					 alt={"Profile"} src={this.props.media} />
			</picture>
		);
	}
}

Media.propTypes = {
	className: PropTypes.string,
	media: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	id: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number,
	noredirect: PropTypes.bool
};

export default Media;