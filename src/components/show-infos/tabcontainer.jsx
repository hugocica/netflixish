import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';

class TabContainer extends Component {

    render() {
        const { children, dir } = this.props;

        return (
            <Typography className="tabs-content" component="div" dir={dir} style={{ padding: 8 * 3 }}>
                {children}
            </Typography>
        );
    }
}

export default TabContainer;
