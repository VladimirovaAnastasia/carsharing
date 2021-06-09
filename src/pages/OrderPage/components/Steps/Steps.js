import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';
import STEPS from './const';
import {setActiveStep} from '../../../../store/reducers/orderReducer';
import {stepsSelector, currentStepSelector, orderStatusIdSelector} from '../../../../store/selectors/orderSelector';
import classNames from 'classnames';
import './styles.scss';
import {fetchOrderById} from '../../../../store/thunks/orderThunks';

const Steps = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    const stepsInfo = useSelector(stepsSelector);
    const currentStep = useSelector(currentStepSelector);
    const handleClick = (index) => {
        (stepsInfo[index].isComplete || stepsInfo[index - 1].isComplete) && dispatch(setActiveStep(index));
    };
    const orderStatusId = useSelector(orderStatusIdSelector);

    useEffect(() => {
        !!match.params?.id && dispatch(fetchOrderById(match.params.id)) && dispatch(setActiveStep(5));
    }, [match.params?.id]);

    useEffect(() => {
        orderStatusId && history.push(`/order/${orderStatusId}`);
    }, [orderStatusId]);

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
