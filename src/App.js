import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./components/Header";

function App() {
  return (
    <Container className="m-3">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
