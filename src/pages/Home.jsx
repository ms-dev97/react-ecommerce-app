import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setfetchError] = useState(false);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setIsLoading(false);
            }).catch(e => setfetchError(true));
    }, []);

    return (
        isLoading == true ? (
            !fetchError ? <div>Loading</div> : <div>Something went wrong!</div>
        ) : (
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {products.map(product => (
                        <ProductCard key={product.id}
                                    id={product.id}
                                    thumbnail={product.thumbnail}
                                    title={product.title}
                                    price={product.price}
                                    discountPercentage={product.discountPercentage} />
                    ))}
                </div>
            </div>
        )
    );
}