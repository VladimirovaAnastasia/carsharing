import React from 'react';
import {useHistory} from 'react-router-dom';
import {Header} from '../../../../components/Header';
import {Footer} from '../../../../components/Footer';
import './styles.scss';

const Intro = () => {
    const history = useHistory();

    const handleOnClick = () => {
        history.push('order');
    };
    return (
        <div className="intro">
            <Header />
            <div className="intro-main">
                <h1 className="intro__title">
                    Каршеринг <br /> <span className="intro__title--green">Need for drive</span>
                </h1>
                <p className="intro__subtitle">Поминутная аренда авто твоего города</p>
                <button className="intro__button" onClick={() => handleOnClick()}>
                    Забронировать
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Intro;
