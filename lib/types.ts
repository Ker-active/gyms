export interface TUser {
  socialMedia: SocialMedia;
  _id: string;
  services: string[];
  anotherService: any[];
  amenities: string[];
  specialNeed: string[];
  media: string[];
  activities: string[];
  userType: string;
  isVerified: boolean;
  createdAt: string;
  fullname: string;
  phoneNumber: string;
  email: string;
  password: string;
  __v: number;
  token: string;
  profilePhoto: string;
  location: string;
  professionalSummary: string;
}

interface SocialMedia {
  instagram: string;
  twitter: string;
}

export interface IEventResponse {
  success: boolean;
  data: IEvent[];
  message: string;
}

export interface IEvent {
  _id: string;
  title: string;
  availableSlot: string;
  price: string;
  location: string;
  room: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  onlineLink: string;
  free: boolean;
  media: string[];
  createdAt: string;
  __v: number;
}

export interface IClassResponse {
  success: boolean;
  data: IClass[];
  message: string;
}

export interface IClass {
  _id: string;
  title: string;
  type: string;
  trainer: TUser;
  availableSlot: string;
  location: string;
  room: string;
  date: string | null;
  price: string;
  timeFrom: string;
  timeTo: string;
  onlineLink: string;
  free: boolean;
  description: string;
  media: string[];
  createdAt: string;
  __v: number;
  totalBooked: string;
  totalSlot: string;
  totalSlots: string;
  gym: string;
  shareableLink: string;
  // Recurring properties
  isRecurring?: boolean;
  recurrencePattern?: "DAILY" | "WEEKLY" | "MONTHLY";
  interval?: number;
  weekDays?: string[];
  rangeStart?: string;
  rangeEnd?: string;
  monthlyRule?: {
    week?: string;
    day?: string;
  };
}

export interface IBookingResponse {
  success: boolean;
  data: Booking[];
  pagination: Pagination;
  message: string;
}

interface User {
  _id: string;
  fullname: string;
  email: string;
}

interface Booking {
  _id: string;
  user: User;
  class: IClass;
  bookingDate: string;
  createdAt: string;
  __v: number;
  attended?: boolean;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
}

export interface TBookingAttendedResponse {
  success: boolean;
  message: string;
  data: {
    attended: boolean;
    _id: string;
    user: string;
    class: {
      _id: string;
      title: string;
      classType: string;
      type: string;
      trainer: string;
      availableSlot: number;
      totalSlots: number;
      totalBooked: number;
      location: string;
      room: number;
      date: string;
      timeFrom: string;
      timeTo: string;
      onlineLink: string;
      free: boolean;
      description: string;
      media: string[];
      createdBy: string;
      createdAt: string;
      __v: number;
      gym: string;
    };
    bookingDate: string;
    createdAt: string;
    __v: number;
  };
}

export interface IWeeklyMetric {
  totalAttendance: number;
  totalClasses: number;
  totalPayments: number;
  weekStarting: string | Date;
}
export interface IWeeklyMetricResponse {
  success: boolean;
  data: IWeeklyMetric;
  message: string;
}
