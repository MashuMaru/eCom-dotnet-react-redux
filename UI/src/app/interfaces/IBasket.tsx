import {IBasketItem} from "./IBasketItem.tsx";

export interface IBasket {
  id: number
  buyerId: string
  items: IBasketItem[]
}