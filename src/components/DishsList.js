import { useCallback } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"


export const DishsList = ({ dishs, reload }) => {
    const {request} = useHttp()
    const message = useMessage()


    const deleteDish = useCallback( async (id) => {
        try{
            const data = await request(`/api/dishs/delete${id}`, 'GET', null)
            message(data.message)
        } catch (e) {}
    }, [request, message])


    const deleteHandler = (event) => {
        event.preventDefault()

        deleteDish(event.target.id)
        reload()
    }

    if (!dishs.length) {
        return <h5 className="center">Блюд нет</h5>
    }

    return (
        <table>
            <thead>
                <tr>
                    { dishs[0].Name ? <th>Название блюда</th> : null}
                    { dishs[0].count ? <th>Количество заказанных блюд</th> : null}
                    { dishs[0].Price ? <th>Цена блюда за штуку (BYN)</th> : null}
                    { dishs[0].Weight ? <th>Вес блюда (гр\шт)</th> : null}
                    { !dishs[0].count ? <th></th> : null}
                </tr>
            </thead>

            <tbody>
                { dishs.map(dish => {
                    const name = dish.Name ? <td>{ dish.Name }</td> : null
                    const price = dish.Price ? <td>{ dish.Price }</td> : null
                    const weight = dish.Weight ? <td>{ dish.Weight }</td> : null
                    const count = dish.count ? <td>{ dish.count }</td> : null
                    const deleteBtn = !dish.count ? <td><a href='id' className="red btn" id={dish.Dish_ID} onClick={deleteHandler}>Удалить</a></td> : null
                    return (
                        <tr key={dish.Dish_ID}>
                            { name }
                            { count }
                            { price }
                            { weight }
                            { deleteBtn }
                        </tr>
                    )
                }) }
            </tbody>
        </table>
    )
}