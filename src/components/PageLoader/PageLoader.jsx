import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import "./PageLoader.scss";

export const PageLoader = () =>
{
	return (
		<figure className={"pageloader"}>
			<CircularProgress />
		</figure>
	);
};

export default PageLoader;