import React, {forwardRef} from "react";
import {Button} from "@material-ui/core";

/**
 * Forward MUI Button.
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
export const ButtonLink = forwardRef((props, ref) =>
{
	return (
		<Button {...props} ref={ref} />
	);
});

export default ButtonLink;