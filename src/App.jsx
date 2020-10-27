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
			{/* HEADER LOGO */}
			<Row className="Header mt-4">
				<div>
					<img src="./assets/bird.png" className="Touiteur" role="presentation"></img>
				</div>

			</Row>

			{/* THREAD */}
			<Row className="Thread">
				<Col>
					<div><img src="./assets/avatar.png" height="100" width="100" title=""></img></div>
				</Col>

				<Col>
					<div>NOM</div>
					<div>Description</div>
				</Col>

			</Row>

			{/* NAVBAR */}
			<Row>
				<div>3 of 3</div>
			</Row>
		</Container>

	);
};

export default App;
