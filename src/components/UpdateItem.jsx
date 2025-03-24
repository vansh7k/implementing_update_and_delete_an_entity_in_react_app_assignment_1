import axios from "axios";
import { useState, useEffect } from "react";

const UpdateItem = ({ item }) => {
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Received item:", item); // Debug log
    try {
      // Handle both array and single item cases
      const itemArray = Array.isArray(item) ? item : [item];
      setFormData(
        itemArray.map((door) => ({
          id: door.id,
          name: door.name,
          status: door.status || "",
        }))
      );
    } catch (err) {
      setError("Error processing data");
      console.error("Data processing error:", err);
    }
  }, [item]);

  const handleChange = (id, field, value) => {
    setFormData((prevData) =>
      prevData.map((door) =>
        door.id === id ? { ...door, [field]: value } : door
      )
    );
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const doorToUpdate = formData.find((door) => door.id === id);
      await axios.put(
        `http://${import.meta.env.VITE_API_URI}/doors/${id}`,
        doorToUpdate
      );
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://${import.meta.env.VITE_API_URI}/doors/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!formData.length) return <div>No items to display</div>;

  return (
    <div>
      <h2>Update Items</h2>
      {formData.map((door) => (
        <form key={door.id} onSubmit={(e) => handleUpdate(e, door.id)}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={door.name || ""}
                onChange={(e) => handleChange(door.id, "name", e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Status:
              <select
                value={door.status || ""}
                onChange={(e) =>
                  handleChange(door.id, "status", e.target.value)
                }
              >
                <option value="">Select Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="locked">Locked</option>
              </select>
            </label>
          </div>
          <div>
            <button type="button" onClick={() => handleDelete(door.id)}>
              Delete
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      ))}
    </div>
  );
};

export default UpdateItem;