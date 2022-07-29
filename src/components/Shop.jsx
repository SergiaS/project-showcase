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
        // чи є товар у кошику
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);

        // якщо < 0, тоді товара немає...
        if (itemIndex < 0) {
            // ...і ми додаємо до цього товару q 1
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem])
        }
        // якщо >=0, тоді товар є...
        else {
            // ...шукаємо його позицію в масиві...
            const newOrder = order.map((orderItem, index) => {
                // ...і, коли це той самий товар під індексом як і itemIndex...
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        // ...тоді змінюємо його q на +1
                        quantity: orderItem.quantity + 1
                    }
                }
                // ...і, якщо індекс інший - товар таким і залишається
                else {
                    return orderItem;
                }
            });
            // оновлюємо стан товарів в заказі
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
                />
            }
        </main>
    )
}

export {Shop};