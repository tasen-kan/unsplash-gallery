import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './Reducers'

import Main from'./Views/Pages/Main'
import SearchedPhotos from'./Views/Pages/SearchedPhotos'
import SinglePhoto from './Views/Pages/SinglePhoto'
import LikedPhotos from './Views/Pages/LikedPhotos'
import NotFound from './Views/Pages/NotFound'
import './Views/GlobalStyles/index.scss'


class App extends Component{

    composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    store = createStore(
        reducer,
        this.composeEnhancers(applyMiddleware(thunk))
    );

    render() {

        return (
            <Provider store={this.store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render = { props => <Main {...props}/> }/>
                        <Route exact path="/favourite" render = { props => <LikedPhotos {...props}/> }/>
                        <Route exact path="/searched/:query" render = { props => <SearchedPhotos {...props}/> }/>
                        <Route exact path="/search/:id" render = { props => <SinglePhoto {...props}/> }/>
                        <Route exact path="/likes" render = { props => <LikedPhotos {...props}/> }/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
