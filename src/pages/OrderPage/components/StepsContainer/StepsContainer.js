import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Location} from '../Location';
import {Model} from '../Model';
import {Extra} from '../Extra';
import {currentStepSelector} from '../../../../store/selectors/orderSelector';
import {Result} from '../Result';
import './styles.scss';

const StepsContainer = () => {
    const currentStep = useSelector(currentStepSelector);
    let currentComponent = useMemo(() => {
        switch (currentStep) {
            case 0:
                return <Location />;
            case 1:
                return <Model />;
            case 2:
                return <Extra />;
            case 3:
                return <Result />;
            case 4:
                return <Result />;
            case 5:
                return <Result />;
            default:
                return null;
        }
    }, [currentStep]);

    return <div className="step-content">{currentComponent}</div>;
};

export default StepsContainer;
