import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Link from "../Link/Link";
import axios from "axios";

export class Media extends PureComponent
{
	state = {
		media: {}
	}

	/**
	 * Fetch media data
	 * TODO profile picture table
	 * @returns {Promise<void>}
	 */
	async fetchMedia()
	{
		try
		{
			const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/media/${this.props.id || 1}`);
			this.setState({
				media: response.data.media
			});
		}
		catch (e)
		{
			console.log(e);
		}
	}

	componentDidMount()
	{
		if (this.props.id)
			this.fetchMedia();
	}

	render()
	{
		return !this.props?.noredirect ? (
			<Link to={`/media/${this.state.media?.id || 1}`} component={"picture"} className={this.props.className}>
				<img width={this.props.width || "100%"} height={this.props.height || "auto"}
					 alt=" " src={this.state.media?.url || this.props.media} />
			</Link>
		) : (
			<picture className={this.props.className}>
				<img width={this.props.width || "100%"} height={this.props.height || "auto"}
					 alt=" " src={this.props.media} />
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