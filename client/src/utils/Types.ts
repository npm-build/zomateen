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
