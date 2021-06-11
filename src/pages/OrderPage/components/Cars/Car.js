import React, {useState} from 'react';
import empty from '@/assets/images/empty.jpg';
import classNames from 'classnames';
import './styles.scss';

const Car = ({car, isActive, changeActiveCar}) => {
    const [isImgError, setIsImgError] = useState(false);

    const hangleOnLoadImgError = (event) => {
        setIsImgError(true);
    };

    const {name, priceMin, priceMax} = car;
    const img = car.thumbnail?.path;

    const handleCarClick = () => {
        changeActiveCar(car);
    };

    return (
        <div className={classNames('car', {'car--active': isActive})} onClick={handleCarClick}>
            <div className="car__info">
                <h3 className="car__model">{name}</h3>
                <p className="car__price">
                    {priceMin} - {priceMax} ₽
                </p>
            </div>
            <img
                className="car__img"
                loading="lazy"
                src={isImgError ? empty : `https://api-factory.simbirsoft1.com${img}`}
                alt={name}
                onError={(event) => hangleOnLoadImgError(event)}
            />
        </div>
    );
};

export default Car;
