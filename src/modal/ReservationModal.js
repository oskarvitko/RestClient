
export const ReservationModal = props => {
    return (
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`} style={{...props.style}}>
            <div className="modal__body">
                <div className="modal__header">
                    <h5>{props.title}</h5>
                    <div className='modal__close' onClick={props.onModalClose}>×</div>
                </div>
                <div className='modal__content'>
                    <div className="reservation-row">
                        <div className="modal__thead">Номер брони:</div>
                        <div className="modal__value">{props.item ? props.item.id : null}</div>
                    </div>
                    <div className="reservation-row">
                        <div className="modal__thead">Дата:</div>
                        <div className="modal__value">{props.item ? props.item.date : null}</div>
                    </div>
                    <div className="reservation-row">
                        <div className="modal__thead">Время:</div>
                        <div className="modal__value">{props.item ? props.item.time : null}</div>
                    </div>
                    <div className="reservation-row">
                        <div className="modal__thead">Состояние:</div>
                        <div className="modal__value">{props.item ? props.item.isActive : null}</div>
                    </div>
                    <div className="reservation-row">
                        <div className="modal__thead">Клиент:</div>
                        <div className="modal__value">{props.item ? props.item.cfio : null}</div>
                    </div>
                    <div className="reservation-row">
                        <div className="modal__thead">Телефон клиента:</div>
                        <div className="modal__value">{props.item ? props.item.cphone : null}</div>
                    </div>
                    <div className="reservation-row">
                        <div className="modal__thead">Количество людей:</div>
                        <div className="modal__value">{props.item ? props.item.count : null}</div>
                    </div>
                    <div className="reservation-row">
                        <div className="modal__thead">Номер стола:</div>
                        <div className="modal__value">{props.item ? props.item.table : null}</div>
                    </div>
                    <div className="reservation-row">
                        <div className="modal__thead">Расположение:</div>
                        <div className="modal__value">{props.item ? props.item.location : null}</div>
                    </div>
                    <div className="reservation-row">
                        <div className="modal__thead">Официант:</div>
                        <div className="modal__value">{props.item ? props.item.wfio : null}</div>
                    </div>
                    <div className="reservation-row">
                        <div className="modal__thead">Телефон официанта:</div>
                        <div className="modal__value">{props.item ? props.item.wphone : null}</div>
                    </div>
                    <div className="reservation-row">
                        <div className="modal__thead">Номер заказа:</div>
                        <div className="modal__value">{props.item ? props.item.order : 'Нет'}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}