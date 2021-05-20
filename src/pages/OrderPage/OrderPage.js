import React from 'react';
import {Menu} from '../../components/Menu';
import {Main} from './components/Main';
import {Modal} from './components/Modal';
import './styles.scss';
import {useSelector} from 'react-redux';
import {currentStepSelector} from '../../store/selectors/orderSelector';

const OrderPage = () => {
    const currentStep = useSelector(currentStepSelector);

    return (
        <div className="container">
            <Menu />
            <Main />
            {currentStep === 4 && <Modal />}
        </div>
    );
};

export default OrderPage;
