import React, {PureComponent} from "react";
import Logo from "../../assets/images/bird.png";
import "./TouiteurLogo.scss";

/**
 * The website logo.
 */
export class TouiteurLogo extends PureComponent
{
	render()
	{
		return (
			<figure className={"touiteur-logo"}>
				<img width={64} height={64} src={Logo} alt={"Touiteur Logo"} />
			</figure>
		);
	}
}

export default TouiteurLogo;