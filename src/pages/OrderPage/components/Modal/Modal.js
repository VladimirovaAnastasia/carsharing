import React from 'react';
import {setActiveStep} from '../../../../store/reducers/orderReducer';
import {useDispatch, useSelector} from 'react-redux';
import {currentStepSelector, orderSelector} from '../../../../store/selectors/orderSelector';
//import {postOrder} from '../../../../store/thunks/orderThunks';

import './styles.scss';

const Modal = () => {
    const dispatch = useDispatch();
    const currentStep = useSelector(currentStepSelector);
    //const order = useSelector(orderSelector);

    const onRejectClick = () => {
        dispatch(setActiveStep(currentStep - 1));
    };

    const onConfirmClick = () => {
        // todo разобраться с требуемым body
        //dispatch(postOrder(order));
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
