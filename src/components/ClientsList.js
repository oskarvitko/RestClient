

export const ClientsList = ({ clients }) => {
    if (!clients.length) {
        return <h5 className="center">Клиентов нет</h5>
    }

    return (
        <table className=" centered">
            <thead>
                <tr>
                    <th>Номер клиента</th>
                    <th>ФИО клиента</th>
                    <th>Количетсов людей</th>
                    <th>Номер телефона</th>
                </tr>
            </thead>

            <tbody>
                { clients.map(client => {
                    return (
                        <tr key={client.Client_ID}>
                            <td>{ client.Client_ID }</td>
                            <td>{ client.FIO }</td>
                            <td>{ client.Person_count }</td>
                            <td>{ client.Phone }</td>
                        </tr>
                    )
                }) }
            </tbody>
        </table>
    )
}