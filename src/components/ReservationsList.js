import dateFormat from 'dateformat'
import { useCallback, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { ReservationModal } from '../modal/ReservationModal';

export const ReservationsList = ({ reservations, reload }) => {
    const {request} = useHttp()
    const message = useMessage()
    const [modal, setModal] = useState({
        isOpened: false
    })

    const closeFetch = useCallback( async (id) => {
        try {
            const data = await request(`/api/reservations/close${id}`, 'POST', null)
            message(data.message)
            reload()
        } catch (e) {}
    }, [request])

    if (!reservations.length) {
        return <h5 className="center">Броней нет</h5>
    }

    return (
        <div>
            <table className="centered">
                <thead>
                    <tr>
                        <th>Номер брони</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Расположение</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    { reservations.map(reservation => {
                        const convertedDate = new Date(reservation.Date)
                        const date = dateFormat(convertedDate, "dd-mm-yyyy")
                        const time = dateFormat(convertedDate, "hh:MM")
                        const close = reservation.Is_Active ? <a href='/' className="waves-effect red darken-1 btn" onClick={ async (event) => {
                            event.preventDefault()
                            await closeFetch(reservation.Reservation_ID)
                        }}>Закрыть бронь</a> : <h6>Закрыта</h6>
                        return (
                            <tr key={reservation.Reservation_ID}>
                                <td>{ reservation.Reservation_ID }</td>
                                <td>{ date }</td>
                                <td>{ time }</td>
                                <td>{ reservation.Location ? reservation.Location : 'Нет' }</td>
                                <td><a href='#modal1' className="waves-effect blue btn modal-trigger" onClick={() => setModal({
                                    isOpened: true,
                                    title: 'Информация по брони:',
                                    item: {
                                        id: reservation.Reservation_ID,
                                        date: date,
                                        time: time,
                                        isActive: reservation.Is_Active ? 'Открыта' : 'Закрыта',
                                        cfio: reservation.FIO,
                                        cphone: reservation.Phone,
                                        count: reservation.Person_count,
                                        location: reservation.Location ? reservation.Location : 'Нет',
                                        wfio: reservation.WFIO ? reservation.WFIO : 'Нет',
                                        wphone: reservation.WPhone ? reservation.WPhone : 'Нет',
                                        table: reservation.Table_ID ? reservation.Table_ID : 'Нет',
                                        order: reservation.Order_ID ? reservation.Order_ID : 'Нет'
                                    }

                                })}>Подробнее...</a></td>
                                <td>{ close }</td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
            <ReservationModal
                isOpened={modal.isOpened}
                title={modal.title}
                item={modal.item}
                onModalClose={() => setModal({isOpened: false})}
            />
        </div>
    )
}