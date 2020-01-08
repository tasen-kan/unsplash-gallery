import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom"
import {connect} from 'react-redux'

import {actionAddToHistory} from "../../../Actions";

import {ReactComponent as LogoIcon} from '../../../assets/icons/logo-unsplash.svg'
import {ReactComponent as SearchIcon} from '../../../assets/icons/search.svg'
import {ReactComponent as FavoriteIcon} from '../../../assets/icons/favorite.svg'
import {ReactComponent as HistoryIcon} from '../../../assets/icons/history.svg'
import {ReactComponent as LineIcon} from '../../../assets/icons/line.svg'

import './index.scss'

class Header extends Component {

    state = {
        searchShow: false,
        historySearchShow: false,
        currentPage: 1,
        perPageItems: 30
    }

    onSearchShow = () => {
        this.setState({
            searchShow: !this.state.searchShow,
            historySearchShow: false
        })
    }

    onHistoryShow = () => {
        this.setState({
            searchShow: false,
            historySearchShow: !this.state.historySearchShow
        })
    }

    render() {
        return (

            <div className="top-menu">
                <TopMenu
                    onSearchShow={this.onSearchShow}
                    onHistoryShow={this.onHistoryShow}/>
                <SearchForm
                    searchShow={this.state.searchShow}
                    history={this.props.history}
                    addToHistory={this.props.addToHistory}
                    historySearch={this.props.historySearch}/>
                <HistorySearch
                    historySearchShow={this.state.historySearchShow}
                    historySearch={this.props.historySearch}/>
            </div>
        );
    }
}

class TopMenu extends Component {

    render() {
        return (
            <div className="top-menu__inner_wrapper">
                <div className="logo">
                    <Link to="/">
                        <div className="icon__wrapper">
                            <LogoIcon/>
                        </div>
                        <div className="link__text">
                            ImageStock
                        </div>
                    </Link>
                </div>
                <div className="links">
                    <Link to={'#'} onClick={this.props.onSearchShow}>
                        <div className="icon__wrapper">
                            <SearchIcon/>
                        </div>
                        <div className="link__text">
                            Поиск
                        </div>
                    </Link>
                    <Link to="/likes">
                        <div className="icon__wrapper">
                            <FavoriteIcon/>
                        </div>
                        <div className="link__text">
                            Избранное
                        </div>
                    </Link>
                    <Link to="#"  onClick={this.props.onHistoryShow}>
                        <div className="icon__wrapper">
                            <HistoryIcon/>
                        </div>
                        <div className="link__text">
                            История поиска
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

class SearchForm extends Component {

    state = {
        query: ''
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.history.push(`/searched/${this.state.query}`);

        if (!this.props.historySearch) {
            this.props.addToHistory({ query: [this.state.query] } )
        } else {
            this.props.addToHistory({ query: [...this.props.historySearch, this.state.query] } )
        }
    }

    onInputQuery = e => {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        return (
            <div className={"search__from" + (this.props.searchShow ? ' show' : '')}>
                <form className="form" onSubmit={ e => this.handleSubmit(e)}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Поиск"
                        className="search-input"
                        autoComplete="off"
                        onInput={ e => this.onInputQuery(e) }/>
                </form>
                <div className="line">
                    <LineIcon/>
                </div>
                <div className="tags">
                    <ul>
                        <li>
                            <Link to="/searched/wallpapers">
                                Wallpapers
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/textures-patterns">
                                Textures &amp; Patterns
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/nature">
                                Nature
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/current-events">
                                Current Events
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/architecture">
                                Architecture
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/business-work">
                                Business &amp; Work
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/film">
                                Film
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/animals">
                                Animals
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/travel">
                                Travel
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/fashion">
                                Fashion
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/food-drink">
                                Food &amp; Drink
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/spirituality">
                                Spirituality
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/experimental">
                                Experimental
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/people">
                                People
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/health">
                                Health
                            </Link>
                        </li>
                        <li>
                            <Link to="/searched/arts-culture">
                                Arts &amp; Culture
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

class HistorySearch extends Component {

    render() {

        return (
            <div className={"history-search" + (this.props.historySearchShow ? ' show' : '')}>
                <div className="history__title">
                    Ваши запросы
                </div>
                <div className="tags">
                    <ul>
                        {
                            this.props.historySearch && this.props.historySearch.map( (item, id) => (
                                <li key={id}>
                                    <Link to={`/searched/${item}`}>
                                        {item}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    historySearch: state.history
})

const mapDispatchToProps = dispatch => ({

    addToHistory: (query) => {
        dispatch(actionAddToHistory(query))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
