import React from 'react';
import Menu from '../../components/Menu';
import {Carousel} from './components/Carousel';
import Intro from './components/Intro';
import './styles.scss';

const StartPage = () => {
    return (
        <div className="container">
            <Menu />
            <Intro />
            <Carousel />
        </div>
    );
};

export default StartPage;
