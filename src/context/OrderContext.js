import {createContext} from 'react'

export const OrderContext = createContext({
    order: {
        sum: null,
        dishes: [],
        reservationId: null
    }
})