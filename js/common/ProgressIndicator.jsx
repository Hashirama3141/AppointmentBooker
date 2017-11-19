import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const ProgressIndicator = () => (
    <div>
        <div className="cvr-overlay">
        <div className="cvr-loader">
            <CircularProgress
            style={
                {
                    position:'fixed',
                    zIndex:1000
                }
            } size={100} thickness={8} />
        </div>
        </div>
    </div>
);

export default ProgressIndicator;