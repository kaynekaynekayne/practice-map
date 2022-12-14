import React from 'react';
import Header from './components/Header/header';
import List from './components/List/list';
import Map from './components/Map/map';
import {CssBaseline, Grid} from '@material-ui/core';

const App = () => {
    return (
        <div>
            <CssBaseline/>
            <Header />
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <List />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map />
                </Grid>
            </Grid>
        </div>
    );
};

export default App;