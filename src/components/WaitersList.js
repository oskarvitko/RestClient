import { useCallback } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"


export const WaitersList = ({ waiters, reload }) => {
    const {request} = useHttp()
    const message = useMessage()


    const remove = useCallback( async (id) => {
        try{
            const data = await request(`/api/waiters/delete${id}`, 'GET', null)
            message(data.message)
        } catch (e) {}
    }, [request, message])


    const deleteHandler = (event) => {
        event.preventDefault()

        remove(event.target.id)
        reload()
    }

    if (!waiters.length) {
        return <h5 className="center">Официантов нет</h5>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Номер официанта</th>
                    <th>ФИО</th>
                    <th>Номер телефона</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                { waiters.map(waiter => {
                    return (
                        <tr key={ waiter.Waiter_ID }>
                            <td>{ waiter.Waiter_ID }</td>
                            <td>{ waiter.FIO }</td>
                            <td>{ waiter.Phone }</td>
                            <td><a href='id' className="red btn" id={waiter.Waiter_ID} onClick={deleteHandler}>Удалить</a></td>
                        </tr>
                    )
                }) }
            </tbody>
        </table>
    )
}