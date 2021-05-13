import { useCallback, useEffect, useState } from "react"
import { DateTime } from "../components/DateTime"
import { useHttp } from "../hooks/http.hook"
import dateFormat from 'dateformat'
import { useMessage } from '../hooks/message.hook'

export const ReservationModalAdd = props => {
    const elems = document.querySelectorAll('select');
    window.M.FormSelect.init(elems)

    const message = useMessage()
    const {request} = useHttp()
    const [form, setForm] = useState({
        day: null,
        month: null,
        year: null,
        hour: null,
        minute: null,
        name: null,
        phone: null,
        waiter: null,
        table: null,
        count: null
    })
    const [tables, setTables] = useState([])
    const [waiters, setWaiters] = useState([])

    const add = useCallback( async (body) => {
        try {
            const data = await request('/api/reservations/add', 'POST', body)
            message(data.message)
        } catch (e) {console.log(e.message)}
    }, [request, message])

    const fetchTables = useCallback( async () => {
        try {
            const tables = await request('/api/tables/free', 'GET', null)
            setTables(tables)
        } catch (e) {console.log(e.message)}
    }, [request])

    const fetchWaiters = useCallback( async () => {
        try {
            const waiters = await request('/api/waiters', 'GET', null)
            setWaiters(waiters)
        } catch (e) {console.log(e.message)}
    }, [request])

    useEffect(() => {
        fetchWaiters()
        fetchTables()
    }, [fetchTables, fetchWaiters])

    const changeHadler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const addHandler = (event) => {
        event.preventDefault()
        for (let key in form) {
            if (!form[key]) {
                return alert('Ошибка! Заполните все поля!')
            }
        }
        if (!Number(form.count)) {
            return alert('Ошибка! Кол-во персон должно быть цифрой')
        }
        if (Number(form.count) < 1 || Number(form.count) > 8) {
            return alert('Ошибка! Кол-во персон может состоять от 1 до 8 человек')
        }

        const toDate = new Date(form.year, form.month - 1, form.day, form.hour, form.minute)
        if (new Date > toDate) {
            return alert('Ошибка! Дата не может быть позже текущей!')
        }
        const formattedDate = dateFormat(toDate, 'yyyy-mm-dd hh:mm')
        const reqBody = {
            reservation: {
                date: formattedDate,
                waiterId: form.waiter
            },
            client: {
                name: form.name,
                count: form.count,
                phone: form.phone
            },
            tableId: form.table
        }

        add(reqBody)
        props.onModalClose()
    }

    return (
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`}>
            <div className="modal__body"  style={{ maxWidth: '655px' }}>
                <div className="modal__header">
                    <h5>Добавление брони</h5>
                    <div className='modal__close' onClick={props.onModalClose}>×</div>
                </div>
                <div className='modal__content'>
                    <DateTime
                        options={{
                            changeHandler: changeHadler,
                            withTime: true
                        }}
                    />
                    <div className="input-field col s6">
                        <input className="blue-input" id="name" type="text" name="name" onChange={changeHadler}></input>
                        <label htmlFor="name">ФИО клиента</label>
                    </div>
                    <div className="input-field col s6">
                        <input className="blue-input" id="phone" type="text" name="phone" onChange={changeHadler}></input>
                        <label htmlFor="phone">Номер телефона клиента</label>
                    </div>
                    <div className="input-field col s6">
                        <input className="blue-input" id="count" type="text" name="count" onChange={changeHadler}></input>
                        <label htmlFor="count">Количество персон</label>
                    </div>
                    <select onChange={changeHadler} name="waiter">
                        <option value="none">Официант</option>
                            { waiters ? waiters.map(waiter => {
                                return (
                                    <option key={waiter.Waiter_ID} value={waiter.Waiter_ID}>{ waiter.FIO }</option>
                                )
                            }) : null }
                    </select>
                    <select onChange={changeHadler} name="table">
                        <option value="none">Стол</option>
                            { tables ? tables.map(table => {
                                return (
                                    <option key={table.Table_ID} value={table.Table_ID}>{ `Стол номер: ${table.Table_ID} | Расположение: '${table.Location}' | Вместимость: ${table.Capacity}` }</option>
                                )
                            }) : null }
                    </select>
                </div>
                <div className="modal__controls">
                    <a href="\" className="waves-effect green btn-small" onClick={addHandler}>Добавить</a>
                </div>
            </div>
        </div>
    )
}