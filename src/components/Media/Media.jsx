import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export class Media extends PureComponent
{
	componentDidMount()
	{
		// TODO get the media from the backend
	}

	render()
	{
		return (
			<picture className={this.props.className}>
				<img width={this.props.width} height={this.props.height} alt={"Profile"}
					 src={this.props.media} />
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
	height: PropTypes.number
};

export default Media;