import {IBasket} from "../interfaces/IBasket.tsx";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useState
} from "react";

interface ContextValue {
  basket: IBasket | null
  setBasket: (basket: IBasket) => void
  removeItem: (productId: number, quantity: number) => void
}

export const Context = createContext<ContextValue | undefined>(undefined);

export function useStoreContext() {
  const context = useContext(Context);
  
  if (context === undefined) 
    throw Error('No context has been provided.')
  
  return context;
}

export function Provider({children}: PropsWithChildren<unknown>) {
  const [basket, setBasket] = useState<IBasket | null>(null);
  
  const removeItem = (productId: number, quantity: number) => {
    if (!basket) return;
    
    const items = [...basket.items];
    const itemIndex = items.findIndex(x => x.productId === productId);
    
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      
      if (items[itemIndex].quantity === 0) 
        items.splice(itemIndex, 1);
      
      setBasket(prevState => {
        return {...prevState!, items}
      })
    }
  }
  
  return (
    <Context.Provider value={{basket, setBasket, removeItem}}>
      {children}
    </Context.Provider>
  )
}