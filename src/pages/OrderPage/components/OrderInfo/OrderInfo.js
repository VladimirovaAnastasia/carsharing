import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {orderSelector} from '../../../../store/selectors/orderSelector';
import usePriceCalculator from '../../../../hooks/usePriceCalculator';
import {ratesSelector} from '../../../../store/selectors/rateSelector';
import {StatusButton} from '../StatusButton';
import classNames from 'classnames';
import './styles.scss';

const OrderInfo = ({className = null}) => {
    const {calculatePrice} = usePriceCalculator();

    const order = useSelector(orderSelector);
    const rates = useSelector(ratesSelector);
    const rate = rates?.find((item) => order.rate?.includes(item.rateTypeId.name));
    const {
        cityName,
        pointName,
        car,
        colour,
        duration,
        dateFrom,
        dateTo,
        rateId,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
        price,
    } = order;

    useEffect(() => {
        calculatePrice();
    }, [dateFrom, dateTo, rateId, isFullTank, isNeedChildChair, isRightWheel]);

    return (
        <div className={classNames('order-info', `${className}`)}>
            <h3 className="order-info__title">Ваш заказ</h3>
            <div className="order-info__points">
                <div className="order-info__point point">
                    <div className="point__key">Пункт выдачи</div>
                    <div className="point__dots"></div>
                    <div className="point__value">
                        <span>{cityName ? cityName + ',' : 'Выберите город'}</span>
                        <span>{pointName ? pointName : 'Выберите пункт'}</span>
                    </div>
                </div>
                {car && (
                    <div className="order-info__point point">
                        <div className="point__key">Модель</div>
                        <div className="point__dots"></div>
                        <div className="point__value">{car.name}</div>
                    </div>
                )}
                {colour && (
                    <div className="order-info__point point">
                        <div className="point__key">Цвет</div>
                        <div className="point__dots"></div>
                        <div className="point__value">{colour}</div>
                    </div>
                )}
                {duration && (
                    <div className="order-info__point point">
                        <div className="point__key">Длительность аренды</div>
                        <div className="point__dots"></div>
                        <div className="point__value">{duration}</div>
                    </div>
                )}
                {rate && (
                    <div className="order-info__point point">
                        <div className="point__key">Тариф</div>
                        <div className="point__dots"></div>
                        <div className="point__value">{rate.rateTypeId.name}</div>
                    </div>
                )}
                {isFullTank && (
                    <div className="order-info__point point">
                        <div className="point__key">Полный бак</div>
                        <div className="point__dots"></div>
                        <div className="point__value">Да</div>
                    </div>
                )}
                {isNeedChildChair && (
                    <div className="order-info__point point">
                        <div className="point__key">Детское кресло</div>
                        <div className="point__dots"></div>
                        <div className="point__value">Да</div>
                    </div>
                )}
                {isRightWheel && (
                    <div className="order-info__point point">
                        <div className="point__key">Правый руль</div>
                        <div className="point__dots"></div>
                        <div className="point__value">Да</div>
                    </div>
                )}
            </div>
            {!!price && (
                <div className="order-info__result">
                    <span>Цена: </span>
                    {price + '₽'}
                </div>
            )}
            <StatusButton />
        </div>
    );
};

export default OrderInfo;
