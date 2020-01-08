import React, {Component} from 'react';
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

import Layout from '../../Containers/Layout'
import Spinner from '../../Components/Spinner'
import Header from "../../Components/Header/Header";
import PhotosListView from '../../Components/PhotosListView'

import {actionGetLikedPhotos} from "../../../Actions";

import './index.scss'


class LikedPhotos extends Component {
    state = {
        likedPhotos: [],
        currentPage: 1,
        perPageItems: 30,
        hasData: true
    }

    componentDidMount() {

        this.props.getLikedPhotos({
                'per_page': this.state.perPageItems,
                'page': this.state.currentPage
        }, (response) => {
            if (response.data) {
                this.setState({
                    likedPhotos: [...response.data]
                })
            } else {
                console.log('Rate Limit Exceeded')
            }
        })
    }

    fetchData = () => {

        let nextPage = this.state.currentPage + 1;

        this.props.getLikedPhotos({
            'per_page': this.state.perPageItems,
            'page': nextPage
        }, (response) => {
            console.log(response)
            if ( response.data && response.data.length) {
                this.setState({
                    likedPhotos: [...this.state.likedPhotos, ...response.data],
                    currentPage: nextPage
                })
            }
            else {
                this.setState({
                    hasData: false
                })
            }
        });
    }

    render() {

        return (
            <React.Fragment>
                <Header/>
                <div className="likes__title">
                    Избранное
                </div>
                <Layout>
                    <InfiniteScroll
                        dataLength={this.state.likedPhotos.length}
                        next={this.fetchData}
                        hasMore={
                            //true
                            !!( this.state.likedPhotos.length > this.state.perPageItems && this.state.hasData )
                        }
                        loader={<Spinner/>}>
                        <PhotosListView photos={this.state.likedPhotos}/>
                    </InfiniteScroll>
                </Layout>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    likedPhotos: state.likedPhotos
})

const mapDispatchToProps = dispatch => ({

    getLikedPhotos: (payload, handle) => {
        dispatch(
            actionGetLikedPhotos(payload, handle)
        )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LikedPhotos);
