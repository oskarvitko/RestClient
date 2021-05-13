import { useCallback, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { OrderModalInfo } from "../modal/OrderModalInfo"


export const OrdersList = ({ orders }) => {
    const [dishes, setDishes] = useState([])
    const { request} = useHttp()
    const [modal, setModal] = useState({
        isOpened: false
    })

    const fetch = useCallback(async (id) => {
        try {
            const dishes = await request(`/api/orders/getdishes${id}`, 'POST', null)
            setDishes(dishes)
        } catch (e) {}
    }, [request])

    if (!orders.length) {
        return <h5 className="center">Заказов нет</h5>
    }

    const openModalHandler = async event => {
        event.preventDefault()
        fetch(event.target.id)
        setModal({
            isOpened: true,
            orderId: event.target.id,
            dishes: dishes
        })
    }


    return (
        <div>
            <table className="centered">
                <thead>
                    <tr>
                        <th>Номер заказа</th>
                        <th>Сумма заказа (BYN)</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    { orders.map(order => {
                    return (
                        <tr key={ order.Order_ID }>
                            <td>{ order.Order_ID }</td>
                            <td>{ order.Sum }</td>
                            <td><a href='dishes' className="green btn" id={order.Order_ID} onClick={openModalHandler}>Блюда...</a></td>
                        </tr>
                    )})}
                </tbody>
            </table>
            <OrderModalInfo
                isOpened={modal.isOpened}
                orderId={modal.orderId}
                dishes={modal.dishes}
                onModalClose={() => setModal({isOpened: false})}
            />
        </div>
    )
}