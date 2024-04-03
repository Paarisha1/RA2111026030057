import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';


const ProductDetailsPage = ({ match }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch product details based on the ID from the URL
        const fetchProductDetails = async () => {
            try {

                const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
                const productCategories = ['Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger', 'Mouse', 'Keypad', 'Bluetooth', 'Pendrive', 'Remote', 'Speaker', 'Headset', 'Laptop', 'PC'];
                const allProducts = [];


                for (const company of companies) {
                    for (const prdct of productCategories) {
                        const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${prdct}/product?top=10&minPrice500&maxPrice=10000/${match.params.id}`);
                        allProducts.push(...response.data);
                    }
                }
                setProduct(allProducts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [match.params.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Product Details</h2>
            {product && (
                <div>
                    <h3>{product.name}</h3>
                    <p>Company: {product.company}</p>
                    <p>Category: {product.category}</p>
                    <p>Price: {product.price}</p>
                    <p>Rating: {product.rating}</p>
                    <p>Discount: {product.discount}</p>
                    <p>Availability: {product.availability}</p>
                </div>
            )}
        </div>
    );
}

export default ProductDetailsPage;