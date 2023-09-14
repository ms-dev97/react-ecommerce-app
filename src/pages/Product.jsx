import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {BsFillCartFill, BsChevronUp, BsChevronDown} from 'react-icons/bs';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Product() {
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setfetchError] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const {id} = useParams();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setIsLoading(false);
            })
            .catch(e => setfetchError(true));
    }, []);

    function increaseQuantity() {
        setQuantity(q => q += 1);
    }

    function decreaseQuantity() {
        setQuantity(q => q > 0 ? q -= 1 : 0);
    }

    return (
        isLoading == true ? (
            !fetchError ? <div>Loading...</div> : <div>Something went wrong!</div>
        ) : (
            <div className="container md:flex my-5 mx-auto gap-3">
                <div className="md:w-1/2">
                    <Carousel>
                        {product.images && product?.images.map(img => (<img src={img} key={img} />))}
                    </Carousel>
                </div>

                <div className="md:w-1/2">
                    <div className="font-medium">Fruits</div>
                    <h1 className="font-bold text-3xl text-gray-800 mb-5">Fresh figs</h1>
                    <div className="font-medium text-lg mb-5">$24.00</div>
                    <p className="mb-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam asperiores pariatur quod sed non. Quam ullam ipsum voluptatum libero atque dolores harum quisquam rem, deserunt culpa voluptates excepturi maiores nulla.
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
        )
    );
}