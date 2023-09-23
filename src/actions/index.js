export const addItem = (item) => {
    return {
        type: 'ADD_ITEM',
        payload: item
    }
};

export const increaseItemQuantity = (item) => {
    return {
        type: 'INCREASE_ITEM_QUANTITY',
        payload: item
    }
};

export const decreaseItemQuantity = (item) => {
    return {
        type: 'DECREASE_ITEM_QUANTITY',
        payload: item
    }
};