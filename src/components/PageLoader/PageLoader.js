import React from 'react';

import './PageLoader.css';

function PageLoader() {
    return (
        <div className="d-flex align-items-center justify-content-center p-5 loader-wrapper">
            <div className="loader"></div>
        </div>
    )
}

export default PageLoader;
