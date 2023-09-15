import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {BsFillCartFill, BsChevronUp, BsChevronDown} from 'react-icons/bs';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {motion} from 'framer-motion';
import ProductCard from "../components/ProductCard";

export default function Product() {
    const [product, setProduct] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setfetchError] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const {id, category} = useParams();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setIsLoading(false);
            })
            .catch(e => setfetchError(true));

        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(res => res.json())
            .then(data => {
                setSimilarProducts(data);
            })
    }, [id]);


    function increaseQuantity() {
        setQuantity(q => q += 1);
    }

    function decreaseQuantity() {
        setQuantity(q => q > 0 ? q -= 1 : 0);
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
        {isLoading == true ? (
            !fetchError ? <div>Loading...</div> : <div>Something went wrong!</div>
        ) : (
            <>
                <div className="container md:flex my-5 mx-auto gap-10">
                    {/* Product Image Slider */}
                    <div className="md:w-1/2">
                        <Carousel>
                            {product.images && product?.images.map(img => (<img src={img} key={img} />))}
                        </Carousel>
                    </div>
                    {/* Product Details */}
                    <div className="md:w-1/2">
                        <div className="font-medium text-sm uppercase">
                            {category}
                        </div>
                        <h1 className="font-bold text-3xl text-gray-800 mb-5">
                            {product.title}
                        </h1>
                        <div className="font-medium text-lg mb-5">
                            {product.discountPercentage > 0 ? (
                                <div className='flex gap-2'>
                                    <span>
                                        ${(product.price - ((product.discountPercentage*product.price)/100)).toFixed(2)}
                                    </span>
                                    <s className='font-normal text-slate-400'>
                                        ${product.price}
                                    </s>
                                </div>
                            ) : (
                                <span>${product.price}</span>
                            )}
                        </div>
                        <p className="mb-3">
                            {product.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-5">
                            <button className="flex items-center gap-3 bg-cyan-600 text-white py-2 px-5 rounded">
                                <BsFillCartFill />
                                <span className="font-medium text-sm">Add to cart</span>
                            </button>
                            <div className="flex items-center gap-3 border border-solid py-1 px-5 rounded">
                                <span>Quantity: {quantity}</span>
                                <div>
                                    <div onClick={() => increaseQuantity()}>
                                        <BsChevronUp />
                                    </div>
                                    <div onClick={() => decreaseQuantity()}>
                                        <BsChevronDown />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <section className="my-9 mx-auto container">
                    <h4 className="font-bold text-2xl text-slate-900 mb-3">You may also like</h4>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {similarProducts.products && similarProducts.products.map((item, i) => {
                            if (i == 4) return;
                            return <ProductCard 
                                key={item.id}
                                category={item.category}
                                id={item.id}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                price={item.price}
                            />
                        })}
                    </div>
                </section>
            
            </>
        )}
        </motion.div>
    );
}