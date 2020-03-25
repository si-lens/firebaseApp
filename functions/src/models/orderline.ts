import {Product} from "./products";

export interface Orderline {
  productBought: Product;
  count: number;
}
