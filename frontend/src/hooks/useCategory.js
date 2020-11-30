import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import categoryApi from "../api/category";

export default function useCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    setIsLoading(true);
    categoryApi
      .getAll()
      .then((resp) => {
        setCategories(resp.data);
        setIsLoading(false);
        //console.log(resp);
      })
      .catch(() => {
        setIsLoading(false);
        setCategories([]);
      });
  }, []);

  const createNew = ({ category, slug }) => {
    return categoryApi
      .createNew({ name: category, slug }, auth.token)
      .then((resp) => {
        setCategories([...categories, resp.data]);
        return resp.data;
      });
  };

  const updateById = (id, { category, slug }) => {
    return categoryApi
      .updateById(id, { name: category, slug }, auth.token)
      .then((resp) => {
        const temp = categories.map((c) => {
          if (c._id === id) {
            return resp.data;
          }
          return c;
        });
        setCategories(temp);
        return resp.data;
      });
  };

  const deleteById = (id) => {
    return categoryApi.deleteById(id, auth.token).then((resp) => {
      const temp = categories.filter((c) => c._id !== id);
      setCategories(temp);
      return true;
    });
  };

  const createOrUpdate = (isCreate = true, data) => {
    if (isCreate) {
      return createNew(data);
    } else {
      return updateById(data.id, data);
    }
  };

  return {
    isLoading,
    categories,
    createOrUpdate,
    deleteById,
  };
}
