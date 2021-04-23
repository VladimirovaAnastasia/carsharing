import React, {useState} from 'react';
import {menuOptions} from './const';
import classNames from 'classnames';
import './styles.scss';

const Menu = () => {
    const [isOpened, setOpened] = useState(false);
    const [isEnLang, setIsEnLang] = useState(false);

    const handleClickMenuButton = () => {
        setOpened((prevState) => !prevState);
    };

    return (
        <div className="menu">
            <div className="menu__common">
                {!isOpened && <div className=" menu__button menu__button--open" onClick={handleClickMenuButton}></div>}
                <div
                    className={classNames('menu__lang', {['menu__lang--hidden']: isOpened})}
                    onClick={() => setIsEnLang((prev) => !prev)}
                >
                    {isEnLang ? 'Eng' : 'Рус'}
                </div>
            </div>
            {isOpened ? (
                <div className="menu__details">
                    <div className="menu__button menu__button--close" onClick={handleClickMenuButton}></div>
                    <ul className="menu-options">
                        {menuOptions.map((item) => {
                            return (
                                <a href={item.hash} key={item.hash}>
                                    <li className="menu-options__item">{item.title}</li>
                                </a>
                            );
                        })}
                    </ul>
                    <ul className="menu-social">
                        <li className="menu-social__item">
                            <a href="#"></a>
                        </li>
                        <li className="menu-social__item">
                            <a href="#"></a>
                        </li>
                        <li className="menu-social__item">
                            <a href="#"></a>
                        </li>
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default Menu;
