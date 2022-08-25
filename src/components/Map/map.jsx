import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocatioOnOutLinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';
import useStyles from './styles';

const Map = () => {
    
    const classes=useStyles();
    const isMobile=useMediaQuery('(min-width:600px)');
    
    const coordinates={lat:0, lng:0};
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key:"AIzaSyAVtmQtXM306aggCZs1LK106DuDokJkVd0"}}
                defaultCenter={{lat:0, lng:0}}
                center={{lat:0, lng:0}}
                defaultZoom={14}
                margin={[50,50,50,50]}
                // options={''}
                // onChange={''}
                // onChildClick={''}
            >dd
            </GoogleMapReact>
        </div>
    );
};

export default Map;