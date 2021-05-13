import { useContext, useState } from "react"
import { WaiterContext } from "../context/WaiterContext"

export const WaiterModalAdd = props => {
    const context = useContext(WaiterContext)
    const [form, setForm] = useState({
        name: null, phone: null
    })
    const changeHadler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const addHandler = (event) => {
        event.preventDefault()
        if (!form.name) {
            return alert('Ошибка! Введите ФИО официанта!')
        }
        if (!form.phone) {
            return alert('Ошибка! Введите номер телефона официанта!')
        }

        context.waiter.name = form.name
        context.waiter.phone = form.phone

        props.onAddWaiter()
        props.onModalClose()
    }

    return (
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`} style={{...props.style}}>
            <div className="modal__body">
                <div className="modal__header">
                    <h5>Добавление блюда</h5>
                    <div className='modal__close' onClick={props.onModalClose}>×</div>
                </div>
                <div className='modal__content'>
                    <div className="input-field col s6">
                        <input className="blue-input" id="name" type="text" name="name" onChange={changeHadler}></input>
                        <label htmlFor="name">ФИО официанта</label>
                    </div>
                    <div className="input-field col s6">
                        <input className="blue-input" id="phone" type="text" name="phone" onChange={changeHadler}></input>
                        <label htmlFor="phone">Телефонный номер</label>
                    </div>
                </div>
                <div className="modal__controls">
                    <a href="\" className="waves-effect green btn-small" onClick={addHandler}>Добавить</a>
                </div>
            </div>
        </div>
    )
}