import { CacheKeys } from "@/lib";
import { client } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface IServiceResponse {
  success: boolean;
  data: IService[];
  message: string;
}

interface IService {
  _id: string;
  ServiceName: string;
  __v: number;
}

export const useGetServicesList = () => {
  return useQuery({
    queryKey: [CacheKeys.Services_List],
    queryFn: async () => {
      return client.get("/services").then((res) => res.data as IServiceResponse);
    },
  });
};

export const useGetAmenitiesList = () => {
  return useQuery({
    queryKey: [CacheKeys.Amenities_List],
    queryFn: async () => {
      return client.get("/amenities").then((res) => res.data as IServiceResponse);
    },
  });
};

export const useGetSpecialNeedsList = () => {
  return useQuery({
    queryKey: [CacheKeys.SpecialNeeds_List],
    queryFn: async () => {
      return client.get("/special-needs").then((res) => res.data as IServiceResponse);
    },
  });
};
