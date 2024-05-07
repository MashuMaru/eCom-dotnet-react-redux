import { useEffect } from 'react';
import './App.css'

interface IProduct {
  name: string
  price: number
}

const products:IProduct[] = [
  { name: 'product1', price: 100.00 },
  { name: 'product2', price: 200.00 },
  { name: 'product2', price: 300.00 },
  { name: 'product2', price: 400.00 },
]

useEffect(() => {
  console.log('does this work well?')
}, [products]);

function App() {
  return (
    <div>
      <h1>Store</h1>
      <ul>
        {products.map((p, idx) => (
          <li key={idx}>{p.name} - {p.price}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
