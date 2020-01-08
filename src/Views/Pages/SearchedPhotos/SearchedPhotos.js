import React, {Component} from 'react';
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

import Layout from '../../Containers/Layout'
import Spinner from '../../Components/Spinner'
import Header from "../../Components/Header/Header";
import PhotosListView from '../../Components/PhotosListView'

import {actionGetSearchedPhotos} from "../../../Actions";

import './index.scss'

class SearchedPhotos extends Component {
    state = {
        photos: [],
        currentPage: 1,
        perPageItems: 30,
        photoIsLoading: true,
        hasData: true
    }

    componentDidMount() {

        this.props.getSearchedPhotos({
            'per_page': this.state.perPageItems,
            'page': this.state.currentPage,
            'query': this.props.match.params.query
        }, (data) => {
            if (data && data.total > 0) {
                this.setState({
                    photos: [...this.state.photos, ...data.results],
                    photoIsLoading: false
                })
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.match.params.query !== this.props.match.params.query) {
            this.setState({
                photoIsLoading: true
            })

            this.props.getSearchedPhotos({
                'per_page': this.state.perPageItems,
                'page': this.state.currentPage,
                'query': this.props.match.params.query
            }, (data) => {
                if (data && data.total > 0) {
                    this.setState({
                        photos: [...data.results],
                        photoIsLoading: false
                    })
                }
            });
        }
    }

    fetchData = () => {

        let nextPage = this.state.currentPage + 1;

        this.props.getSearchedPhotos({
            'per_page': this.state.perPageItems,
            'page': nextPage,
            'query': this.props.match.params.query
        }, (data) => {
            if (data && data.results) {
                this.setState({
                    photos: [...this.state.photos, ...data.results],
                    currentPage: nextPage
                })
            }
        });
    }

    render() {

        const searchedPhotosView = this.state.photoIsLoading
                                        ? <Spinner/>
                                        : <SearchedPhotosView photos={this.state.photos}
                                                              hasData={this.state.hasData}
                                                              fetchData={this.fetchData} />;

        return (
            <React.Fragment>
                <Header/>
                { searchedPhotosView }
            </React.Fragment>
        );
    }
}

class SearchedPhotosView extends Component {

    state = {
        photos: []
    }

    componentDidMount() {
        this.setState({
            photos: this.props.photos,
            hasData: this.props.hasData
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.photos.length !== this.props.photos.length) {
            this.setState({
                photos: [...this.props.photos]
            })
        }
    }

    render() {
        return (
            <Layout>
                <InfiniteScroll
                    dataLength={this.state.photos.length}
                    next={this.props.fetchData}
                    hasMore={
                        true
                        //!!(this.state.photos.length > 0 && this.state.hasData)
                    }
                    loader={<Spinner/>}>
                    <PhotosListView photos={this.state.photos}/>
                </InfiniteScroll>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => ({
    searchedPhotos: state.searchedPhotos
})

const mapDispatchToProps = dispatch => ({

    getSearchedPhotos: (payload, handle) => {
        dispatch(
            actionGetSearchedPhotos(payload, handle)
        )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchedPhotos);
