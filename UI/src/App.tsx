import './App.css'

const products = [
    { name: 'product1', price: 100.00 },
    { name: 'product2', price: 200.00 },
]
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
