import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

/**
 * RRD Link wrapper.
 * @param to - The route URL.
 * @param onClick - onClick link callback.
 * @param Tag - The link html tag.
 * @param props - Link Props.
 * @returns {JSX.Element}
 * @constructor
 */
export const Link = ({ to, onClick, component: Tag, ...props }) =>
{
	const history = useHistory();

	return (
		<Tag {...props} onClick={(event) => {
			event.stopPropagation();
			onclick && onClick(event);
			history.push(to);
		}} />
	);
};

Link.propTypes = {
	component: PropTypes.instanceOf(Object),
	to: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func
};

Link.defaultProps = {
	component: "a"
};

export default Link;