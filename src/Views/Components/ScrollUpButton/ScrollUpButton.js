import React, {Component} from 'react';

import {ReactComponent as ArrowTopIcon} from '../../../assets/icons/arrow-top.svg'

import './index.scss'

class ScrollUpButton extends Component {

    state = {
        scrolled: 0
    }

    handleScrollUp = () => {
        let scrolled = window.pageYOffset;
        if (window.pageYOffset > 0) {
            this.setState({
                scrolled: window.pageYOffset
            })
        }
        console.log(scrolled)
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="arrow-top"
                 onClick={this.handleScrollUp}>
                <ArrowTopIcon/>
            </div>
        );
    }
}

export default ScrollUpButton;
