import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Autocomplete from '../Autocomplete';
import Map from '../YandexMap';
import {
    setCityId,
    setCityName,
    setPointName,
    setCity,
    setPoint,
    setCompleteStatus,
} from '../../../../store/reducers/orderReducer';
import {fetchCities, fetchCityPoints} from '../../../../store/thunks/locationThunk';
import {citiesSelector, pointsSelector} from '../../../../store/selectors/locationSelector';
import './styles.scss';
import {citySelector, pointSelector} from '../../../../store/selectors/orderSelector';

const createOptions = (mas, key_1, key_2) => {
    return mas.map((item) => createOption(item, key_1, key_2));
};
const createOption = (item, key_1, key_2) => {
    return {
        value: item[key_1],
        label: item[key_2],
    };
};

const Location = () => {
    const dispatch = useDispatch();

    let cities = useSelector(citiesSelector);
    let points = useSelector(pointsSelector);
    let city = useSelector(citySelector);
    let point = useSelector(pointSelector);

    let [cityOptions, setCityOptions] = useState(null);
    let [pointOptions, setPointOptions] = useState(null);
    let [currentCity, setCurrentCity] = useState(city);
    let [currentPoint, setCurrentPoint] = useState(point);

    useEffect(() => {
        dispatch(fetchCities());
    }, []);

    useEffect(() => {
        cities && setCityOptions(createOptions(cities, 'id', 'name'));
    }, [cities]);
    useEffect(() => {
        points && setPointOptions(createOptions(points, 'id', 'address'));
    }, [points]);

    useEffect(() => {
        let isComplete = !!(currentCity && currentPoint);
        isComplete && dispatch(setCompleteStatus({id: 0, status: isComplete}));
    }, [currentCity, currentPoint]);

    const handleCityClick = (city) => {
        setCurrentCity(city);
        dispatch(setCity(city));
        dispatch(setCityId(city && city.value));
        dispatch(setCityName(city && city.label));
        city && dispatch(fetchCityPoints(city.value));
    };

    const handlePointClick = (point) => {
        setCurrentPoint(point);
        dispatch(setPoint(point));
        dispatch(setPointName(point && point.label));
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
