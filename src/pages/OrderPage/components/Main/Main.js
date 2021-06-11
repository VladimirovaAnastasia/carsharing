import React, {useState} from 'react';
import {Header} from '@/components/Header';
import {Steps} from '../Steps';
import {StepsContainer} from '../StepsContainer';
import {OrderInfo} from '../OrderInfo';
import {ReactComponent as ShoppingImg} from '@/assets/images/information.svg';
import {StatusButton} from '../StatusButton';
import './styles.scss';

const Main = () => {
    const [isHiddenOrderInfo, setHiddenOrderInfo] = useState(true);

    return (
        <div className="main">
            <div className="wrapper header-wrapper">
                <Header />
            </div>
            <Steps />
            <div className="wrapper content-wrapper">
                {isHiddenOrderInfo ? (
                    <div className="main-content">
                        <StepsContainer />
                        <OrderInfo className="hidden-desc" />
                    </div>
                ) : (
                    <OrderInfo />
                )}
                <div className="mobile-buttons">
                    {isHiddenOrderInfo && <StatusButton />}
                    <button className="mobile-buttons__item" onClick={() => setHiddenOrderInfo((prev) => !prev)}>
                        <ShoppingImg />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Main;
