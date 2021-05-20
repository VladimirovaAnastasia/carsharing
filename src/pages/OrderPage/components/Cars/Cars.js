import React from 'react';
import Car from './Car';
import {useDispatch, useSelector} from 'react-redux';
import {carSelector} from '../../../../store/selectors/orderSelector';
import {clearOrderWithoutCar, setCar} from '../../../../store/reducers/orderReducer';
import './styles.scss';

const Cars = ({cars}) => {
    const dispatch = useDispatch();

    const car = useSelector(carSelector);
    const handleChangeActiveCar = (car) => {
        dispatch(setCar(car));
        dispatch(clearOrderWithoutCar());
    };

    return (
        <div className="cars-container">
            <div className="cars">
                {cars &&
                    cars.map((item) => (
                        <Car
                            key={item.id}
                            car={item}
                            isActive={car && car.id === item.id}
                            changeActiveCar={(activeCar) => handleChangeActiveCar(activeCar)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Cars;
