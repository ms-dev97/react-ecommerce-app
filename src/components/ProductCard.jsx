import { useNavigate } from 'react-router-dom';
import cartIcon from '../assets/img/cart.svg';

export default function ProductCard({id, thumbnail, title, price, discountPercentage}) {
    const navigate = useNavigate();

    return (
        <div className='border border-solid rounded p-4'>
            <div className='max-h-[150px] overflow-hidden'>
                <img src={thumbnail} alt="" />
            </div>
            <h4 className="font-bold my-2" onClick={() => navigate(`/product/${id}`)}>
                {title}
            </h4>
            <div className='flex justify-between items-center'>
                <div className='font-medium'>
                    {discountPercentage > 0 ? (
                        <div className='flex gap-2'>
                            <span>${price}</span>
                            <s className='font-normal text-slate-400'>
                                ${(price - ((discountPercentage*price)/100)).toFixed(2)}
                            </s>
                        </div>
                    ) : (
                        <span>${price}</span>
                    )}
                    
                    {/* {discountPercentage && (
                            
                    )} */}
                </div>
                <div className='cursor-pointer'>
                    <img src={cartIcon} alt="cart icon" />
                </div>
            </div>
        </div>
    );
}