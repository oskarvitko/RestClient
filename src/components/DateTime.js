
export const DateTime = ({ options }) => {
    const elems = document.querySelectorAll('select');
    window.M.FormSelect.init(elems);

    const days = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 ]
    const monts = [ 1,2,3,4,5,6,7,8,9,10,11,12 ]
    const years = [ 2021,2022,2023 ]
    const hours = [ 8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ]
    const minuts = [ 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55 ]

    return (
        <div className="datetime">
            <div className="">
                <h6>День</h6>
                <select onChange={options.changeHandler} name="day">
                    <option value="" disabled selected></option>
                    { days.map(day => {
                        return <option key={day} value={day}>{day}</option>
                    }) }
                </select>
            </div>
            <div className="">
                <h6>Месяц</h6>
                <select onChange={options.changeHandler} name="month">
                    <option value="" disabled selected></option>
                    { monts.map(month => {
                        return <option key={month} value={month}>{month}</option>
                    }) }
                </select>
            </div>
            <div className="">
                <h6>Год</h6>
                <select onChange={options.changeHandler} name="year">
                    <option value="" disabled selected></option>
                    { years.map(year => {
                        return <option key={year} value={year}>{year}</option>
                    }) }
                </select>
            </div>

            { options.withTime ?
            <div className="">
                <h6>Часы</h6>
                <select onChange={options.changeHandler} name="hour">
                    <option value="" disabled selected></option>
                    { hours.map(hour => {
                        return <option key={hour} value={hour}>{hour}</option>
                    }) }
                </select>
            </div>
            : null }
           { options.withTime ?
            <div className="">
                <h6>Минуты</h6>
                <select onChange={options.changeHandler} name="minute">
                    <option value="" disabled selected></option>
                    { minuts.map(minute => {
                        return <option key={minute} value={minute}>{minute}</option>
                    }) }
                </select>
            </div>
            : null }
            { options.confirmText ?
            <div className="">
                <a
                    href='/'
                    className="waves-effect btn green"
                    onClick={options.confirmHandler}
                    >{ options.confirmText }</a>
            </div> : null }
        </div>
    )
}