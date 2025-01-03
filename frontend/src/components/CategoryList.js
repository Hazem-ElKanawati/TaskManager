import React, { useEffect, useState } from "react";

function CategoryList({ userId }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // Fetch user categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/categories/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          const errorMsg = await response.text();
          setError(errorMsg || "Failed to fetch categories.");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Something went wrong while fetching categories.");
      }
    };

    fetchCategories();
  }, [userId]);

  return (
    <div>
      <h3>User Categories</h3>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <strong>{category.name}</strong>: {category.description || "No description provided"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
