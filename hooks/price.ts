import { CacheKeys } from "@/lib";
import { client } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface IPriceResponse {
  success: boolean;
  data: IPrice[];
  message: string;
}

interface IPrice {
  _id: string;
  packageName: string;
  price: string;
  description: string;
  createdAt: string;
  __v: number;
}

export const useGetPrices = () => {
  return useQuery({
    queryKey: [CacheKeys.Price],
    queryFn: async () => {
      return client.get("/price/view").then((res) => res.data as IPriceResponse);
    },
  });
};

//export const useGetTrainer = (trainerId: string | null) => {
//   return useQuery({
//     queryKey: [CacheKeys.Trainers, trainerId],
//     queryFn: async () => {
//       return client.get(`/trainers/${trainerId}`).then((res) => res.data as Promise<{ data: TUser }>);
//     },
//     enabled: !!trainerId,
//   });
// };
