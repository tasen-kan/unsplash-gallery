import React, {Component} from 'react'
import {withRouter} from "react-router";
import ScrollUpButton from 'react-scroll-up-button'

import './index.scss'

class Layout extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="page__wrapper">
                    {this.props.children}
                </div>
                <ScrollUpButton
                    ContainerClassName='arrow-top'/>
            </React.Fragment>
        );
    }
}

export default withRouter(Layout);
