import React from 'react';
import Header from '../../../../components/Header';
import Steps from '../Steps';
import StepsContainer from '../StepsContainer';
import OrderInfo from '../OrderInfo';
import './styles.scss';

const Main = () => (
    <div className="main">
        <div className="wrapper header-wrapper">
            <Header />
        </div>
        <Steps />
        <div className="wrapper">
            <div className="main-content">
                <StepsContainer />
                <OrderInfo />
            </div>
        </div>
    </div>
);

export default Main;
