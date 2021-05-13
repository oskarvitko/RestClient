import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { WaitersList } from '../components/WaitersList'
import { WaiterContext } from '../context/WaiterContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { WaiterModalAdd } from '../modal/WaiterModalAdd'

export const WaitersPage = () => {
    const {loading, request} = useHttp()
    const [waiters, setWaiters] = useState([])
    const [searchField, setSearchField] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [modal, setModal] = useState({
        isOpened: false
    })
    const context = useContext(WaiterContext)
    const message = useMessage()

    const fetch = useCallback( async() => {
        try{
            const waiters = await request('/api/waiters', 'GET', null)
            setWaiters(waiters)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        fetch()
    }, [fetch])

    const find = useCallback( async () => {
        try {
            const clients = await request('/api/waiters', 'POST', {searchField})
            setWaiters(clients)
        } catch (e) {}
    }, [request, searchField])

    useEffect(() => {
        fetch()
    }, [fetch])

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
        fetch()
        setDisabled(true)
    }

    const addHandler = async () => {
        try {
            const data = await request('/api/waiters/add', 'POST', {...context.waiter})
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
            <h1 className="center">Информация по официантам:</h1>
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
                <a
                    href='/'
                    className="waves-effect btn blue  tools__item col s2"
                    onClick={(event) => {
                        event.preventDefault()
                        setModal({ isOpened: true })
                    }}
                    >Добавить официанта</a>
            </div>
            {!loading && <WaitersList waiters={waiters} reload={reload} />}
            <WaiterModalAdd
                isOpened={modal.isOpened}
                title={modal.title}
                onModalClose={() => setModal({isOpened: false})}
                onAddWaiter={addHandler}
            />
        </div>
    )
}
