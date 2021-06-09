import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import STEPS from './const';
import {clearOrder, setActiveStep} from '../../../../store/reducers/orderReducer';
import {
    stepsSelector,
    currentStepSelector,
    orderStatusIdSelector,
    orderInfoSelector,
} from '../../../../store/selectors/orderSelector';
import classNames from 'classnames';
import './styles.scss';
import {fetchOrderById} from '../../../../store/thunks/orderThunks';

const Steps = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stepsInfo = useSelector(stepsSelector);
    const currentStep = useSelector(currentStepSelector);
    const handleClick = (index) => {
        (stepsInfo[index].isComplete || stepsInfo[index - 1].isComplete) && dispatch(setActiveStep(index));
    };
    const orderStatusId = useSelector(orderStatusIdSelector);
    const order = useSelector(orderInfoSelector);

    useEffect(() => {
        const path = history.location.pathname.split('/');
        !!path[2] && dispatch(fetchOrderById(path.slice(-1)[0])) && dispatch(setActiveStep(5));
        !order && dispatch(setActiveStep(0)) && history.replace('/order');
    }, [history.location.pathname]);

    useEffect(() => {
        orderStatusId && !(order?.orderStatusId?.name === 'cancelled') && history.push(`/order/${orderStatusId}`);
        if (order?.orderStatusId?.name === 'cancelled') {
            dispatch(clearOrder());
            history.replace('/order');
            dispatch(setActiveStep(0));
        }
    }, [orderStatusId, order]);

    return (
        <div className="steps">
            <div className="wrapper">
                {orderStatusId && currentStep > 3 ? (
                    <p className="order-confirm">Заказ номер {orderStatusId}</p>
                ) : (
                    <ul className="steps-list">
                        {STEPS.map((item, index) => (
                            <li
                                key={item.name}
                                className={classNames('steps-list__item', {
                                    ['steps-list__item--available']:
                                        stepsInfo[index].isComplete || stepsInfo[index - 1]?.isComplete,
                                    ['steps-list__item--current']: currentStep === index,
                                })}
                                onClick={() => handleClick(index)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Steps;
