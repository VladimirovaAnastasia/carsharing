import React, {useEffect} from 'react';
import classNames from 'classnames';
import './styles.scss';

const RadioButtons = ({
    name,
    radioOptions,
    activeOption,
    onHandleChange,
    value,
    isHorizontal,
    defaultOption = null,
}) => {
    const handleChange = (value) => {
        onHandleChange(value);
    };

    return (
        <div className="radio" style={{flexDirection: isHorizontal ? 'row' : 'column'}}>
            {defaultOption && (
                <div
                    className={classNames('radio-option', {
                        ['radio-option--active']: !activeOption || activeOption === defaultOption[value],
                    })}
                    key={defaultOption.id}
                    onClick={() => handleChange(defaultOption[value])}
                >
                    <input
                        type="radio"
                        name={name}
                        value={defaultOption[value]}
                        defaultChecked={!activeOption || activeOption === defaultOption[value]}
                    />
                    <label>{defaultOption[value]}</label>
                </div>
            )}
            {radioOptions &&
                radioOptions.map((option) => (
                    <div
                        className={classNames('radio-option', {
                            ['radio-option--active']: activeOption === option[value],
                        })}
                        key={option.id}
                        onClick={() => handleChange(option[value])}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option[value]}
                            defaultChecked={activeOption === option[value]}
                        />
                        <label>{option[value]}</label>
                    </div>
                ))}
        </div>
    );
};

export default RadioButtons;
