import React from "react";

/**
 * Tab panel for Material UI Tabs
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const TabPanel = (props) =>
{
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index ? children : null}
		</div>
	);
};

export default TabPanel;