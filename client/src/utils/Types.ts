export interface FoodType {
  name: string;
  foodId: number;
  tags: string[];
  filePath: string;
  price: number;
  isAvailable: string;
  day: string;
  reviews: { userName: string; review: string }[];
  addOns: string[];
}

export interface UserType {
  firstName: string;
  lastName: string;
  userName: string;
  usn: string;
  password: string;
  phone: number;
  noOfCancels: number;
  favorites: number[];
}

export interface OrderType {
  foodIds: number[];
  customerNames: string;
  orderId: number;
  messages: string;
  status: string;
  isCompleted: boolean;
  dateOfOrder: Date;
}
