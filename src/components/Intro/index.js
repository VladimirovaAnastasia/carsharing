import React from 'react';
import './styles.scss';
import Header from '../Header';
import Footer from '../Footer';

const Intro = () => (
    <div className="intro">
        <Header />
        <div className="intro-main">
            <h1 className="intro__title">
                Каршеринг <br /> <span className="intro__title--green">Need for drive</span>
            </h1>
            <p className="intro__subtitle">Поминутная аренда авто твоего города</p>
            <button className="intro__button">Забронировать</button>
        </div>
        <Footer />
    </div>
);

export default Intro;
