function BasketItem(props) {
    const {
        id,
        name,
        price,
        quantity,
        removeFromBasket = Function.prototype,
        updateQuantity = Function.prototype
    } = props;

    const handlerQuantityCount = (event) => {
        calculateQuantity(id, event.target.value)
    }

    const calculateQuantity = (id, quantity) => {
        updateQuantity(id, quantity);
    }

    return (
        <li className="collection-item">
            {name}<br></br>
            <button
                className='item-q'
                onClick={() => calculateQuantity(id, +quantity+1)}
            >
                +
            </button>
            <input
                id='input-q'
                type='number'
                value={quantity}
                min='1'
                max='20'
                onChange={handlerQuantityCount}
            />
            <button
                className='item-q'
                onClick={() => calculateQuantity(id, +quantity-1)}
            >
                -
            </button>
            = ${price * quantity}
            <span
                className="secondary-content"
                onClick={() => removeFromBasket(id)}
            >
                <i className="material-icons basket-delete">close</i>
            </span>
        </li>
    )
}

export {BasketItem}