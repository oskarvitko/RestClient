import { useContext, useState } from "react"
import { TableContext } from "../context/TableContext"

export const TableModalAdd = props => {
    const context = useContext(TableContext)
    const [form, setForm] = useState({
        location: 'Окно', capacity: '2'
    })
    const changeHadler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const addHandler = (event) => {
        event.preventDefault()
        context.location = form.location
        context.capacity = form.capacity
        props.onAddTable()
        props.onModalClose()
    }

    return (
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`} style={{...props.style}}>
            <div className="modal__body">
                <div className="modal__header">
                    <h5>Добавление стола</h5>
                    <div className='modal__close' onClick={props.onModalClose}>×</div>
                </div>
                <div className='modal__content'>
                    <div className="input-field col s12">
                        <h6>Количество мест</h6>
                        <select onChange={changeHadler} name="capacity">
                            <option value="2" disabled>Выберите количество мест</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                    <div className="input-field col s12">
                        <h6>Место расположения</h6>
                        <select onChange={changeHadler} name="location">
                            <option value="Окно" disabled>Выберите место расположения</option>
                            <option value="Окно">Окно</option>
                            <option value="Бар">Бар</option>
                            <option value="Зал">Зал</option>
                            <option value="Сцена">Сцена</option>
                            <option value="Центр">Центр</option>
                        </select>
                    </div>
                </div>
                <div className="modal__controls">
                    <a href="\" className="waves-effect green btn-small" onClick={addHandler}>Добавить</a>
                </div>
            </div>
        </div>
    )
}