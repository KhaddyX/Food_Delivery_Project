import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ListFood.css";
import { deleteFood, getFoodList } from "../../services/foodService";

const ListFood = () => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error while reading the foods.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const success = await deleteFood(foodId);
      if (success) {
        toast.success("Food removed.");
        await fetchList();
      } else {
        toast.error("Error occurred while removing the food.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error occurred while removing the food.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="food-list-container py-5">
      <div className="row justify-content-center">
        <div className="col-11 col-lg-10 col-xl-8">
          <div className="card food-list-card">
            <div className="card-header bg-white border-0 pt-4 pb-3">
              <h3 className="food-list-title mb-0">Food Items List</h3>
            </div>
            <div className="card-body px-0 pt-0">
              <div className="table-responsive">
                <table className="table table-hover food-list-table mb-0">
                  <thead className="table-header">
                    <tr>
                      <th className="ps-4">Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th className="pe-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item, index) => (
                      <tr key={index} className="food-item-row">
                        <td className="ps-4">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="food-item-image"
                          />
                        </td>
                        <td className="food-item-name">{item.name}</td>
                        <td>
                          <span className="category-badge">{item.category}</span>
                        </td>
                        <td className="food-item-price">${item.price}.00</td>
                        <td className="pe-4">
                          <button 
                            className="delete-btn"
                            onClick={() => removeFood(item.id)}
                            aria-label="Delete food item"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {list.length === 0 && (
                  <div className="text-center py-5 empty-state">
                    <i className="bi bi-emoji-frown fs-1"></i>
                    <p className="mt-3">No food items found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListFood;

