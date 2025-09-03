import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAPI = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [url]); // ✅ depends only on URL

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]); // ✅ safe to include now

  return { products, error, isLoading, refresh: fetchAPI };
};

export default useFetch;
