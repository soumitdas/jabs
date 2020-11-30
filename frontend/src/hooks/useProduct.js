import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import productApi from "../api/product";

export default function useProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    setIsLoading(true);
    productApi
      .getAll()
      .then((resp) => {
        setProducts(resp.data);
        setIsLoading(false);
        //console.log(resp);
      })
      .catch(() => {
        setIsLoading(false);
        setProducts([]);
      });
  }, []);

  const createNew = (formData) => {
    return productApi.createNew(formData, auth.token).then((resp) => {
      setProducts([...products, resp.data]);
      return resp.data;
    });
  };

  const updateById = (id, formData) => {
    return productApi.updateById(id, formData, auth.token).then((resp) => {
      const temp = products.map((product) => {
        if (product._id === id) {
          return resp.data;
        }
        return product;
      });
      setProducts(temp);
      return resp.data;
    });
  };

  const createOrUpdate = (isCreate = true, data, id) => {
    if (isCreate) {
      return createNew(data);
    } else {
      return updateById(id, data);
    }
  };

  const deleteById = (id) => {
    return productApi.deleteById(id, auth.token).then((resp) => {
      const temp = products.filter((product) => product._id !== id);
      setProducts(temp);
      return true;
    });
  };

  return {
    isLoading,
    products,
    createOrUpdate,
    deleteById,
  };
}
