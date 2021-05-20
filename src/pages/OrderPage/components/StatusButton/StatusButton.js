import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BUTTONS from './const';
import {orderSelector} from '../../../../store/selectors/orderSelector';
import {clearOrder, setActiveStep} from '../../../../store/reducers/orderReducer';
import classNames from 'classnames';
import './styles.scss';

const StatusButton = () => {
    const dispatch = useDispatch();
    const order = useSelector(orderSelector);
    const {currentStep, steps} = order;

    let [isActiveButton, setActiveButton] = useState(false);

    useEffect(() => {
        if (steps[currentStep].isComplete) {
            setActiveButton(true);
        } else {
            setActiveButton(false);
        }
    }, [steps, currentStep]);

    const handleClick = () => {
        if (currentStep === 5) {
            dispatch(setActiveStep(0));
            dispatch(clearOrder());
        }
        steps[currentStep].isComplete && dispatch(setActiveStep(currentStep + 1));
    };

    return (
        <button
            onClick={handleClick}
            className={classNames(
                'status-button',
                {['status-button--active']: isActiveButton},
                {['status-button--cancel']: currentStep === 5}
            )}
        >
            {BUTTONS[currentStep].title}
        </button>
    );
};

export default StatusButton;
