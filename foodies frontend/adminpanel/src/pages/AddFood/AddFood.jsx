import './AddFood.css';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { addFood } from '../../services/foodService';
import { assets } from '../../assets/assets';


const AddFood = () => {
    const [image, setImage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Biryani'
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error('Please select an image.');
            return;
        }
        setIsSubmitting(true);
        try {
            await addFood(data, image);
            toast.success('Food added successfully!');
            setData({ name: '', description: '', category: 'Biryani', price: '' });
            setImage(null);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding food item');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="add-food-container">
            <div className="add-food-wrapper">
                <div className="add-food-card">
                    <div className="add-food-header">
                        <h2>Add New Food Item</h2>
                        <p className="subtitle">Fill in the details below to add a new menu item</p>
                    </div>
                    
                    <form onSubmit={onSubmitHandler}>
                        <div className="image-upload-section">
                            <label htmlFor="image" className="image-upload-label">
                                <div className="image-preview-container">
                                    <img
                                        src={image ? URL.createObjectURL(image) : assets.upload}
                                        alt="Upload preview"
                                        className={`food-image-preview ${!image ? 'empty-state' : ''}`}
                                    />
                                    <div className="image-upload-overlay">
                                        <span className="upload-icon">+</span>
                                        <p className="upload-text">{image ? 'Change Image' : 'Upload Image'}</p>
                                    </div>
                                </div>
                            </label>
                            <input
                                type="file"
                                id="image"
                                hidden
                                onChange={(e) => setImage(e.target.files[0])}
                                accept="image/*"
                            />
                            {!image && <p className="image-upload-hint">Recommended size: 800x800px</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Food Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Chicken Biryani"
                                id="name"
                                required
                                name='name'
                                onChange={onChangeHandler}
                                value={data.name}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                placeholder="Describe the food item..."
                                id="description"
                                rows="4"
                                required
                                name='description'
                                onChange={onChangeHandler}
                                value={data.description}
                            ></textarea>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    onChange={onChangeHandler}
                                    value={data.category}
                                >
                                    <option value="Biryani">Biryani</option>
                                    <option value="Cake">Cake</option>
                                    <option value="Burger">Burger</option>
                                    <option value="Pizza">Pizza</option>
                                    <option value="Rolls">Rolls</option>
                                    <option value="Salad">Salad</option>
                                    <option value="Ice cream">Ice cream</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="e.g. 200"
                                    onChange={onChangeHandler}
                                    value={data.price}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span> Adding...
                                </>
                            ) : (
                                'Save Food Item'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFood;