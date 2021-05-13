import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { DishsList } from '../components/DishsList'
import { useHttp } from '../hooks/http.hook'
import { DishModalAdd } from '../modal/DishModalAdd'
import { DishContext } from '../context/DishContext'
import { useMessage } from '../hooks/message.hook'

export const DishsPage = () => {
    const message = useMessage()
    const {loading, request} = useHttp()
    const [dishes, setDishes] = useState([])
    const [active, setActive] = useState('all')
    const [searchField, setSearchField] = useState(null)
    const context = useContext(DishContext)
    const [modal, setModal] = useState({
        isOpened: false
    })

    const fetch = useCallback( async type => {
        try{
            const dishes = await request(`/api/dishs/${type}`, 'GET', null)
            setDishes(dishes)
        } catch (e) {}
    }, [request])

    const find = useCallback( async () => {
        try {
            const dishs = await request('/api/dishs/search', 'POST', {searchField})
            setDishes(dishs)
        } catch (e) {}
    }, [request, searchField])

    useEffect(() => {
        fetch(active)
    }, [fetch, active])

    const changeFilterHandler = event => {
        event.preventDefault()
        const newType = event.target.dataset.type
        setActive(newType)
        fetch(newType)
    }

    const changeHandler = event => {
        setSearchField(event.target.value)
    }

    const searchHandler =  async event => {
        event.preventDefault()
        if (searchField) {
            setActive(null)
            find()
        }
    }

    const addHandler = async () => {
        try {
            const data = await request('/api/dishs/add', 'POST', {...context.dish})
            message(data.message)
            reload()
        } catch (e) {}
    }

    const reload = () => fetch(active)

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1 className="center">Информация по блюдам:</h1>
            <div className="row  tools__search">
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
                    <label htmlFor="search">Поиск по названию</label>
                </div>
                <a
                    href='/'
                    className="waves-effect btn blue  tools__item col s3"
                    onClick={(event) => {
                        event.preventDefault()
                        setModal({ isOpened: true })
                    }}
                    >Добавить блюдо</a>
            </div>
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
                    data-type="top"
                    disabled={active === 'top'}
                    onClick={changeFilterHandler}
                    >Топ 3 блюда</a>
                <a
                    href='/'
                    className="waves-effect btn amber darken-3  tools__item col s2"
                    data-type="price"
                    disabled={active === 'price'}
                    onClick={changeFilterHandler}
                    >По цене</a>
                <a
                    href='/'
                    className="waves-effect btn amber darken-3  tools__item col s2"
                    data-type="name"
                    disabled={active === 'name'}
                    onClick={changeFilterHandler}
                    >По названию</a>
                <a
                    href='/'
                    className="waves-effect btn amber darken-3  tools__item col s2"
                    data-type="weight"
                    disabled={active === 'weight'}
                    onClick={changeFilterHandler}

                    >По весу</a>
            </div>
            {!loading && <DishsList dishs={dishes} reload={reload} />}
            <DishModalAdd
                 isOpened={modal.isOpened}
                 title={modal.title}
                 onModalClose={() => setModal({isOpened: false})}
                 addDish={addHandler}
            />
        </div>
    )
}
