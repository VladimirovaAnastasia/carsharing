import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {orderInfoSelector, orderSelector} from '../../../../store/selectors/orderSelector';
import usePriceCalculator from '../../../../hooks/usePriceCalculator';
import {StatusButton} from '../StatusButton';
import classNames from 'classnames';
import './styles.scss';

const OrderInfo = ({className = null}) => {
    const history = useHistory();

    const {calculatePrice} = usePriceCalculator();

    const order = history.location.pathname.split('/')[2] ? useSelector(orderInfoSelector) : useSelector(orderSelector);
    const duration = useSelector(orderSelector).duration;

    useEffect(() => {
        calculatePrice();
    }, [
        order?.dateFrom,
        order?.dateTo,
        order?.rateId?.id,
        order?.isFullTank,
        order?.isNeedChildChair,
        order?.isRightWheel,
    ]);

    return (
        <div className={classNames('order-info', `${className}`)}>
            <h3 className="order-info__title">Ваш заказ</h3>
            <div className="order-info__points">
                <div className="order-info__point point">
                    <div className="point__key">Пункт выдачи</div>
                    <div className="point__dots"></div>
                    <div className="point__value">
                        <span>{order?.cityId?.name ? order.cityId.name + ',' : 'Выберите город'}</span>
                        <span>{order?.pointId?.address ? order.pointId.address : 'Выберите пункт'}</span>
                    </div>
                </div>
                {order?.carId?.name && (
                    <div className="order-info__point point">
                        <div className="point__key">Модель</div>
                        <div className="point__dots"></div>
                        <div className="point__value">{order?.carId?.name}</div>
                    </div>
                )}
                {order?.color && (
                    <div className="order-info__point point">
                        <div className="point__key">Цвет</div>
                        <div className="point__dots"></div>
                        <div className="point__value">{order.color}</div>
                    </div>
                )}
                {duration && (
                    <div className="order-info__point point">
                        <div className="point__key">Длительность аренды</div>
                        <div className="point__dots"></div>
                        <div className="point__value">{duration}</div>
                    </div>
                )}
                {(order?.rateId?.name || order?.rateId?.rateTypeId?.name) && (
                    <div className="order-info__point point">
                        <div className="point__key">Тариф</div>
                        <div className="point__dots"></div>
                        <div className="point__value">{order.rateId.name || order?.rateId?.rateTypeId?.name}</div>
                    </div>
                )}
                {order?.isFullTank && (
                    <div className="order-info__point point">
                        <div className="point__key">Полный бак</div>
                        <div className="point__dots"></div>
                        <div className="point__value">Да</div>
                    </div>
                )}
                {order?.isNeedChildChair && (
                    <div className="order-info__point point">
                        <div className="point__key">Детское кресло</div>
                        <div className="point__dots"></div>
                        <div className="point__value">Да</div>
                    </div>
                )}
                {order?.isRightWheel && (
                    <div className="order-info__point point">
                        <div className="point__key">Правый руль</div>
                        <div className="point__dots"></div>
                        <div className="point__value">Да</div>
                    </div>
                )}
            </div>
            {!!order?.price && (
                <div className="order-info__result">
                    <span>Цена: </span>
                    {order?.price + '₽'}
                </div>
            )}
            <StatusButton />
        </div>
    );
};

export default OrderInfo;
