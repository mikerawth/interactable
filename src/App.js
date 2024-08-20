// App.js
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "./components/Header";
import DroppableArea from "./components/DroppableArea";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container className="m-3">
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <DroppableArea />
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
}

export default App;
