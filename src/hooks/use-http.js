import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //we wrapping the sendRequest with useCallback hook, so that we can use dependency for useEffect() hook

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);

      //   const loadedTasks = [];

      //   for (const taskKey in data) {
      //     loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      //   }

      //   setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  //we have to add requestConfig, applyData as dependency to useCallback but both are object, so in app component we also have to import useCallback

  //we transform the requestConfig parameter from useHttp to sendRequst, so now we do not have to add requestConfig as an external dependency

  // return {
  //   isLoading: isLoading,
  //   error: error,
  //   sendRequest: sendRequest,
  // };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
