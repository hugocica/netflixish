import React, { Component } from 'react';
import {connect} from 'react-redux';
import {requestShows} from '../../../actions/shows';
import {requestEpisodes} from '../../../actions/episodes';
import LoadingRequisition from '../../loading';
import ShowDetails from '../../show-infos';

class HomePage extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         show
    //     }
    // }

    componentWillMount() {
        this.props.requestShows();
        this.props.requestEpisodes();
    }

    render() {
        const { episodesInfos, showInfos, fetchingShow, fetchingEpisodes } = this.props;

        if ( fetchingShow || fetchingEpisodes ) {
            return <LoadingRequisition />
        }

        let showBackground;

        if ( showInfos.length !== 0 ) {
            showBackground = showInfos.Images['Background'];
        } else {
            showBackground = '';
        }

        return(
            <div className="main" style={{ backgroundImage: `url(${showBackground})` }}>

                <div className="main-container">
                    <ShowDetails showDetails={ showInfos } />
                </div>

            </div>
        );

    }
}

const mapStateProps = (state) => {
    return {
        showInfos: state.shows.showInfos,
        episodesInfos: state.episodes.episodesInfos,
        fetchingShow: state.shows.fetchingShow,
        fetchingEpisodes: state.shows.fetchingEpisodes
    }
}


export default connect(mapStateProps, {requestShows, requestEpisodes})(HomePage);
