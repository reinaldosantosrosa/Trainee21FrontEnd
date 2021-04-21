import React from 'react'
import { Switch, Route} from 'react-router-dom'

import Home from './pages/Home'
import Pais from './pages/Pais'



export default () => {
    return (
        <Switch>
              <Route exact path='/'>
                  <Home />
              </Route>
              
              <Route exact path='/pais/:params'>
                  <Pais />
              </Route>

        </Switch>
    )
}