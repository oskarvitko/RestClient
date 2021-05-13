import { useCallback, useContext, useEffect, useState } from "react"
import { OrderContext } from "../context/OrderContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const OrderModalAdd = props => {
    const message = useMessage()
    const [loadedDishes, setLoadedDishes] = useState([])
    const [reservations, setReservations] = useState([])
    const [reservationId, setReservationId] = useState(null)
    const {request} = useHttp()
    const context = useContext(OrderContext)
    const [table, setTable] = useState(null)
    const [form, setForm] = useState({
        id: null, name: null, count: null
    })
    const [currentDishes, setCurrentDishes] = useState([])

    const saveOrder = useCallback( async () => {
        try {
            const data = await request('/api/orders/addorder', 'POST', context.order)
            message(data.message)
        } catch (e) {console.log(e.message);}
    }, [request])

    const fetchReservations = useCallback( async () => {
        try{
            const reservations = await request(`/api/reservations/order`, 'GET', null)
            setReservations(reservations)
        } catch (e) {}
    }, [request])

    const getDishes = useCallback( async () => {
        try{
            const loadedDishes = await request(`/api/dishs/all`, 'GET', null)
            setLoadedDishes(loadedDishes)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        getDishes()
        fetchReservations()
      }, [getDishes, fetchReservations])

    const changeHadler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const addHandler = (event) => {
        event.preventDefault()
        if (!form.name) {
            return alert('Ошибка! Выберите блюдо!')
        }
        if (!Number(form.count)) {
            return alert('Ошибка! Количество должно быть числом!')
        }
        if (Number(form.count) < 1) {
            return alert('Ошибка! Количество должно быть больше 0!')
        }
        const exists = currentDishes.find(dish => dish.name === form.name)
        if (exists) {
            return alert('Ошибка! Нелья выбирать одинковые блюда!')
        }

        const newDish = {
            id: loadedDishes.find(dish => dish.Name === form.name).Dish_ID,
            name: form.name,
            count: form.count
        }

        currentDishes.push(newDish)

        setTable(showTable())
    }
    const saveHandler = async (event) => {
        event.preventDefault()
        if (currentDishes.length === 0) {
            return alert('Выберите блюдо!')
        }
        if (!reservationId) {
            return alert('Выберите бронь к которой прикрепить заказ!')
        }

        const sum = currentDishes.reduce((sum, dish) => {
            const price = loadedDishes.find(item => item.Dish_ID === dish.id).Price
            sum += (price * dish.count)
            return sum
        }, 0)
        context.order.sum = 0
        context.order.reservationId = null
        context.order.dishes = []
        context.order.sum = sum
        currentDishes.map(dish => {
            context.order.dishes.push({ id: dish.id, count: dish.count })
        })
        context.order.reservationId = reservationId
        await saveOrder()
        props.onModalClose()
    }

    const idChangeHandler = event => {
        setReservationId(event.target.value)
    }

    const showTable = () => {
        return (
            currentDishes.map(dish => {
                return (
                    <tr key={ dish.id }>
                        <td>{ dish.name }</td>
                        <td>{ dish.count }</td>
                    </tr>
                )
            })
        )
    }

    return (
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`} style={{...props.style}}>
            <div className="modal__body">
                <div className="modal__header">
                    <h5>Добавление заказа</h5>
                    <div className='modal__close' onClick={props.onModalClose}>×</div>
                </div>
                <div className='modal__content'>
                        <select onChange={idChangeHandler}>
                            <option value="none">Бронь</option>
                                { reservations ? reservations.map(reserv => {
                                    return (
                                        <option key={reserv.Reservation_ID} value={reserv.Reservation_ID}>{ `Номер брони: #${reserv.Reservation_ID}` }</option>
                                    )
                                }) : null }
                        </select>
                        <h6>Название блюда</h6>
                        <div className="input-field col s12">
                            <select onChange={changeHadler} name="name">
                                <option value="none">Выберите название блюда</option>
                                { loadedDishes ? loadedDishes.map(dish => {
                                    return (
                                        <option key={dish.Dish_ID} value={dish.Name}>{ dish.Name }</option>
                                    )
                                }) : null }
                            </select>
                        </div>
                        <div className="input-field col s6">
                            <input className="blue-input" id="count" type="text" name="count" onChange={changeHadler}></input>
                            <label htmlFor="count">Количество</label>
                        </div>
                        <a href="\" className="waves-effect green btn-small" onClick={addHandler}>Добавить</a>
                        <table className="centered">
                            <thead>
                                <tr>
                                    <th>Название блюда:</th>
                                    <th>Количество:</th>
                                </tr>
                            </thead>
                            <tbody>
                            { table }
                            </tbody>
                        </table>
                    </div>
                <div className="modal__controls">
                    <a href="\" className="waves-effect green btn-small" onClick={saveHandler}>Сохранить</a>
                </div>
            </div>
        </div>
    )
}