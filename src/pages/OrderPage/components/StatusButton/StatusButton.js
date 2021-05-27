import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch, useHistory} from 'react-router-dom';
import BUTTONS from './const';
import {orderSelector} from '../../../../store/selectors/orderSelector';
import {clearOrder, setActiveStep, setOrderStatusId} from '../../../../store/reducers/orderReducer';
import classNames from 'classnames';
import './styles.scss';
import {orderStatusSelector} from '../../../../store/selectors/orderStatusSelector';
import {putOrder} from '../../../../store/thunks/orderThunks';
import {fetchOrderStatus} from '../../../../store/thunks/orderStatusThunks';

const StatusButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();

    const orderStatuses = useSelector(orderStatusSelector);
    const order = useSelector(orderSelector);
    const {currentStep, steps} = order;

    let [isActiveButton, setActiveButton] = useState(false);

    useEffect(() => {
        dispatch(fetchOrderStatus());
    }, []);

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
        if (currentStep === 3) {
            const updatedOrderStatus = orderStatuses.find((item) => item.name === 'new');
            dispatch(setOrderStatusId(updatedOrderStatus));
        }
        if (currentStep === 6) {
            const cancelledOrder = {
                ...order,
                orderStatusId: orderStatuses.find((item) => item.name === 'cancelled'),
            };
            dispatch(putOrder(cancelledOrder));
            history.replace('/carsharing/order');
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
