export interface StoreIO {
  load<T>(): Promise<T | string>;
  save<T>(data: T): Promise<string>;
  clear(): Promise<string>;
}
