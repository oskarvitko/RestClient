import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { OrdersList } from '../components/OrdersList'
import { OrderContext } from '../context/OrderContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { OrderModalAdd } from '../modal/OrderModalAdd'

export const OrdersPage = () => {
    const elems = document.querySelectorAll('select');
    window.M.FormSelect.init(elems);

    const {loading, request} = useHttp()
    const [orders, setOrders] = useState([])
    const [id, setId] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [modal, setModal] = useState({
        isOpened: false
    })
    const context = useContext(OrderContext)
    const message = useMessage()

    const fetch = useCallback( async() => {
        try{
            const orders = await request('/api/orders', 'GET', null)
            setOrders(orders)
        } catch (e) {}
    }, [request])


    useEffect(() => {
        fetch()
    }, [fetch])

    const find = useCallback( async () => {
        try {
            const orders = await request(`/api/orders/${id}`, 'GET', null)
            setOrders(orders)
        } catch (e) {}
    }, [request, id])

    useEffect(() => {
        fetch()
    }, [fetch])

    const changeHandler = event => {
        setId(event.target.value)
    }

    const searchHandler = event => {
        event.preventDefault()
        if (Number(id)) {
            find()
            setDisabled(false)
        } else {
            alert('Ошибка! Необходимо ввести число!')
        }
    }

    const resetHandler = event => {
        event.preventDefault()
        fetch()
        setDisabled(true)
    }

    const addHandler = async () => {
        try {
            const data = await request('/api/orders/add', 'POST', {...context.order})
            message(data.message)
            reload()
        } catch (e) {}
    }

    const reload = () => fetch()

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1 className="center">Информация по заказам:</h1>
            <div className="row  tools__search">
                <a
                    href='/'
                    className="waves-effect blue btn  col s2 tools__search-item"
                    onClick={resetHandler}
                    disabled={disabled}
                    >Сбросить</a>
                <a
                    href='/'
                    className="waves-effect blue btn  col s2 tools__search-item"
                    onClick={searchHandler}
                    >Поиск</a>
                <div className="input-field col s7 tools__search-item">
                    <input
                        className="blue-input"
                        id="search"
                        type="text"
                        onChange={changeHandler}
                        ></input>
                    <label htmlFor="search">Поиск по номеру заказа</label>
                </div>
                <a
                    href='/'
                    className="waves-effect btn blue  tools__item col s4"
                    onClick={async (event) => {
                        event.preventDefault()
                        setModal({
                            isOpened: true
                        })
                    }}
                    >Добавить заказ</a>
            </div>
            {!loading && <OrdersList orders={orders} />}
            <OrderModalAdd
                isOpened={modal.isOpened}
                onModalClose={() => { reload()
                    setModal({ isOpened: false })
                }}
            />
        </div>
    )
}
