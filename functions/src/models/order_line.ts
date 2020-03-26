import {Product} from "./products";

export interface Order_line {
  productBought: Product;
  count: number;
}
