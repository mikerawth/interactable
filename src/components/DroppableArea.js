import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableComponent from "./DraggableComponent";
import Container from "react-bootstrap/Container";

const gridSize = 50; // Each grid cell is 50px tall

const DroppableArea = () => {
  const [components, setComponents] = useState([
    { id: 1, name: "Component 1", color: "lightblue", top: 0 },
    { id: 2, name: "Component 2", color: "lightgreen", top: 50 },
    { id: 3, name: "Component 3", color: "lightcoral", top: 100 },
  ]);

  const moveComponent = (draggedId, newTop) => {
    setComponents((prevComponents) => {
      const updatedComponents = [...prevComponents];
      const draggedComponent = updatedComponents.find(
        (comp) => comp.id === draggedId
      );

      // Snap to grid
      let snappedTop = Math.round(newTop / gridSize) * gridSize;

      // Shift other components down if necessary
      updatedComponents.forEach((comp) => {
        if (comp.id !== draggedComponent.id && comp.top === snappedTop) {
          comp.top += gridSize;
        }
      });

      // Update dragged component position
      draggedComponent.top = snappedTop;

      // Sort components by their top position
      return updatedComponents.sort((a, b) => a.top - b.top);
    });
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    hover: (item, monitor) => {
      const dragId = item.id;
      const hoverTop =
        Math.round(monitor.getClientOffset().y / gridSize) * gridSize;

      // Keep the component within the bounds of the DroppableArea
      const boundedTop = Math.max(
        0,
        Math.min(hoverTop, gridSize * (components.length - 1))
      );

      moveComponent(dragId, boundedTop);
      item.top = boundedTop;
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
        height: `${gridSize * components.length}px`,
        border: "2px dashed gray",
        position: "relative",
        backgroundColor: isOver ? "lightgreen" : "white",
        padding: "20px",
      }}
    >
      {components.map((component) => (
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
