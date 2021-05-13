import { useCallback } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"


export const TablesList = ({ tables, reload }) => {
    const {request} = useHttp()
    const message = useMessage()


    const deleteTable = useCallback( async (id) => {
        try{
            const data = await request(`/api/tables/delete${id}`, 'GET', null)
            message(data.message)
        } catch (e) {}
    }, [request, message])


    const deleteHandler = (event) => {
        event.preventDefault()
        if (event.target.dataset.free === '0') {
            return alert("Невозможно удалить занятый столик")
        }

        deleteTable(event.target.id)
        reload()
    }

    if (!tables.length) {
        return <h5 className="center">Столов нет</h5>
    }

    return (
        <table className=" centered">
            <thead>
                <tr>
                    <th>Номер стола</th>
                    <th>Вместимость</th>
                    <th>Расположение</th>
                    <th>Свободен</th>
                    <th>Номер брони</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                { tables.map(table => {
                    return (
                        <tr key={table.Table_ID}>
                            <td>{ table.Table_ID }</td>
                            <td>{ table.Capacity }</td>
                            <td>{ table.Location }</td>
                            <td>{ `${!table.Is_Free ? 'Занят' : 'Свободен'}` }</td>
                            <td>{ `${!table.Reservation_ID ? 'Нет' : table.Reservation_ID}` }</td>
                            <td><a href='id' className="red btn" id={table.Table_ID} data-free={table.Is_Free} onClick={deleteHandler}>Удалить</a></td>
                        </tr>
                    )
                }) }
            </tbody>
        </table>
    )
}