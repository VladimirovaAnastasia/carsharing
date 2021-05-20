import React from 'react';
import './styles.scss';

import {ReactComponent as LoaderSvg} from '../../assets/images/loader.svg';

const Loader = () => {
    return (
        <div className="loader loading">
            <LoaderSvg />
        </div>
    );
};

export default Loader;
