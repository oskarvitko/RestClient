import {createContext} from 'react'

export const DishContext = createContext({
    dish: {
        name: null,
        price: null,
        weight: null
    }
})