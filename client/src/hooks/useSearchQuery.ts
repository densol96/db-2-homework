import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function useSearchQuery(
  key: string = "activeNum"
): [number, (value: number) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get(key) ? +searchParams.get(key) : 1;

  function update(value: number) {
    setSearchParams({ [key]: value + "" });
  }

  useEffect(() => {
    update(currentValue);
  }, []);
  return [currentValue, update];
}

export default useSearchQuery;
