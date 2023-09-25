import { useDispatch, useSelector } from "react-redux";
import { BsChevronUp, BsChevronDown, BsXCircle } from "react-icons/bs";
import { increaseItemQuantity, decreaseItemQuantity } from "../actions";

export default function Cart({closeCart}) {
    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div>
                <div className="font-bold text-xl mb-4 flex justify-between items-center">
                    Cart
                    <BsXCircle className="cursor-pointer" onClick={() => closeCart(false)} />
                </div>

                {
                    cartItems.length > 0 ? (cartItems.map(item => (
                        <div className="flex gap-2 mb-5" key={item.id}>
                            <div className="w-12 h-12">
                                <img src={item.thumbnail} alt="" />
                            </div>
                            <div className="w-full">
                                <div className="font-bold text-lg">{item.name}</div>
                                <div className="flex justify-between items-center">
                                    <div className="font-medium">
                                        ${(item.price*item.quantity).toFixed(2)}
                                    </div>
                                    <div className="flex items-center gap-3 border border-solid py-1 px-3 rounded">
                                        <span>
                                            Qty: {item.quantity}
                                        </span>
                                        <div>
                                            <div className="cursor-pointer" onClick={() => dispatch(increaseItemQuantity(item))}>
                                                <BsChevronUp />
                                            </div>
                                            <div className="cursor-pointer" onClick={() => dispatch(decreaseItemQuantity(item))}>
                                                <BsChevronDown />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )))
                    :
                    (
                        <div>Cart is empty</div>
                    )
                }

                
            </div>
    )
}