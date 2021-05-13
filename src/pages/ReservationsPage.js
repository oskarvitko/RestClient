import React, { useCallback, useEffect, useState } from 'react'
import { DateTime } from '../components/DateTime'
import { Loader } from '../components/Loader'
import { ReservationsList } from '../components/ReservationsList'
import { useHttp } from '../hooks/http.hook'
import { ReservationModalAdd } from '../modal/ReservationModalAdd'
import dateFormat from 'dateformat'

export const ReservationsPage = () => {
    const [reservations, setReservations] = useState([])
    const {loading, request} = useHttp()
    const [modal, setModal] = useState({ isOpened: false })
    const [active, setActive] = useState('all')
    const [date, setDate] = useState({
        day: null, month: null, year: null
    })

    const fetchReservations = useCallback( async(type) => {
        try{
            const fetched = await request(`/api/reservations/${type}`, 'GET', null)
            setReservations(fetched)
        } catch (e) {}
    }, [request])

    const getOnDate = useCallback( async(formattedDate) => {
        try{
            const fetched = await request(`/api/reservations/date`, 'POST', formattedDate)
            setReservations(fetched)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        fetchReservations('all')
    }, [fetchReservations])

    const changeFilterHandler = event => {
        event.preventDefault()
        const newType = event.target.dataset.type
        setActive(newType)
        fetchReservations(newType)
    }

    const changeHadler = event => {
        setDate({ ...date, [event.target.name]:event.target.value })
    }

    const confirmHandler = event => {
        event.preventDefault()
        for (let key in date) {
            if (!date[key]) {
                return alert('Ошибка! Заполните все поля даты!')
            }
        }

        const toDate = new Date(date.year, date.month - 1, date.day)
        const formattedDate = dateFormat(toDate, 'yyyy-mm-dd')
        setActive(null)
        getOnDate({date: formattedDate})
    }

    const reload = () => fetchReservations('all')

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1 className="center">Бронирование:</h1>
            <DateTime
                options={{
                    changeHandler: changeHadler,
                    confirmHandler: confirmHandler,
                    confirmText: 'Поиск'
                 }}
            />
            <div className="tools__list row">
                <a
                    href='/'
                    className="waves-effect btn amber darken-3  tools__item col s2"
                    data-type="all"
                    disabled={active === 'all'}
                    onClick={changeFilterHandler}
                    >Все</a>
                <a
                    href='/'
                    className="waves-effect btn amber darken-3  tools__item col s2"
                    data-type="active"
                    disabled={active === 'active'}
                    onClick={changeFilterHandler}
                    >Активные</a>
                <a
                    href='/'
                    className="waves-effect btn green  tools__item col s2"
                    onClick={(event) => {
                        event.preventDefault()
                        setModal({ isOpened: true })
                    }}
                    >Добавить бронь</a>
            </div>
            {!loading && <ReservationsList reservations={reservations} reload={reload} />}
            <ReservationModalAdd
                isOpened={modal.isOpened}
                onModalClose={() => {
                    setModal({ isOpened: false })
                    reload()
                }}
            />
        </div>
    )
}
