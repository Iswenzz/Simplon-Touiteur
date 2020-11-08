import React, {PureComponent} from "react";
import Logo from "../../assets/images/bird.png";
import "./TouiteurLogo.scss";
import Link from "../Link/Link";

/**
 * The website logo.
 */
export class TouiteurLogo extends PureComponent
{
	render()
	{
		return (
			<Link to={"/home"} component={"figure"} className={"touiteur-logo"}>
				<img width={64} height={64} src={Logo} alt={"Touiteur Logo"} />
			</Link>
		);
	}
}

export default TouiteurLogo;