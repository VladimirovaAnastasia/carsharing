import React, {useEffect, useState} from 'react';
import {Map, Placemark, YMaps} from 'react-yandex-maps';
import pointMapIcon from '../../../../assets/images/placemark-icon.svg';
import {useDispatch, useSelector} from 'react-redux';
import {cityNameSelector, pointNameSelector} from '../../../../store/selectors/orderSelector';
import {pointsSelector} from '../../../../store/selectors/locationSelector';
import './styles.scss';
import {setPoint} from '../../../../store/reducers/orderReducer';

const mapProperties = {
    iconLayout: 'default#image',
    iconImageSize: [18, 18],
    iconImageHref: pointMapIcon,
};

const YandexMap = () => {
    const dispatch = useDispatch();

    let city = useSelector(cityNameSelector);
    let point = useSelector(pointNameSelector);
    let points = useSelector(pointsSelector);

    const changeMapCenter = async (address, isCity = false) => {
        isCity ? setZoom(12) : setZoom(16);
        const coords = await getCoordinates(address);
        setCenter(coords);
    };

    const getCoordinates = async (address) => {
        if (ymapsInstances) {
            const geocoder = await ymapsInstances.geocode(address);
            const firstGeoObject = geocoder.geoObjects.get(0);
            return firstGeoObject.geometry.getCoordinates();
        }
    };

    const [ymapsInstances, setYmapsInstances] = useState(null);
    let [zoom, setZoom] = React.useState(10);
    let [coordinates, setCoordinates] = useState(null);
    let [center, setCenter] = useState([55.7522, 37.6156]);
    const mapState = React.useMemo(() => ({center: center, zoom}), [zoom, center]);

    const init = (ymaps) => {
        setYmapsInstances(ymaps);
    };

    const getPoints = async (points) => {
        let newCoords = [];
        for (const item of points) {
            let newCoord = await getCoordinates(city + ',' + item.address);
            newCoords.push({newCoord: newCoord, point: item});
        }
        setCoordinates(newCoords);
    };

    useEffect(() => {
        !point && city && changeMapCenter(city, true);
        point && changeMapCenter(city + ',' + point);
    }, [point]);

    useEffect(() => {
        points && getPoints(points);
        city && changeMapCenter(city, true);
    }, [points]);

    return (
        <div className="map-container">
            <p className="map-container__title">Выбрать на карте:</p>
            <div className="map">
                <YMaps
                    query={{
                        ns: 'use-load-option',
                        apikey: process.env.REACT_APP_MAP_API_KEY,
                        load: 'geocode',
                    }}
                >
                    <Map state={mapState} className="map-inner" onLoad={(ymaps) => init(ymaps)}>
                        {coordinates &&
                            coordinates?.map((coordinate, index) => (
                                <Placemark
                                    key={index}
                                    geometry={coordinate.newCoord}
                                    options={mapProperties}
                                    onClick={() => {
                                        dispatch(
                                            setPoint({
                                                point: coordinate.point,
                                                pointOption: {
                                                    value: coordinate.point.id,
                                                    label: coordinate.point.address,
                                                },
                                            })
                                        );
                                    }}
                                />
                            ))}
                    </Map>
                </YMaps>
            </div>
        </div>
    );
};

export default YandexMap;
