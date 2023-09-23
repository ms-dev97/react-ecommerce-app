import { Link, useNavigate } from 'react-router-dom';

export default function ProductCard({id, category, thumbnail, title, price, discountPercentage}) {
    const navigate = useNavigate();

    return (
        <div className='border border-solid rounded-md p-3'>
            <div className='max-h-[150px] overflow-hidden rounded'>
                <img src={thumbnail} alt="" />
            </div>
            <h4 className="font-bold my-2">
                <Link to={`/product/${category}/${id}`}>
                    {title}
                </Link>
            </h4>
            <div className='font-medium'>
                {discountPercentage > 0 ? (
                    <div className='flex gap-2'>
                        <span>
                            ${(price - ((discountPercentage*price)/100)).toFixed(2)}
                        </span>
                        <s className='font-normal text-slate-400'>${price}</s>
                    </div>
                ) : (
                    <span>${price}</span>
                )}
            </div>
        </div>
    );
}