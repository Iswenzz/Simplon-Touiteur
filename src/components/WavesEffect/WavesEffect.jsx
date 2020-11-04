import React, {memo} from "react";

export const WavesEffect = (props) =>
{
	return (
		<article>
			<section>
				{props.children}
			</section>
			<aside className="ocean">
				<div className="wave"/>
				<div className="wave"/>
			</aside>
		</article>
	);
};

export default memo(WavesEffect);