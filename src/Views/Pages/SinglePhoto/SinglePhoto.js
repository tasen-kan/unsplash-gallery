import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux"

import InfiniteScroll from 'react-infinite-scroll-component'

import Layout from '../../Containers/Layout'
import Spinner from '../../Components/Spinner'
import PhotosListView from '../../Components/PhotosListView'
import Header from '../../Components/Header'

import {ReactComponent as FavoriteIcon} from "../../../assets/icons/favorite.svg";
import {ReactComponent as DownloadIcon} from "../../../assets/icons/download.svg";

import {
    actionGetPhoto,
    actionGetRelativePhotos,
    actionLikePhoto,
    actionUnlikePhoto
} from "../../../Actions";

import './index.scss'


class SinglePhoto extends Component {

    state = {
        photos: [],
        photoData: {},
        currentPage: 1,
        perPageItems: 30,
        photoIsLoading: true
    }

    componentDidMount() {

        this.props.getPhoto({
            'id': this.props.match.params.id
        }, (data) => {
            this.setState({
                photoData: this.props.photo,
                photoIsLoading: false
            })
        })

        this.props.getRelativePhotos(
            {
                id:this.props.match.params.id,
                params: {
                     'per_page': this.state.perPageItems,
                     'page': this.state.currentPage
                }
            }, (data) => {
                if(data && data.results) {
                    this.setState({
                        photos: [...data.results]
                    })
                }
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.match.params.id !== this.props.match.params.id) {

            this.setState({
                photoIsLoading: true
            })

            this.props.getPhoto({
                'id': this.props.match.params.id
            }, (data) => {
                this.setState({
                    photoData: this.props.photo,
                    photoIsLoading: false
                })
            })

            this.props.getRelativePhotos(
                {
                    id:this.props.match.params.id,
                    params: {
                        'per_page': this.state.perPageItems,
                        'page': this.state.currentPage
                    }
                }, (data) => {
                    this.setState({
                        photos: [...data.results]
                    })
                })

            window.scrollTo(0,0);
        }
    }

    render() {

        const singlePhotoView = !this.state.photoIsLoading
                        ? <SinglePhotoView photoData={this.state.photoData}
                                           likePhoto={this.props.likePhoto}
                                           unlikePhoto={this.props.unLikePhoto}/>
                        : <Spinner/>;

        return (
            <React.Fragment>
                <Header/>
                {singlePhotoView}
                <Layout>
                    <div className="similar__photos">
                        Похожие фотографии
                    </div>
                    <InfiniteScroll
                        dataLength={this.state.photos.length}
                        next={this.fetchData}
                        hasMore={false}
                        loader={<Spinner/>}>
                        <PhotosListView photos={this.state.photos}/>
                    </InfiniteScroll>
                </Layout>
            </React.Fragment>
        );
    }
}

class SinglePhotoView extends Component {

    state = {
        liked: false
    }

    componentDidMount() {
        if (this.props.photoData.liked_by_user) {
            this.setState({
                liked: true
            })
        }
    }

    likeOrUnlike = e => {
        e.stopPropagation();

        if (this.state.liked) {
            this.props.unlikePhoto({
                id: this.props.photoData.id
            })
            this.setState({
                liked: false
            })
        } else {
            this.props.likePhoto({
                id: this.props.photoData.id
            })
            this.setState({
                liked: true
            })
        }
    }

    render() {
        const photoData = this.props.photoData;

        return (
            <div className="photo__outer-wrapper">
                <div className="photo__background"
                     style={{
                         backgroundImage: `url(${photoData.links.download})`
                     }}/>
                <div className="photo__inner-wrapper">
                    <div className="photo__top">
                        <div className="photo__user">
                            <a href={photoData.user.links.html}>
                                <div className="photo__user-left">
                                    <div className="photo__avatar">
                                        <img src={photoData.user.profile_image.medium} alt=""/>
                                    </div>
                                </div>
                                <div className="photo__user-right">
                                    <div className="photo__user-name">
                                        {photoData.user.first_name}
                                    </div>
                                    <div className="photo__user-nickname">
                                        @{photoData.user.username}
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="photo__actions">
                            <div className={"photo__like" + (this.state.liked ? ' liked' : '')}
                                 onClick={ (e) => this.likeOrUnlike(e)}>
                                <FavoriteIcon/>
                            </div>
                            <a href={photoData.links.download + '?force=true'} download className="photo__download">
                                <div>
                                    <DownloadIcon/>
                                </div>
                                <div className="photo__download-text">
                                    Downloand
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="photo__single">
                        <img src={photoData.urls.regular} alt=""/>
                    </div>
                    <div className="photo__tags">
                        <div className="tag__title">
                            Похожии теги
                        </div>
                        <div className="tags">
                            {
                                photoData.tags.map((item, id) => (
                                    <Link to={`/searched/${item.title}`} className="tag" key={id}>
                                        {item.title}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = state => ({
    relativePhotos: state.relativePhotos,
    photo: state.photo
})

const mapDisptchToProps = dispatch => ({

    getRelativePhotos: (payload, handle) => {
        dispatch(
            actionGetRelativePhotos(payload, handle)
        )
    },

    getPhoto: (payload, handle) => {
        dispatch(
            actionGetPhoto(payload, handle)
        )
    },

    likePhoto: (payload) => {
        actionLikePhoto(payload)
    },

    unLikePhoto: (payload) => {
        actionUnlikePhoto(payload)
    }
})

export default connect(mapStatetoProps, mapDisptchToProps)(withRouter(SinglePhoto));
