import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { DishsPage } from './pages/DishsPage'
import { AuthPage } from './pages/AuthPage'
import { ClientsPage } from './pages/ClientsPage'
import { HomePage } from './pages/HomePage'
import { ReservationsPage } from './pages/ReservationsPage'
import { TablesPage } from './pages/TablesPage'
import { WaitersPage } from './pages/WaitersPage'
import { OrdersPage } from './pages/OrdersPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <HomePage />
                </Route>
                <Route path="/tables" exact>
                    <TablesPage />
                </Route>
                <Route path="/reservations" exact>
                    <ReservationsPage />
                </Route>
                <Route path="/clients" exact>
                    <ClientsPage />
                </Route>
                <Route path="/dishs" exact>
                    <DishsPage />
                </Route>
                <Route path="/waiters" exact>
                    <WaitersPage />
                </Route>
                <Route path="/orders" exact>
                    <OrdersPage />
                </Route>
                <Redirect to="/home" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}