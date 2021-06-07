import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {StartPage} from './pages/StartPage';
import {OrderPage} from './pages/OrderPage';

function App() {
    return (
        <Switch>
            <Route path="/404" render={() => <h1>404 Not Found</h1>} />
            <Route exact path="/carsharing">
                <Redirect to="/carsharing/start" />
            </Route>
            <Route path="/carsharing/start" component={StartPage} />
            <Route path="/carsharing/order" component={OrderPage} />
            <Route path="/carsharing/order/:id" component={OrderPage} />
            <Route render={() => <Redirect to="/404" />} />
        </Switch>
    );
}

export default App;
