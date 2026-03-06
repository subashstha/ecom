import { useEffect, useState } from "react";

const FetchData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleData = async () => {
      setIsLoading(true);
      try {
        console.log(isLoading);
        const response = await fetch("../data/mock.json");
        const dataResponse = await response.json();
        setData(dataResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        console.log(isLoading);
      }
    };
    handleData();
  }, []);

  if (!data) {
    return "Loading";
  }

  return (
    <>
      <div>FetchData</div>
    </>
  );
};

export default FetchData;
