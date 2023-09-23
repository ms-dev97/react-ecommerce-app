const cartReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.payload]
            break;

        case 'INCREASE_ITEM_QUANTITY':
            return state.map(item => {
                if (item.id === action.payload.id) item.quantity++;
                return item;
            });
            break;

        case 'DECREASE_ITEM_QUANTITY':
            return state.map(item => {
                if (item.id === action.payload.id) item.quantity =  Math.max(item.quantity-1, 1);
                return item;
            });
            break;
    
        default:
            return state;
    }
};

export default cartReducer;