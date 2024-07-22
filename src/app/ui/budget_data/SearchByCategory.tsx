'use client'
import { useEffect, useState } from "react";
import { fetchCategories } from "@/app/lib/categories/data";

export default function SearchByCategory({ expenses }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await fetchCategories();
            setCategories(data);
          } catch (error) {
            console.error('An error occurred while fetching categories:', error);
          }
        }
    
        fetchData();
      }, []);

    return (
        <div>
            <select name="category-select">
                <option value="all">All</option>
                {categories.length > 0 ? (
                    categories.map(category => (
                    <option value={category.id}>{category.name}</option>
                ))) : (
                    <option value="" disabled>No categories available</option>
                )
                }
            </select>
        </div>
    );
}