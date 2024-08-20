import React from "react";
import { useDrag } from "react-dnd";
import Card from "react-bootstrap/Card";

const DraggableComponent = ({ id, name, color, top }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { id, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      style={{
        position: "absolute",
        top: `${top}px`,
        left: "0px", // Keep components aligned to the left
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        width: "200px",
        backgroundColor: color,
        transition: "top 0.2s", // Smooth transition for cleaner movement
      }}
    >
      <Card.Body>
        <Card.Text>{name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DraggableComponent;
