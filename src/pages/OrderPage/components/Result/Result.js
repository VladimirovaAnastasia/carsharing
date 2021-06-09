import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {orderInfoSelector, orderSelector} from '../../../../store/selectors/orderSelector';
import {setCompleteStatus} from '../../../../store/reducers/orderReducer';
import './styles.scss';
import {fetchOrderStatus} from '../../../../store/thunks/orderStatusThunks';

const Result = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const order = history.location.pathname.split('/')[2] ? useSelector(orderInfoSelector) : useSelector(orderSelector);
    const carImg = order?.car?.thumbnail?.path || order?.carId?.thumbnail?.path;

    useEffect(() => {
        dispatch(setCompleteStatus({id: 3, status: true}));
        dispatch(fetchOrderStatus());
    }, []);

    const [isImgError, setIsImgError] = useState(false);
    const hangleOnLoadImgError = (event) => {
        setIsImgError(true);
    };

    return (
        <div className="result">
            <div className="result-description">
                {order?.currentStep > 4 ||
                    (!order?.currentStep && <h2 className="result-description__title">Ваш заказ подтвержден</h2>)}
                <h3 className="result-description__model">{order?.carId?.name}</h3>
                {(order?.car?.number || order?.carId?.number) && (
                    <div className="result-description__car-number">
                        {(order?.car?.number || order?.carId?.number)
                            .toUpperCase()
                            .replace(/([^0-9])+(\d+)+([^0-9])/g, '$1,$2,$3')
                            .replaceAll(',', ' ')}
                    </div>
                )}
                {(order?.isFullTank || !!order?.car?.tank || !!order?.carId?.tank) && (
                    <div className="result-description__point">
                        <p className="point-title">Топливо </p>
                        <p>{order?.isFullTank ? ' 100%' : (order?.car?.tank || order?.carId?.tank) + '%'}</p>
                    </div>
                )}
                <div className="result-description__point">
                    <p className="point-title">Доступна с </p>
                    <p>{new Date(order?.dateFrom).toLocaleString().slice(0, -3)}</p>
                </div>
            </div>
            <img
                className="result-img"
                loading="lazy"
                src={!isImgError && carImg && `https://api-factory.simbirsoft1.com${carImg}`}
                alt={order?.carId?.name}
                onError={(event) => hangleOnLoadImgError(event)}
            />
        </div>
    );
};

export default Result;
