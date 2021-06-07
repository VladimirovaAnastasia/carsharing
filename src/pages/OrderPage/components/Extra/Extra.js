import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Radio} from '../Radio';
import {fetchRates} from '../../../../store/thunks/rateThunks';
import {isLoadingRatesSelector, ratesSelector} from '../../../../store/selectors/rateSelector';
import {orderSelector} from '../../../../store/selectors/orderSelector';
import {CheckBox} from '../CheckBox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    setAdditionalOption,
    setColor,
    setCompleteStatus,
    setDateFrom,
    setDateTo,
    setRate,
} from '../../../../store/reducers/orderReducer';
import {Loader} from '../../../../components/Loader';
import './styles.scss';

const Extra = () => {
    const dispatch = useDispatch();

    const isLoadingRates = useSelector(isLoadingRatesSelector);
    const order = useSelector(orderSelector);
    const rates = useSelector(ratesSelector);
    const {car, rate, duration, color} = order;

    const defaultCarColor = {
        name: 'Любой',
        id: 'Any',
    };

    const onFilterStartPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

    const onFilterEndPassedTime = (time) => {
        const selectedDate = new Date(time);
        return order.dateFrom < selectedDate.getTime();
    };

    const onChangeDateFrom = (date) => {
        const currentDate = new Date().getTime();

        if (!date) {
            dispatch(setDateFrom(null));
            return;
        }

        if (date) {
            if (currentDate > date.getTime()) {
                dispatch(setDateFrom(currentDate));
            } else {
                dispatch(setDateFrom(date.getTime()));
            }
        }

        if ((date.getTime() || currentDate) >= order?.dateTo) {
            dispatch(setDateTo(null));
        }
    };

    const onChangeDateTo = (date) => {
        if (!date) {
            dispatch(setDateTo(null));
            return;
        }
        if (date) {
            if (order?.dateFrom > date.getTime()) {
                dispatch(setDateTo(order.dateFrom));
            } else {
                dispatch(setDateTo(date.getTime()));
            }
        }
    };

    useEffect(() => {
        dispatch(fetchRates());
        if (car?.colors.length === 1) {
            dispatch(setColor(car?.colors[0][0].toUpperCase() + car?.colors[0].slice(1)));
        }
    }, []);

    const createCarOptions = (car) => {
        return car.colors?.map((item, index) => {
            return {
                name: item[0].toUpperCase() + item.slice(1),
                id: Date.now() + index,
            };
        });
    };

    const createRatesOptions = (rates) => {
        return rates?.map((item) => {
            return {
                name: item.rateTypeId?.name + ', ' + item?.price + ' ₽/' + item.rateTypeId?.unit,
                id: item.id,
            };
        });
    };
    const ratesOptions = createRatesOptions(rates);

    const changeActiveCarColor = (colorName) => {
        dispatch(setColor(colorName));
    };

    const changeRate = (rateName) => {
        let activeRate = rates?.find((item) => rateName.includes(item.rateTypeId.name));
        dispatch(setRate({rateName, activeRate}));
    };

    useEffect(() => {
        let isComplete = !!car && !!rate && !!duration;
        dispatch(setCompleteStatus({id: 2, status: isComplete}));
    }, [car, rate, duration]);

    useEffect(() => {
        !rate && ratesOptions && changeRate(ratesOptions[0]?.name);
    }, [ratesOptions]);

    if (isLoadingRates) {
        return <Loader />;
    }

    return (
        <div className="extra">
            {car && car?.colors?.length > 1 ? (
                <div className="extra-point">
                    <p className="extra-point__title">Цвет</p>
                    <Radio
                        name="colors"
                        radioOptions={createCarOptions(car)}
                        activeOption={color}
                        onHandleChange={(colorName) => changeActiveCarColor(colorName)}
                        value="name"
                        isHorizontal={true}
                        defaultOption={defaultCarColor}
                    />
                </div>
            ) : (
                <div className="extra-point">
                    <p className="extra-point__title">Цвет</p>
                    <p className="extra-point__text">{car?.colors[0][0].toUpperCase() + car?.colors[0].slice(1)}</p>
                </div>
            )}

            <div className="extra-point">
                <div className="type">
                    <div className="group">
                        <legend>Дата аренды</legend>
                        <div className="datapicker-wrapper">
                            <span>C</span>
                            <DatePicker
                                selected={order?.dateFrom}
                                onChange={(date) => onChangeDateFrom(date)}
                                showTimeSelect
                                filterTime={onFilterStartPassedTime}
                                timeFormat="HH:mm"
                                timeIntervals={1}
                                dateFormat="dd.MM.yyyy HH:mm"
                                timeCaption="time"
                                minDate={new Date()}
                                isClearable
                                placeholderText="Ведите дату и время"
                                className="datapicker"
                            />
                        </div>
                        <div className="datapicker-wrapper">
                            <span>По</span>
                            <DatePicker
                                selected={order?.dateTo}
                                onChange={(date) => onChangeDateTo(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={1}
                                dateFormat="dd.MM.yyyy HH:mm"
                                timeCaption="time"
                                minDate={order?.dateFrom}
                                filterTime={onFilterEndPassedTime}
                                isClearable
                                placeholderText="Ведите дату и время"
                                className="datapicker"
                                onKeyDown={(date) => {}}
                                disabled={!order.dateFrom}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {rates && (
                <div className="extra-point">
                    <p className="extra-point__title">Тариф</p>
                    <Radio
                        name="rates"
                        radioOptions={ratesOptions}
                        activeOption={rate || ratesOptions[0].name}
                        onHandleChange={(rateName) => changeRate(rateName)}
                        value="name"
                        isHorizontal={false}
                    />
                </div>
            )}

            <div className="extra-point">
                <p className="extra-point__title">Доп услуги</p>
                <CheckBox
                    name="extraOptions"
                    checkboxOptions={[
                        {
                            id: 'isFullTank',
                            isChecked: order.isFullTank,
                            name: 'Полный бак, ',
                            price: 500,
                        },
                        {
                            id: 'isNeedChildChair',
                            isChecked: order.isNeedChildChair,
                            name: 'Детское кресло, ',
                            price: 200,
                        },
                        {
                            id: 'isRightWheel',
                            isChecked: order.isRightWheel,
                            name: 'Правый руль, ',
                            price: 1600,
                        },
                    ]}
                    setActiveOption={(id, val) => {
                        dispatch(setAdditionalOption({id, val}));
                    }}
                />
            </div>
        </div>
    );
};

export default Extra;
