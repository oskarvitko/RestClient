import React, { useCallback, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { ReservationsList } from '../components/ReservationsList'
import { useHttp } from '../hooks/http.hook'

export const HomePage = () => {
    const [reservations, setReservations] = useState([])
    const {loading, request} = useHttp()

    const fetchReservations = useCallback( async() => {
        try{
            const fetched = await request('/api/home', 'GET', null)
            setReservations(fetched)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        fetchReservations()
    }, [fetchReservations])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1 className="center">Бронирование на сегодня:</h1>
            {!loading && <ReservationsList reservations={reservations} />}
        </div>
    )
}
