import React, {memo} from "react";
import "./WavesEffect.scss";

export const WavesEffect = (props) =>
{
	return (
		<article className={"waveseffect"}>
			<section className={"waveseffect-wrapper"}>
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