import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {orderSelector} from '../../../../store/selectors/orderSelector';
import {setCompleteStatus} from '../../../../store/reducers/orderReducer';
import './styles.scss';

const Result = () => {
    const dispatch = useDispatch();
    const order = useSelector(orderSelector);
    const {car, dateFrom, isFullTank} = order;
    const carImg = car.thumbnail?.path;

    useEffect(() => {
        dispatch(setCompleteStatus({id: 3, status: true}));
    }, []);

    const [isImgError, setIsImgError] = useState(false);
    const hangleOnLoadImgError = (event) => {
        setIsImgError(true);
    };

    return (
        <div className="result">
            <div className="result-description">
                <h3 className="result-description__model">{car.name}</h3>
                {car.number && (
                    <div className="result-description__car-number">
                        {car.number
                            .toUpperCase()
                            .replace(/([^0-9])+(\d+)+([^0-9])/g, '$1,$2,$3')
                            .replaceAll(',', ' ')}
                    </div>
                )}
                <div className="result-description__point">
                    <p className="point-title">Топливо </p>
                    <p>{isFullTank ? ' 100%' : car.tank + '%'}</p>
                </div>
                <div className="result-description__point">
                    <p className="point-title">Доступна с </p>
                    <p>{new Date(dateFrom).toLocaleString().slice(0, -3)}</p>
                </div>
            </div>
            <img
                className="result-img"
                loading="lazy"
                src={!isImgError && carImg && `https://api-factory.simbirsoft1.com${carImg}`}
                alt={car.name}
                onError={(event) => hangleOnLoadImgError(event)}
            />
        </div>
    );
};

export default Result;
