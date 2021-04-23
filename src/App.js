import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import StartPage from './pages/StartPage';
import './assets/fonts/Roboto-Regular.ttf';

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/carsharing">
                    <Redirect to="/carsharing/start" />
                </Route>
                <Route exact path="/carsharing/start" component={StartPage} />
                <Route render={() => <h2>Page not found</h2>} />
            </Switch>
        </>
    );
}

export default App;
