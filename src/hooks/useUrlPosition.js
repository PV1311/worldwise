import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // here we are creating custom hook(useUrlPosition() on top of another custom hook(useSearchParams()))
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
