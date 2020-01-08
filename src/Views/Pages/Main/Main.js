import React, {Component} from 'react'
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

import Layout from '../../Containers/Layout'
import Spinner from '../../Components/Spinner'
import Header from "../../Components/Header/Header";
import PhotosListView from '../../Components/PhotosListView'

import {actionGetPhotos} from "../../../Actions";

import './index.scss'

class Main extends Component {

    state = {
        photos: [],
        currentPage: 1,
        perPageItems: 30
    }

    componentDidMount() {

        this.props.getPhotos({
            'per_page': this.state.perPageItems,
            'page': this.state.currentPage
        }, (data) => {
            if (data) {
                this.setState({
                    photos: [...data]
                })
            } else {
                console.log('Rate Limit Exceeded')
            }
        });
    }

    fetchData = () => {

        let nextPage = this.state.currentPage + 1;

        this.props.getPhotos({
            'per_page': this.state.perPageItems,
            'page': nextPage
        }, (data) => {
            if (data.length) {
                this.setState({
                    photos: [...this.state.photos, ...data],
                    currentPage: nextPage
                })
            }
        });
    }

    render() {

        return (
            <React.Fragment>
                <Header/>
                <Layout>
                    <InfiniteScroll
                        dataLength={this.state.photos.length}
                        next={this.fetchData}
                        hasMore={true}
                        loader={<Spinner/>}>
                            <PhotosListView photos={this.state.photos}/>
                    </InfiniteScroll>
                </Layout>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    photos: state.photos
})

const mapDispatchToProps = dispatch => ({

    getPhotos: (payload, handle) => {
        dispatch(
            actionGetPhotos(payload, handle)
        )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
