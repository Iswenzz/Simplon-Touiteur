import React from "react";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import {ThemeProvider, CssBaseline} from "@material-ui/core";
import Home from "./containers/Home/Home";
import "./Common.scss";

const theme = responsiveFontSizes(createMuiTheme({
	typography: {
		subtitle1: {
			fontFamily: "Roboto",
			color: "rgba(220, 220, 220, 1)"
		},
		subtitle2: {
			fontFamily: "Roboto",
			color: "rgba(220, 220, 220, 1)"
		},
		h1: {
			fontFamily: "Roboto",
			color: "rgba(220, 220, 220, 1)"
		},
		h2: {
			fontFamily: "Roboto",
			color: "rgba(220, 220, 220, 1)"
		},
		h3: {
			fontFamily: "Roboto",
			color: "rgba(220, 220, 220, 1)"
		},
		h4: {
			fontFamily: "Roboto",
			color: "rgba(220, 220, 220, 1)"
		},
		h5: {
			fontFamily: "Roboto",
			color: "rgba(220, 220, 220, 1)"
		},
		caption: {
			fontFamily: "Roboto",
			color: "rgba(240, 240, 240, 1)"
		}
	},
	overrides: {
		MuiCssBaseline: {
			"@global": {
				html: {
					"--scrollbarBG": "#23272a",
					"--thumbBG": "#3a3d41",
					overflowX: "hidden",
					overflowY: "visible"
				},
				body: {
					scrollbarWidth: "thin",
					scrollbarColor: "var(--thumbBG) var(--scrollbarBG)",
					backgroundColor: "#282C34",
					margin: 0,
				},
				ul: {
					listStyle: "none",
					margin: 0,
					padding: 0
				},
				"::-webkit-scrollbar": {
					width: "12px"
				},
				"::-webkit-scrollbar-track": {
					background: "var(--scrollbarBG)",
					borderRadius: "10px"
				},
				"::-webkit-scrollbar-thumb": {
					backgroundColor: "var(--thumbBG)",
					border: "3px solid var(--scrollbarBG)",
					borderRadius: "10px",
				},
			}
		},
		MuiTooltip: {
			tooltip: {
				fontSize: "1em",
			}
		},
		MuiFab: {
			primary: {
				backgroundColor: "#282C34"
			},
		},
		MuiDialogTitle: {
			root: {
				backgroundColor: "#282C34"
			}
		}
	},
}));

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