import React from "react";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import {ThemeProvider, CssBaseline} from "@material-ui/core";
import Home from "./containers/Home/Home";

const theme = responsiveFontSizes(createMuiTheme());

export const App = () =>
{
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Home />
		</ThemeProvider>
	);
};

export default App;