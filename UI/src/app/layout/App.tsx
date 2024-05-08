import {useEffect, useState } from 'react'
import './styles.css'
import { IProduct } from '../interfaces/IProduct';
import Catalog from '../../features/catalog/Catalog';

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/Products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);

  const addProduct = () => {
    setProducts(prev => [...prev,
      {
        id: prev.length + 101,
        name: "new product",
        price: (prev.length * 100) + 100,
        brand: "new brand",
        description: "some description",
        pictureUrl: "http:picsum.photos/200"
      }
    ])
  }
  
  return (
    <div>
      <h1>Store</h1>
      <Catalog products={products} addProduct={addProduct}/>
    </div>
  )
}

export default App
