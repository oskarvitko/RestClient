import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { TablesList } from '../components/TablesList'
import { TableContext } from '../context/TableContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { TableModalAdd } from '../modal/TableModalAdd'

export const TablesPage = () => {
    const elems = document.querySelectorAll('select');
    window.M.FormSelect.init(elems);

    const context = useContext(TableContext)
    const message = useMessage()
    const [tables, setTables] = useState([])
    const {loading, request} = useHttp()
    const [active, setActive] = useState('all')
    const [modal, setModal] = useState({
        isOpened: false
    })

    const fetchTables = useCallback( async type => {
        try{
            const fetched = await request(`/api/tables/${type}`, 'GET', null)
            setTables(fetched)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        fetchTables('all')
    }, [fetchTables])

    const changeFilterHandler = event => {
        event.preventDefault()
        const newType = event.target.dataset.type
        setActive(newType)
        fetchTables(newType)
    }

    const addHandler = async () => {
        try {
            const data = await request('/api/tables/add', 'POST', {...context})
            message(data.message)
            reload()
        } catch (e) {}
    }

    const reload = () => fetchTables(active)

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1 className="center">Информация по столикам:</h1>
            <div className="tools__list end row">
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
                    data-type="free"
                    disabled={active === 'free'}
                    onClick={changeFilterHandler}
                    >Свободные</a>
                <a
                    href='/'
                    className="waves-effect btn blue  tools__item col s2"
                    onClick={(event) => {
                        event.preventDefault()
                        setModal({ isOpened: true })
                    }}
                    >Добавить стол</a>
            </div>
            {!loading && <TablesList tables={tables} reload={reload} />}
            <TableModalAdd
                isOpened={modal.isOpened}
                title={modal.title}
                onModalClose={() => setModal({isOpened: false})}
                onAddTable={addHandler}
            />
        </div>
    )
}
