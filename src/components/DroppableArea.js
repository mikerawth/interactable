import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableComponent from "./DraggableComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DroppableArea = () => {
  const [components, setComponents] = useState([
    { id: 1, name: "Component 1", color: "lightblue", top: 0 },
    { id: 2, name: "Component 2", color: "lightgreen", top: 50 },
    { id: 3, name: "Component 3", color: "lightcoral", top: 100 },
  ]);

  const moveComponent = (draggedId, newTop) => {
    setComponents((prevComponents) => {
      const updatedComponents = prevComponents.map((component) => {
        if (component.id === draggedId) {
          return { ...component, top: newTop };
        }
        return component;
      });
      return updatedComponents.sort((a, b) => a.top - b.top);
    });
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    hover: (item, monitor) => {
      const draggedId = item.id;
      const dragIndex = components.findIndex((comp) => comp.id === draggedId);
      const hoverIndex = Math.floor(monitor.getClientOffset().y / 50);

      if (dragIndex !== hoverIndex) {
        moveComponent(draggedId, hoverIndex * 50);
        item.top = hoverIndex * 50;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Container
      ref={drop}
      className="d-flex flex-column"
      style={{
        height: "300px",
        border: "2px dashed gray",
        position: "relative",
        backgroundColor: isOver ? "lightgreen" : "white",
        padding: "20px",
      }}
    >
      {components.map((component, index) => (
        <DraggableComponent
          key={component.id}
          id={component.id}
          name={component.name}
          color={component.color}
          top={component.top}
        />
      ))}
    </Container>
  );
};

export default DroppableArea;
