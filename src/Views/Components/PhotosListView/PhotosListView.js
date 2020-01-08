import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {ReactComponent as GridBlockIcon} from '../../../assets/icons/grid-block.svg'
import {ReactComponent as GridBlockTile} from '../../../assets/icons/grid-tile.svg'

import {ReactComponent as FavoriteIcon} from "../../../assets/icons/favorite.svg";
import {ReactComponent as ZoomIcon} from "../../../assets/icons/zoom.svg";
import {ReactComponent as DownloadIcon} from "../../../assets/icons/download.svg";
import './index.scss'

import {actionLikePhoto, actionUnlikePhoto} from "../../../Actions";


class PhotosListView extends Component {

    state = {
        photos: [],
        selectedGridType: 'tile'
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.photos) {
            this.setState({
                photos: [...nextProps.photos]
            })
        }
    }

    onSelectedGridType = gridType => {
        switch (gridType) {
            case 'block':
                this.setState({
                    selectedGridType: 'block'
                });
                break;
            case 'tile':
                this.setState({
                    selectedGridType: 'tile'
                });
                break;
            default:
                this.setState({
                    selectedGridType: 'tile'
                });
                break;
        }
    }

    renderGridBlock = () => (
        <div className="photos">
            <div className="block-type">
                {
                    this.state.photos.map((item, id) =>
                        (
                            <Photo
                                data={item}
                                history={this.props.history}
                                likePhoto={this.props.likePhoto}
                                unlikePhoto={this.props.unLikePhoto}
                                key={id}/>
                        )
                    )
                }
            </div>
        </div>
    )

    renderGridTile = () => {
        const column1 = this.state.photos.filter( (_,i) => i % 3 === 0 );
        const column2 = this.state.photos.filter( (_,i) => i % 3 === 1 );
        const column3 = this.state.photos.filter( (_,i) => i % 3 === 2 );

        return (
            <div className="photos">
                <div className="tile-type">
                    <div className="column">
                        {
                            column1.map((item, id) =>
                                (
                                    <Photo
                                        data={item}
                                        history={this.props.history}
                                        likePhoto={this.props.likePhoto}
                                        unlikePhoto={this.props.unLikePhoto}
                                        key={id}/>
                                )
                            )
                        }
                    </div>
                    <div className="column">
                        {
                            column2.map((item, id) =>
                                (
                                    <Photo
                                        data={item}
                                        history={this.props.history}
                                        likePhoto={this.props.likePhoto}
                                        unlikePhoto={this.props.unLikePhoto}
                                        key={id}/>
                                )
                            )
                        }
                    </div>
                    <div className="column">
                        {
                            column3.map((item, id) =>
                                (
                                    <Photo
                                        data={item}
                                        history={this.props.history}
                                        likePhoto={this.props.likePhoto}
                                        unlikePhoto={this.props.unLikePhoto}
                                        key={id}/>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    render() {

        const gridView = this.state.selectedGridType === 'block' ? this.renderGridBlock() : null;
        const tileView = this.state.selectedGridType === 'tile' ? this.renderGridTile() : null;

        return (
            <React.Fragment>
                <div className="grid-type">
                    <div className={"grid-type__icon" + (this.state.selectedGridType==='block' ? ' active' : '')}
                         onClick={ () => this.onSelectedGridType('block') }>
                        <GridBlockIcon/>
                    </div>
                    <div className={"grid-type__icon"  + (this.state.selectedGridType==='tile' ? ' active' : '') }
                         onClick={ () => this.onSelectedGridType('tile') }>
                        <GridBlockTile/>
                    </div>
                </div>
                { gridView }
                { tileView }
            </React.Fragment>
        );
    }
}

class Photo extends Component {

    state = {
        liked: false
    }

    componentDidMount() {

        if (this.props.data.liked_by_user) {
            this.setState({
                liked: true
            })
        }
    }

    handleDownloadLink = (e) => {
        e.stopPropagation();
    }

    handleZoom = (e) => {
        e.stopPropagation();
    }

    handlePhotoLink = id => {
        this.props.history.push(`/search/${id}`)
    }

    handleLikeOrUnlike = e => {
        e.stopPropagation();

        if (this.state.liked) {
            this.props.unlikePhoto({
                id: this.props.data.id
            })
            this.setState({
                liked: false
            })
        } else {
            this.props.likePhoto({
                id: this.props.data.id
            })
            this.setState({
                liked: true
            })
        }
    }

    render() {
        const item = this.props.data;

        return (
            <div className="photo"
                 onClick={()=>this.handlePhotoLink(item.id)}>
                <img src={item.urls.small} alt=""/>
                <img src={item.urls.small}
                     className="img-height"/>
                <div className="photo__description">
                        <div className="photo__description-wrapper">
                                <div className="author">
                                    <div className="author-photo"
                                         style={{
                                             backgroundImage:`url(${item.user.profile_image.medium})`,
                                         }}>
                                    </div>
                                    <div className="author-name">
                                        {item.user.first_name}
                                    </div>
                                    <div className="author-nickname">
                                        {`@${item.user.username}`}
                                    </div>
                                </div>
                            <div className="photo-actions">
                                <div className={"like" + (this.state.liked ? ' liked' : '')}
                                     onClick={ (e) => this.handleLikeOrUnlike(e)}>
                                    <FavoriteIcon/>
                                </div>
                                <div className="zoom" onClick={ e => this.handleZoom(e) }>
                                    <a href={item.links.download}>
                                        <ZoomIcon/>
                                    </a>
                                </div>
                                <div className="download" onClick={ e => this.handleDownloadLink(e) }>
                                    <a href={item.links.download + '?force=true'} download>
                                        <DownloadIcon/>
                                    </a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({

    likePhoto: (payload) => {
        actionLikePhoto(payload)
    },

    unLikePhoto: (payload) => {
        actionUnlikePhoto(payload)
    },
})


export default connect(mapDispatchToProps)(withRouter(PhotosListView));
