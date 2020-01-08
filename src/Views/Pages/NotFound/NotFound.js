import React, {Component} from 'react'
import {Link} from "react-router-dom"
import './index.scss'

class NotFound extends Component {
    render() {
        return (
            <div className='not-found'>
                <div className="not-found__wrapper">
                    <div className="not-found__title">
                        404
                    </div>
                    <div className="not-found__text">
                        Страница не найдена
                    </div>
                    <Link to='/'>
                        На главную
                    </Link>
                </div>
            </div>
        )
    }
}

export default NotFound
