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
  date: string;
  timeFrom: string;
  timeTo: string;
  onlineLink: string;
  free: boolean;
  description: string;
  media: string[];
  createdAt: string;
  __v: number;
}
