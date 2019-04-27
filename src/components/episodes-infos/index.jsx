import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ListIcon from '../../assets/img/add-gray-s.svg';

class EpisodesInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    renderSeasons = (_infos) => {
        let _seasons = new Array();

        if ( typeof _infos !== typeof undefined ) {

            return _infos.map((item, key) => {
                if ( _seasons !== null && item !== null && !_seasons.includes(item.SeasonNumber) ) {

                    _seasons.push(item.SeasonNumber);

                    return <Tab key={`season-${key}`} className="tab-item" label={`T${item.SeasonNumber}`} />

                }
            });

        }
    }

    renderEpisodes = (_infos) => {
        let _seasons = new Array();

        if ( typeof _infos !== typeof undefined ) {

            _infos.map((item, key) => {
                if ( item !== null ) {

                    if ( typeof _seasons[item.SeasonNumber - 1] === typeof undefined ) {
                        _seasons[item.SeasonNumber - 1] = new Array();
                    }

                    _seasons[item.SeasonNumber - 1].push({
                        title: item.Title,
                        number: item.EpisodeNumber,
                        duration: item.Duration,
                        image: item.Image,
                        synopsis: item.Synopsis
                    })
                }
            });


            return _seasons.map((_episodes, index) => {
                return <div key={`list-season-${index}`}>
                    {
                        _episodes.map((_episode, key) => {
                            console.log(_episode);
                            return <div key={`season-${index}-episode-${key}`}>{_episode.title}</div>
                        })
                    }
                </div>
            })

        }


    }

    render() {
        const { episodesInfos } = this.props

        return(
            <div className="episodes-wrapper">
                <AppBar className="episodes-seasons tabs-actions" position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#4B9166"
                            }
                        }}
                        textColor="primary"
                        className="tabs-wrapper"
                        >
                        { this.renderSeasons(episodesInfos) }
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    axis='x'
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                    className="episodes-list"
                    >
                    { this.renderEpisodes(episodesInfos) }
                </SwipeableViews>
            </div>
        );

    }
}

export default EpisodesInfo;
