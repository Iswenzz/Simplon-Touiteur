import "bootstrap/dist/css/bootstrap.min.css";

// import des composants bootstrap
import { Container, Row, Col, Form } from "react-bootstrap";
// import de jquery
import $ from "jquery";

import "./App.css";
import React from "react";

const App = () =>
{
	return (
		<Container>
			<Row>
				<div className="Logo"><img src="./assets/bird.png" className="Touiteur"></img></div>

			</Row>
			<Row>
				<div>2 of 3</div>
			</Row>
			<Row>
				<div>3 of 3</div>
			</Row>
		</Container>

	);
};

export default App;
