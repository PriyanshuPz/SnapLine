import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useProfiles = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/profiles/${userId}`,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useProfiles;
