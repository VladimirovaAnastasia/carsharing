import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import './styles.scss';

const Autocomplete = ({value, options, placeholder, handleClick}) => {
    const colourStyles = {
        control: (styles) => ({
            ...styles,
            cursor: 'pointer',
            backgroundColor: 'white',
            border: 'none',
            borderRadius: 0,
            borderBottom: '1px solid #999999',
            width: 188,
            fontWeight: 300,
            fontSize: 14,
            minHeight: 21,
            boxShadow: 'none !important',
            ':hover': {borderColor: '#0EC261'},
            ':focus': {borderColor: '#0EC261'},
        }),
        input: (styles) => ({
            ...styles,
            fontWeight: 300,
            fontSize: 14,
            lineHeight: '16px',
            padding: 0,
            margin: 0,
        }),
        dropdownIndicator: () => ({display: 'none'}),
        indicatorSeparator: () => ({display: 'none'}),
        clearIndicator: () => ({
            display: 'flex',
            color: '#EEEEEE',
            transition: 'all 100ms',
            ':hover': {color: '#121212'},
        }),
        valueContainer: () => ({
            padding: '2px',
        }),
        menu: (styles) => ({
            ...styles,
            fontWeight: 300,
            fontSize: 14,
            lineHeight: '16px',
            padding: 0,
            margin: 0,
        }),
        option: (styles, {isDisabled, isFocused, isSelected}) => ({
            ...styles,
            backgroundColor: isDisabled
                ? 'transparent'
                : isSelected
                ? '#EEEEEE'
                : isFocused
                ? 'transparent'
                : 'transparent',
            color: '#999999',

            ':hover': {
                ...styles[':hover'],
                color: '#0EC261',
                cursor: 'pointer',
            },
            ':active': {
                ...styles[':active'],
                backgroundColor: '#EEEEEE',
                color: '#0EC261',
            },
        }),
    };

    return (
        <Select
            styles={colourStyles}
            value={value}
            options={options}
            isClearable
            isSearchable
            placeholder={placeholder}
            onChange={(el) => handleClick(el)}
            noOptionsMessage={() => 'Данные отсутствуют'}
        />
    );
};

export default Autocomplete;
