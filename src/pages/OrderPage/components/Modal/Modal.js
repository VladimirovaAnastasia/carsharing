import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveStep} from '../../../../store/reducers/orderReducer';
import {currentStepSelector, orderSelector, orderStatusIdSelector} from '../../../../store/selectors/orderSelector';
import {postOrder} from '../../../../store/thunks/orderThunks';

import './styles.scss';

const Modal = () => {
    const dispatch = useDispatch();

    const currentStep = useSelector(currentStepSelector);
    const order = useSelector(orderSelector);
    const orderStatusId = useSelector(orderStatusIdSelector);

    const onRejectClick = () => {
        dispatch(setActiveStep(currentStep - 1));
    };

    const onConfirmClick = () => {
        dispatch(postOrder(order));
        dispatch(setActiveStep(currentStep + 1));
    };

    return (
        <div className="modal">
            <div className="modal-container">
                <div className="confirm">
                    <div className="confirm__title">Подтвердить заказ</div>
                    <div className="confirm__buttons">
                        <div className="confirm__buttons--accept">
                            <button className="button" onClick={() => onConfirmClick()}>
                                Подтвердить
                            </button>
                        </div>
                        <div className="confirm__buttons--reject">
                            <button className="button" onClick={() => onRejectClick()}>
                                Вернуться
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
