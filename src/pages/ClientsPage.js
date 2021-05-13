import React, { useCallback, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { ClientsList } from '../components/ClientsList'
import { useHttp } from '../hooks/http.hook'

export const ClientsPage = () => {
    const [clients, setClients] = useState([])
    const {loading, request} = useHttp()
    const [searchField, setSearchField] = useState(null)
    const [disabled, setDisabled] = useState(true)

    const fetchClients = useCallback( async() => {
        try{
            const fetched = await request('/api/clients', 'GET', null)
            setClients(fetched)
        } catch (e) {}
    }, [request])

    const find = useCallback( async () => {
        try {
            const clients = await request('/api/clients', 'POST', {searchField})
            setClients(clients)
        } catch (e) {}
    }, [request, searchField])

    useEffect(() => {
        fetchClients()
    }, [fetchClients])

    const changeHandler = event => {
        setSearchField(event.target.value)
    }

    const searchHandler = event => {
        event.preventDefault()
        if (searchField) {
            find()
            setDisabled(false)
        }
    }

    const resetHandler = event => {
        event.preventDefault()
        fetchClients()
        setDisabled(true)
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1 className="center">Информация по клиентам:</h1>
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
                    <label htmlFor="search">Поиск по имени</label>
                </div>
            </div>
            {!loading && <ClientsList clients={clients} />}
        </div>
    )
}
