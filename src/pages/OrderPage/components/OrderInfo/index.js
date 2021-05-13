import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import buttons from './const';
import {
    currentStepSelector,
    cityNameSelector,
    pointNameSelector,
    stepsSelector,
} from '../../../../store/selectors/orderSelector';
import {setActiveStep} from '../../../../store/reducers/orderReducer';

import classNames from 'classnames';
import './styles.scss';

const OrderInfo = () => {
    const dispatch = useDispatch();

    const currentStep = useSelector(currentStepSelector);
    const cityName = useSelector(cityNameSelector);
    const pointName = useSelector(pointNameSelector);
    const steps = useSelector(stepsSelector);

    let [isActiveButton, setActiveButton] = useState(false);

    useEffect(() => {
        if (steps[currentStep].isComplete) {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    }, [steps, currentStep]);

    const handleClick = () => {
        steps[currentStep].isComplete && dispatch(setActiveStep(currentStep + 1));
    };

    return (
        <div className="order-info">
            <h3 className="order-info__title">Ваш заказ</h3>
            <div className="order-info__points">
                <div className="order-info__point point">
                    <p className="point__key">Пункт выдачи</p>
                    <span className="point__dots"></span>
                    <p className="point__value">
                        {cityName && pointName ? cityName + ', ' + pointName : 'Выберите пункт'}
                    </p>
                </div>
            </div>
            <div className="order-info__result">
                <span>Цена:</span>16 000 р.
            </div>
            <button
                onClick={handleClick}
                className={classNames('order-info__button', {['order-info__button--active']: isActiveButton})}
            >
                {buttons[currentStep].title}
            </button>
        </div>
    );
};

export default OrderInfo;
