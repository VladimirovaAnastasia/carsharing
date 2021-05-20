import React from 'react';
import STEPS from './const';
import {useSelector, useDispatch} from 'react-redux';
import {setActiveStep} from '../../../../store/reducers/orderReducer';
import {stepsSelector, currentStepSelector} from '../../../../store/selectors/orderSelector';
import classNames from 'classnames';
import './styles.scss';

const Steps = () => {
    const dispatch = useDispatch();
    const stepsInfo = useSelector(stepsSelector);
    const currentStep = useSelector(currentStepSelector);
    const handleClick = (index) => {
        (stepsInfo[index].isComplete || stepsInfo[index - 1].isComplete) && dispatch(setActiveStep(index));
    };

    return (
        <div className="steps">
            <div className="wrapper">
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
            </div>
        </div>
    );
};

export default Steps;
