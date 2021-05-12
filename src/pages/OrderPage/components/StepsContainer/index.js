import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import Location from '../Location';
import Model from '../Model';
import {currentStepSelector} from '../../../../store/selectors/orderSelector';

import './styles.scss';

const StepsContainer = () => {
    const currentStep = useSelector(currentStepSelector);
    let currentComponent = useMemo(() => {
        switch (currentStep) {
            case 0:
                return <Location />;
            case 1:
                return <Model />;
            default:
                return null;
        }
    }, [currentStep]);

    return <div className="step-content">{currentComponent}</div>;
};

export default StepsContainer;
