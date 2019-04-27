import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Tabs, Tab, Typography, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import PlayIcon from '../../assets/img/play-small-player-w.svg';

class EpisodesInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            episodeDescriptionShow: [
                [
                    false,
                    false,
                    false,
                    false
                ],
                [
                    false,
                    false,
                    false,
                    false
                ]
            ]
        }
    }

    componentDidMount() {
        const { episodesInfos } = this.props

        let _openState = [];

        if ( episodesInfos.length > 0 ) {
            episodesInfos.map((item, key) => {
                if ( item !== null ) {

                    if ( typeof _openState[item.SeasonNumber - 1] === typeof undefined ) {
                        _openState[item.SeasonNumber - 1] = [];
                    }

                    _openState[item.SeasonNumber - 1].push(false);
                }

                return true;
            });

            this.setState({ episodeDescriptionShow: _openState })
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    openEpisodeInfos = (_season, _episode) => {
        let _openState = this.state.episodeDescriptionShow;

        _openState.map((item, index) => {
            item.map((inner, key) => {
                if ( _season === index && _episode === key ) {

                    _openState[index][key] = !_openState[index][key];

                } else {

                    _openState[index][key] = false;

                }

                return true;
            })

            return true;
        });

        this.setState(state => ({ episodeDescriptionShow: _openState }));
    }

    renderSeasons = (_infos) => {
        let _seasons = [];

        if ( typeof _infos !== typeof undefined ) {

            return _infos.map((item, key) => {
                if ( _seasons !== null && item !== null && !_seasons.includes(item.SeasonNumber) ) {

                    _seasons.push(item.SeasonNumber);

                    return <Tab key={`season-${key}`} className="tab-item" label={`T${item.SeasonNumber}`} onClick={this.openEpisodeInfos} />

                }
            });

        }
    }

    // function responsible for rendering each episode, with the number, title, duration and play button
    // when clicked, it opens the episode synopsis along with the thumbnail preview of the episode
    renderEpisodes = (_infos) => {
        let _seasons = [];

        if ( typeof _infos !== typeof undefined ) {

            // mapping the _infos of episode array to separate by season
            _infos.map((item, key) => {
                if ( item !== null ) {

                    if ( typeof _seasons[item.SeasonNumber - 1] === typeof undefined ) {
                        _seasons[item.SeasonNumber - 1] = [];
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

            // here we render the listing, with each episode in the right season they are
            return _seasons.map((_episodes, index) => {
                return <List
                        component="nav"
                        key={`list-season-${index}`}
                        className="episode-list-wrapper"
                        >
                            {
                                _episodes.map((_episode, key) => {
                                    // console.log(this.state.episodeDescriptionShow);
                                    return <div key={`season-${index}-episode-${key}`}>
                                            <ListItem className="episode-list" button onClick={ () => { this.openEpisodeInfos(index, key) } } >
                                                <ListItemText className="episode-list-item" inset primary={
                                                    <div className="episode-header">
                                                        <Typography className="tabs-content-typo">{_episode.number} {_episode.title}</Typography>
                                                        <span className="episode-duration">{_episode.duration}m</span>
                                                        <img src={PlayIcon} alt="" className="play-btn"/>
                                                    </div>
                                                } />
                                            </ListItem>
                                            <Collapse in={this.state.episodeDescriptionShow[index][key]} className="episode-preview" timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <ListItem className="episode-list" button>
                                                        <ListItemText className="episode-list-item collapsed" inset primary={
                                                            <div className="episode-content">
                                                                <img src={_episode.image} alt="" className="episode-preview-image"/>
                                                                <Typography className="tabs-content-typo">{_episode.synopsis}</Typography>
                                                            </div>
                                                        } />
                                                    </ListItem>
                                                </List>
                                            </Collapse>
                                        </div>
                                })
                            }
                        </List>
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
                                backgroundColor: "#4B9166",
                                width: 70
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
