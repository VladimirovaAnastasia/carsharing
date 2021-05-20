import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Autocomplete} from '../Autocomplete';
import {Map} from '../YandexMap';
import {
    setCity,
    setPoint,
    setCompleteStatus,
    clearOrder,
    clearOrderWithoutCity,
} from '../../../../store/reducers/orderReducer';
import {fetchCities, fetchCityPoints} from '../../../../store/thunks/locationThunk';
import {citiesSelector, pointsSelector} from '../../../../store/selectors/locationSelector';
import {citySelector, pointSelector} from '../../../../store/selectors/orderSelector';
import './styles.scss';

const createOptions = (mas, key_1, key_2) => {
    return mas.map((item) => ({
        value: item[key_1],
        label: item[key_2],
    }));
};

const Location = () => {
    const dispatch = useDispatch();

    const cities = useSelector(citiesSelector);
    const points = useSelector(pointsSelector);
    const city = useSelector(citySelector);
    const point = useSelector(pointSelector);

    let [cityOptions, setCityOptions] = useState(null);
    let [pointOptions, setPointOptions] = useState(null);
    let [currentCity, setCurrentCity] = useState(city);
    let [currentPoint, setCurrentPoint] = useState(point);

    useEffect(() => {
        setCurrentCity(city);
    }, [city]);

    useEffect(() => {
        setCurrentPoint(point);
    }, [point]);

    useEffect(() => {
        dispatch(fetchCities());
    }, [city]);

    useEffect(() => {
        cities && setCityOptions(createOptions(cities, 'id', 'name'));
    }, [cities]);
    useEffect(() => {
        points && setPointOptions(createOptions(points, 'id', 'address'));
    }, [points]);

    useEffect(() => {
        let isComplete = !!(currentCity && currentPoint);
        dispatch(setCompleteStatus({id: 0, status: isComplete}));
    }, [currentCity, currentPoint]);

    const handleCityClick = (city) => {
        if (city) {
            dispatch(setCity(city));
            dispatch(fetchCityPoints(city.value));
        } else {
            dispatch(clearOrder());
        }
    };

    const handlePointClick = (point) => {
        if (point) {
            dispatch(setPoint(point));
        } else {
            dispatch(clearOrderWithoutCity());
        }
    };

    return (
        <div className="location">
            <div className="location-field">
                <p className="location-field__title">Город</p>
                {cityOptions && (
                    <Autocomplete
                        value={currentCity}
                        options={cityOptions}
                        placeholder="Начните вводить город ..."
                        handleClick={handleCityClick}
                    />
                )}
            </div>
            <div className="location-field">
                <p className="location-field__title">Пункт выдачи</p>
                {cityOptions && (
                    <Autocomplete
                        value={currentPoint}
                        options={pointOptions}
                        placeholder="Начните вводить пункт ..."
                        handleClick={handlePointClick}
                    />
                )}
            </div>
            <Map />
        </div>
    );
};

export default Location;
