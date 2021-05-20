import React from 'react';
import {useSelector} from 'react-redux';
import {cityNameSelector} from '../../store/selectors/orderSelector';
import './styles.scss';

const Header = () => {
    let cityName = useSelector(cityNameSelector);

    return (
        <div className="header">
            <h2 className="header__logo">Need for drive</h2>
            {cityName && <p className="header__city">{cityName}</p>}
        </div>
    );
};

export default Header;
