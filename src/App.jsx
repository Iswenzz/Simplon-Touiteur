import React from "react";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import {ThemeProvider, CssBaseline} from "@material-ui/core";
import Home from "./containers/Home/Home";
import {BrowserRouter as Router} from "react-router-dom";
import {Switch, Route} from "react-router";
import "./Common.scss";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import Profile from "./containers/Profile/Profile";
import IndexPage from "./containers/IndexPage/IndexPage";
import TweetPage from "./containers/TweetPage/TweetPage";
import WavesEffect from "./components/WavesEffect/WavesEffect";
import PostPage from "./containers/PostPage/PostPage";

/**
 * Custom material theme + responsive font.
 * @type {Theme}
 */
const theme = responsiveFontSizes(createMuiTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#1DA2F1"
		},
		text: {
			primary: "#DCDCDC",
			secondary: "#DCDCDC",
		}
	},
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
					// "--scrollbarBG": "#23272a",
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
		},
		MuiOutlinedInput: {
			root: {
				borderColor: "whitesmoke !important",
			},
			notchedOutline: {
				borderColor: "whitesmoke !important",
			}
		}
	},
}));

/**
 * The touiteur application.
 * @returns {JSX.Element}
 * @constructor
 */
export const App = () =>
{
	return (
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<Switch>
						<Route path="/signin" children={<WavesEffect children={<SignIn />} />} />
						<Route path="/signup" children={<WavesEffect children={<SignUp />} />} />
						<Route path="/profile" children={<Profile/>} />
						<Route path="/tweet" children={<TweetPage />} />
						<Route path="/post" children={<PostPage />} />
						<Route path="/home" children={<Home />} />
						<Route path="/" children={<WavesEffect children={<IndexPage />} />} />
					</Switch>
				</Router>
			</ThemeProvider>
		</React.StrictMode>
	);
};

export default App;