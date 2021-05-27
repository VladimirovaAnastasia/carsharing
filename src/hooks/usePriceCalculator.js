import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch} from 'react-router-dom';
import {setDuration, setPrice} from '../store/reducers/orderReducer';
import {ratesSelector} from '../store/selectors/rateSelector';
import {orderSelector} from '../store/selectors/orderSelector';

export default function usePriceCalculator() {
    const dispatch = useDispatch();
    const match = useRouteMatch();

    const order = useSelector(orderSelector);
    const rateId = order?.rateId.id;
    const rates = useSelector(ratesSelector);

    const [orderPrice, setOrderPrice] = useState(0);
    const [orderDuration, setOrderDuration] = useState(null);

    const calculatePrice = () => {
        if (order.dateTo && order.dateFrom && (rates || order?.rateId)) {
            const rate = rates?.find((item) => item.id === rateId);
            const time = order.dateTo - order.dateFrom;

            let tempPrice = 0;
            switch (order?.rateId?.unit || order?.rateId.rateTypeId?.unit) {
                case 'мин': {
                    tempPrice = (rate?.price || order?.rateId?.price) * (time / 1000 / 60);
                    setOrderDuration(`
                     ${Math.floor(time / (1000 * 60 * 60 * 24))}д
                     ${Math.floor((time / (1000 * 60 * 60)) % 24)}ч
                     ${Math.floor((time / (1000 * 60)) % 60)}мин`);
                    break;
                }
                case 'сутки': {
                    tempPrice = (rate?.price || order?.rateId?.price) * Math.ceil(time / 1000 / 60 / 60 / 24);
                    setOrderDuration(`${Math.ceil(time / (1000 * 60 * 60 * 24))}д 0ч`);
                    break;
                }
                case '7 дней':
                    tempPrice = (rate?.price || order?.rateId?.price) * Math.ceil(time / 1000 / 60 / 60 / 24 / 7);
                    setOrderDuration(`${Math.ceil(time / (1000 * 60 * 60 * 24) / 7) * 7}д`);
                    break;
                default:
                    break;
            }

            if (order.isFullTank) {
                tempPrice += 500;
            }
            if (order.isNeedChildChair) {
                tempPrice += 200;
            }
            if (order.isRightWheel) {
                tempPrice += 1600;
            }
            setOrderPrice(tempPrice);
        } else {
            setOrderPrice(0);
        }
        return orderDuration;
    };

    useEffect(() => {
        dispatch(setDuration(orderDuration));
        dispatch(setPrice(Math.ceil(orderPrice)));
    }, [orderPrice, orderDuration]);

    return {calculatePrice};
}
