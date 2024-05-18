import { CategoryEnum } from "./category";

export interface ProductRequest {
  name: String;
  price: number;
  category: CategoryEnum;
  img:String;
}

export interface ProductResponse {
  id: number;
  name: String;
  price: number;
  category: CategoryEnum;
  img: String;
  cantidad: number
}
