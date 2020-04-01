import {Product} from "./products";

export interface Order_line {
  productID: string
  productBought: Product;
  count: number;
}
