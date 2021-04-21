import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import Header from './Components/Header'

import Routes from './Routes'

function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes/>
        </BrowserRouter>
    )

}

export default App;     