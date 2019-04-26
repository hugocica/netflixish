import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TabContainer from './tabcontainer';
import ListIcon from '../../assets/img/add-gray-s.svg';
import AvaliarIcon from '../../assets/img/sad-gray-w.svg';
import GravarIcon from '../../assets/img/rec-gray-s.svg';
import ShareIcon from '../../assets/img/share-gray-s.svg';
import TeleCineLogo from '../../assets/img/logo-telecine.svg';

class ShowDetails extends Component {
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

    listCast = (cast) => {
        if ( typeof cast !== typeof undefined ) {

            return cast.map((item, key) => {
                return <Typography key={`cast-${key}`} className="tabs-content-typo">{item.Name}</Typography>
            });
        }
    }

    render() {
        const { showDetails } = this.props

        return(
            <div className="show-infos-container">
                <AppBar className="show-infos-tab" position="static" color="default">
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
                        <img id="telecine-logo" src={TeleCineLogo} alt=""/>
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
                                    <img src={AvaliarIcon} alt=""/>
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

                        <div className="tabs-content cast">
                            { this.listCast(showDetails.Cast) }
                        </div>
                    </SwipeableViews>
                </div>
            </div>
        );

    }
}

export default ShowDetails;
