import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import './Home.css';
import {motion} from 'framer-motion';
import { Pagination } from "rsuite";

export default function Home() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setfetchError] = useState(false);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        fetch(`https://dummyjson.com/products?limit=10&skip=${(activePage-1)*10}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            }).catch(e => setfetchError(true));
    }, [activePage]);

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
        {isLoading == true ? (
            !fetchError ? <div>Loading</div> : <div>Something went wrong!</div>
        ) : (
            <>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        {data.products.map(product => (
                            <ProductCard key={product.id}
                                        id={product.id}
                                        category={product.category}
                                        thumbnail={product.thumbnail}
                                        title={product.title}
                                        price={product.price}
                                        discountPercentage={product.discountPercentage} />
                        ))}
                    </div>
                </div>

                <Pagination
                    total={data.total}
                    limit={data.limit}
                    activePage={activePage}
                    onChangePage={setActivePage}
                    className="container mx-auto my-10"
                />

            </>
        )}
        </motion.div>
    );
}