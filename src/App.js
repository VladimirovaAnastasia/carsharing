import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {StartPage} from './pages/StartPage';
import {OrderPage} from './pages/OrderPage';

function App() {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/start" />
            </Route>
            <Route path="/start" component={StartPage} />
            <Route path="/order" component={OrderPage} />
            <Route path="/order/:id" component={OrderPage} />
        </Switch>
    );
}

export default App;
