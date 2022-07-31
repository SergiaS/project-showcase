import {useState, useEffect} from "react";
import {API_KEY, API_URL} from "../config";

import {Preloader} from "./Preloader";
import {GoodsList} from "./GoodsList";
import {Cart} from "./Cart";
import {BasketList} from "./BasketList";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem])
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem;
                }
            });
            setOrder(newOrder);
        }
    }

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(orderItems => orderItems.id !== itemId);
        setOrder(newOrder);
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) return;
        const newOrder = order.map((orderItem) => {
            if (orderItem.id === itemId) {
                return {
                    ...orderItem,
                    quantity: newQuantity
                }
            } else {
                return orderItem;
            }
        });
        setOrder(newOrder);
    }

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY,
            },
        })
            .then(response => response.json())
            .then(data => {
                data.featured && setGoods(data.featured);
                setLoading(false);
            })
    }, []);

    return (
        <main className='container content'>
            <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
            {loading
                ? <Preloader />
                : <GoodsList goods={goods} addToBasket={addToBasket} />
            }
            {
                isBasketShow &&
                <BasketList
                    order={order}
                    handleBasketShow={handleBasketShow}
                    removeFromBasket={removeFromBasket}
                    updateQuantity={updateQuantity}
                />
            }
        </main>
    )
}

export {Shop};