import { useState } from "react";

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export const useRefresh = (refetch: any) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch(); /* eslint-disable-line  @typescript-eslint/no-unsafe-call */
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  return { refreshing, handleRefresh };
};
