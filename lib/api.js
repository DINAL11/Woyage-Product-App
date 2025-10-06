import axios from "axios";

const API_URL = "https://dummyjson.com/products"; 
// or use: https://fakestoreapi.com/products

export async function fetchProducts() {
  const response = await axios.get(API_URL);
  return response.data.products || response.data; 
}
