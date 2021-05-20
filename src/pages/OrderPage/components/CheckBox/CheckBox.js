import React from 'react';
import classNames from 'classnames';
import './styles.scss';

const CheckBox = ({name, checkboxOptions, setActiveOption}) => {
    const handleChange = (event, val) => {
        setActiveOption(event.target.value, !val);
    };

    return (
        <div className="checkbox">
            {checkboxOptions &&
                checkboxOptions.map((option) => (
                    <div
                        className={classNames('checkbox-option', {
                            ['checkbox-option--active']: option.isChecked,
                        })}
                        key={option.id}
                    >
                        <input
                            type="checkbox"
                            name={name}
                            value={option.id}
                            checked={option.isChecked}
                            onChange={(event) => handleChange(event, option.isChecked)}
                        />
                        <label>{option.name + option.price + 'р'}</label>
                    </div>
                ))}
        </div>
    );
};

export default CheckBox;
