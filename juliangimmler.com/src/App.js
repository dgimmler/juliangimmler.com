// libs
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './pages/main/Main';
import SideHeader from './containers/side-header/side_header';
import './App.css';

const App = ({ store }) => (
    <Provider store={ store }>
        <BrowserRouter>
            <div className="App">
                <SideHeader />
                <Switch>
                    <Route exact path="/" component={ Main } />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
);

App.propTypes = {
    store: PropTypes.object.isRequired
}

export default App;
