import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inStockFilter, setInStockFilter] = useState(false);

  // Fetch plants from the backend (Read)
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => {
        // Add "inStock" dynamically to the plant data
        const plantsWithStock = data.map((plant) => ({
          ...plant,
          inStock: true, // Default to true for all plants initially
        }));
        setPlants(plantsWithStock);
      })
      .catch((error) => {
        console.error("Error fetching plants:", error);
      });
  }, []);

  // Handle adding a new plant (Create)
  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlants([...plants, data]); // Add new plant to the local state
      })
      .catch((error) => {
        console.error("Error adding plant:", error);
      });
  };

  // Handle deleting a plant (Delete)
  const handleDeletePlant = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE", // Use DELETE to remove the plant
    })
      .then(() => {
        // After deletion, filter out the deleted plant from the local state
        const updatedPlants = plants.filter((plant) => plant.id !== id);
        setPlants(updatedPlants);
      })
      .catch((error) => {
        console.error("Error deleting plant:", error);
      });
  };

  // Filter plants by search query and inStock filter
  const filteredPlants = plants.filter((plant) => {
    const matchesSearchQuery = plant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesInStock = !inStockFilter || plant.inStock;

    return matchesSearchQuery && matchesInStock;
  });

  // Toggle the "inStock" status locally
  const toggleInStock = (id) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === id) {
        // Toggle inStock status
        return { ...plant, inStock: !plant.inStock };
      }
      return plant;
    });

    setPlants(updatedPlants); // Update the local state
  };

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search setSearchQuery={setSearchQuery} setInStockFilter={setInStockFilter} />
      <PlantList
        plants={filteredPlants}
        onToggleInStock={toggleInStock}
        onDeletePlant={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
