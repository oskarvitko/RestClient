import { useEffect, useState } from "react"

export const OrderModalInfo = props => {

    return (
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`} style={{...props.style}}>
            <div className="modal__body">
                <div className="modal__header">
                    <h5>Заказ номер: {props.orderId}</h5>
                    <div className='modal__close' onClick={props.onModalClose}>×</div>
                </div>
                <div className='modal__content'>
                    <h6>Блюда в заказе:</h6>
                    <table className="centered">
                        <thead>
                            <tr>
                                <th>Название блюда:</th>
                                <th>Количество:</th>
                                <th>Сумма:</th>
                            </tr>
                        </thead>
                        <tbody>
                        { props.dishes ? props.dishes.map(dish => {
                            const sum = Number(dish.Count) * Number(dish.Price)
                            return (
                            <tr key={dish.Dish_ID}>
                                <td>{ dish.Name }</td>
                                <td>{ dish.Count }</td>
                                <td>{ sum }</td>
                            </tr>
                        )}) : null }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}