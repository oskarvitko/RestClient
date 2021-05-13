import { useContext, useState } from "react"
import { DishContext } from "../context/DishContext"

export const DishModalAdd = props => {
    const context = useContext(DishContext)
    const [form, setForm] = useState({
        name: null, price: null, weight: null
    })
    const changeHadler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const addHandler = (event) => {
        event.preventDefault()
        if (!form.name) {
            return alert('Ошибка! Введите название блюда!')
        }
        if (!Number(form.price)) {
            return alert('Ошибка! Цена должна состоять из цифр!')
        }
        if (Number(form.price) < 1) {
            return alert('Ошибка! Цена должна быть больше 0!')
        }
        if (!Number(form.weight)) {
            return alert('Ошибка! Вес должен состоять из цифр!')
        }
        if (Number(form.weight) < 1) {
            return alert('Ошибка! Вес должен быть больше 0!')
        }

        context.dish.name = form.name
        context.dish.price = form.price
        context.dish.weight = form.weight

        props.addDish()
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
                        <label htmlFor="name">Название блюда</label>
                    </div>
                    <div className="input-field col s6">
                        <input className="blue-input" id="price" type="text" name="price" onChange={changeHadler}></input>
                        <label htmlFor="price">Цена блюда (BYN)</label>
                    </div>
                    <div className="input-field col s6">
                        <input className="blue-input" id="weight" type="text" name="weight" onChange={changeHadler}></input>
                        <label htmlFor="weight">Вес блюда (гр)</label>
                    </div>
                </div>
                <div className="modal__controls">
                    <a href="\" className="waves-effect green btn-small" onClick={addHandler}>Добавить</a>
                </div>
            </div>
        </div>
    )
}