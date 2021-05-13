import {createContext} from 'react'

export const WaiterContext = createContext({
    waiter: {
        name: null,
        phone: null
    }
})