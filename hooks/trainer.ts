import { CacheKeys } from "@/lib";
import { client } from "@/lib/api";
import { TUser } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useGetTrainers = () => {
  return useQuery({
    queryKey: [CacheKeys.Trainers],
    queryFn: async () => {
      return client.get("/user/trainers").then((res) => res.data as Promise<{ data: TUser[] }>);
    },
  });
};

export const useGetTrainer = (trainerId: string | null) => {
  return useQuery({
    queryKey: [CacheKeys.Trainers, trainerId],
    queryFn: async () => {
      return client.get(`/trainers/${trainerId}`).then((res) => res.data as Promise<{ data: TUser }>);
    },
    enabled: !!trainerId,
  });
};
