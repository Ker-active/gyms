import { CacheKeys } from "@/lib";
import { client } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface IMembersResponse {
  success: boolean;
  count: number;
  data: IMembers[];
  message: string;
}

interface IMembers {
  totalBookings: number;
  attendedCount: number;
  userId: string;
  fullname: string;
  email: string;
}

export const useGetMembers = () => {
  return useQuery({
    queryKey: [CacheKeys.Members],
    queryFn: async () => {
      return client.get("/attendance/stat").then((res) => res.data as IMembersResponse);
    },
  });
};
