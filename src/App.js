import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'

import Home from './components/Home';
import Login from './components/Login';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/login' component={Login} />
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default App