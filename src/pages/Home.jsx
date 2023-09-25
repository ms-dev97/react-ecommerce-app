import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import './Home.css';
import {motion} from 'framer-motion';
import { Pagination, Placeholder } from "rsuite";
import 'rsuite/dist/rsuite-no-reset.min.css';
import {BsArrowClockwise} from 'react-icons/bs';

export default function Home() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setfetchError] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [reload, setReload] = useState([]);

    useEffect(() => {
        fetch(`https://dummyjson.com/products?limit=12&skip=${(activePage-1)*12}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            }).catch(e => setfetchError(true));
    }, [activePage, reload]);

    function tryAgain() {
        setReload([]);
        setfetchError(false);
    }

    function ProductPlaceholder() {
        return (
            <div className="border border-solid rounded-md p-3">
                <Placeholder.Graph />
                <Placeholder.Paragraph style={{ marginTop: 10 }} />
            </div>
        )
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >

            <div className="container mx-auto px-3">
                {isLoading == true ? (
                    fetchError == false ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <ProductPlaceholder />
                            <ProductPlaceholder />
                            <ProductPlaceholder />
                            <ProductPlaceholder />
                            <ProductPlaceholder />
                            <ProductPlaceholder />
                            <ProductPlaceholder />
                            <ProductPlaceholder />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 h-60">
                            <p className="text-lg">Something went wrong!</p>
                            <button className="cursor-pointer border py-2 px-4 flex justify-center items-center gap-3" onClick={tryAgain}>
                                <span className="font-medium text-base">Try Again</span>
                                <BsArrowClockwise />
                            </button>
                        </div>
                    )
                ) : (
                    <>
                        <div className="container mx-auto px-3">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                            limit={12}
                            activePage={activePage}
                            onChangePage={setActivePage}
                            className="container mx-auto my-10 px-3"
                        />
                    </>
                )}
            </div>
        
        </motion.div>
    );
}