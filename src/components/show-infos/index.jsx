import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ListIcon from '../../assets/img/add-gray-s.svg';
import GoodAvaliarIcon from '../../assets/img/happy-gray-w.svg';
import NeutroAvaliarIcon from '../../assets/img/neutral-gray-w.svg';
import BadAvaliarIcon from '../../assets/img/sad-gray-w.svg';
import GravarIcon from '../../assets/img/rec-gray-s.svg';
import ShareIcon from '../../assets/img/share-gray-s.svg';
import TeleCineLogo from '../../assets/img/logo-telecine.svg';

class ShowDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            rating: 'neutral'
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    listCast = (cast) => {
        if ( typeof cast !== typeof undefined ) {

            return cast.map((item, key) => {
                return <Typography key={`cast-${key}`} className="tabs-content-typo cast">{item.Name}</Typography>
            });
        }
    }

    renderGenre = (_genre) => {
        if ( typeof _genre !== typeof undefined ) {
            return _genre.map((item, key) => {
                return <span key={`genre-${key}`} className="genre meta-info">{item.Title}</span>
            })
        }
    }

    render() {
        const { showDetails } = this.props;

        let ratingIcon;

        if ( this.state.rating === 'neutral' ) {

            ratingIcon = NeutroAvaliarIcon;

        } else if ( this.state.rating === 'good' ) {

            ratingIcon = GoodAvaliarIcon;

        } else if ( this.state.rating === 'bad' ) {

            ratingIcon = BadAvaliarIcon;

        }

        return(
            <div className="general-show-infos">
                <div className="show-infos-meta">
                    <Typography className="show-title">{showDetails.Title}</Typography>
                    <div className="meta-content">
                        { this.renderGenre(showDetails.Genres) }
                        <span className="year meta-info">{showDetails.Year}</span>
                    </div>
                </div>

                <div className="show-infos-container">
                    <AppBar className="show-infos-tab tabs-actions" position="static" color="default">
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
                            <Tab className="tab-item" label="Visão Geral" />
                            <Tab className="tab-item" label="Elenco" />
                            {/*<img id="telecine-logo" src={TeleCineLogo} alt=""/>*/}
                        </Tabs>
                    </AppBar>

                    <div className="show-infos-details">
                        <SwipeableViews
                            axis='x'
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                            className="show-infos-content"
                            >
                            <div className="tabs-content general">
                                <div className="actions">
                                    <div className="actions-item">
                                        <img src={ListIcon} alt=""/>
                                        <p>Minha Lista</p>
                                    </div>
                                    <div className="actions-item">
                                        <img src={ratingIcon} alt=""/>
                                        <p>Avaliar</p>
                                    </div>
                                    <div className="actions-item">
                                        <img src={GravarIcon} alt=""/>
                                        <p>Gravar</p>
                                    </div>
                                    <div className="actions-item">
                                        <img src={ShareIcon} alt=""/>
                                        <p>Compartilhar</p>
                                    </div>
                                </div>

                                <div className="show-infos-details-sinopse">
                                    <Typography className="section-title">Sinopse</Typography>
                                    <Typography className="tabs-content-typo">{showDetails.Synopsis}</Typography>
                                </div>
                            </div>

                            <div className="tabs-content cast-wrapper">
                                { this.listCast(showDetails.Cast) }
                            </div>
                        </SwipeableViews>
                    </div>
                </div>
            </div>
        );

    }
}

export default ShowDetails;
