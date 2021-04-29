import React, {useState} from 'react';
import classNames from 'classnames';
import './styles.scss';

const Steps = () => {
    const [isOpened, setOpened] = useState(false);
    const [isEnLang, setIsEnLang] = useState(false);

    return (
        <ul className="steps">
            <li className="steps__item">Местоположение</li>
            <li className="steps__item">Модель</li>
            <li className="steps__item">Дополнительно</li>
            <li className="steps__item">Итого</li>
        </ul>
    );
};

export default Steps;
