import { CacheKeys } from "@/lib";
import { client } from "@/lib/api";
import { IBookingResponse, IClass, IClassResponse, IEvent, IEventResponse, TUser, IWeeklyMetricResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: [CacheKeys.USER],
    queryFn: async () => {
      return client.get("/user").then((res) => res.data as Promise<{ data: TUser }>);
    },
  });
};

export const useGetClasss = () => {
  return useQuery({
    queryKey: [CacheKeys.CLASSES],
    queryFn: async () => {
      return client.get("/classes").then((res) => res.data as Promise<IClassResponse>);
    },
  });
};

export const useGetClassDetails = (classId: string | null) => {
  return useQuery({
    queryKey: [CacheKeys.CLASSES, classId],
    queryFn: async () => {
      return client.get(`/class/view/${classId}`).then((res) => res.data as Promise<{ data: IClass }>);
    },
    enabled: !!classId,
  });
};

export const useGetClassDetailBookingList = (classId: string | null, gymId: string | null) => {
  return useQuery({
    queryKey: [CacheKeys.Books, classId, gymId],
    queryFn: async () => {
      const res = await client.get(`/bookings/gym/${gymId}/class/${classId}`);
      return res.data as IBookingResponse;
    },
    enabled: !!classId && !!gymId,
  });
};

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

export const useGetGymTrainer = (gymId: string | null | undefined) => {
  return useQuery({
    queryKey: [`${CacheKeys.Trainers}/gym`, gymId],
    queryFn: async () => {
      return client.get(`/gym/${gymId}/trainers`).then((res) => res.data as Promise<{ data: TUser[] }>);
    },
    enabled: !!gymId,
  });
};

export const useGetEvents = (status = "upcoming") => {
  return useQuery({
    queryKey: [CacheKeys.Events, status],
    queryFn: async () => {
      return client.get(`/events?status=${status}`).then((res) => res.data as Promise<IEventResponse>);
    },
  });
};

export const useGetEventDetails = (eventId: string | null) => {
  return useQuery({
    queryKey: [CacheKeys.Events, eventId],
    queryFn: async () => {
      return client.get(`/event/view/${eventId}`).then((res) => res.data as Promise<{ data: IEvent }>);
    },
    enabled: !!eventId,
  });
};

export const useGetDashboardMetricWeekly = (date: Date = new Date()) => {
  return useQuery({
    queryKey: [CacheKeys.Dashboard_Metric_Weekly, date],
    queryFn: async () => {
      return client.get(`/gym/summary/weekly?date=${date}`).then((res) => res.data as Promise<IWeeklyMetricResponse>);
    },
  });
};
