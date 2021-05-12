import React, {useEffect, useState} from 'react';
import steps from './const';
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
        stepsInfo[index].isComplete && dispatch(setActiveStep(index));
    };

    return (
        <div className="steps-container">
            <div className="wrapper">
                <ul className="steps">
                    {steps.map((item, index) => (
                        <li
                            key={item.name}
                            className={classNames('steps__item', {
                                ['steps__item--done']: stepsInfo[index].isComplete,
                                ['steps__item--active']: currentStep === index,
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
