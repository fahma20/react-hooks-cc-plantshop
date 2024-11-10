import React from "react";

function PlantCard({ plant, onToggleInStock, onDeletePlant }) {
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      <button
        className={plant.inStock ? "primary" : "out-of-stock"}
        onClick={() => onToggleInStock(plant.id)}
      >
        {plant.inStock ? "In Stock" : "Out of Stock"}
      </button>
      <button className="delete" onClick={() => onDeletePlant(plant.id)}>
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
