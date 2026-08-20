import { useIsFetching } from "@tanstack/react-query";

function GlobalLoading() {
  const isFetching = useIsFetching();

  if (!isFetching) {
    return null;
  }

  return (
    <div className="global-loading">
      Fetching latest data...
    </div>
  );
}

export default GlobalLoading;