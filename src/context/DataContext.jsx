/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

export const DataContext = createContext({
  data: null,
  isLoading: true,
  isError: false,
});

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("/data/mock.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError || !data)
    return <div className="loading">Error loading data</div>;

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};
