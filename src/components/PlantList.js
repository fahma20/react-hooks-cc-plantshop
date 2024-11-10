import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleInStock, onDeletePlant }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onToggleInStock={onToggleInStock}
          onDeletePlant={onDeletePlant} // Pass down the delete function
        />
      ))}
    </ul>
  );
}

export default PlantList;

