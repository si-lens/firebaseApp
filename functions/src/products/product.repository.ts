export interface ProductRepository {
  createStockProduct(productID: string): Promise<any>
}
