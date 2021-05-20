import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Radio} from '../Radio';
import {fetchCategories} from '../../../../store/thunks/categoryThunk';
import {categoriesSelector, isLoadingCategoriesSelector} from '../../../../store/selectors/categorySelector';
import {fetchCars, fetchCarsByCategory} from '../../../../store/thunks/carThunk';
import {carsSelector, isLoadingCarsSelector} from '../../../../store/selectors/carSelector';
import {Cars} from '../Cars';
import {carSelector, categorySelector} from '../../../../store/selectors/orderSelector';
import {setCategory, setCompleteStatus} from '../../../../store/reducers/orderReducer';
import {Loader} from '../../../../components/Loader';
import './styles.scss';

const Model = () => {
    const dispatch = useDispatch();

    const categories = useSelector(categoriesSelector);
    const category = useSelector(categorySelector);
    const cars = useSelector(carsSelector);
    const car = useSelector(carSelector);
    const isLoadingCars = useSelector(isLoadingCarsSelector);
    const isLoadingCategories = useSelector(isLoadingCategoriesSelector);

    const defaultCategory = {
        name: 'Все модели',
        id: 'All',
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    useEffect(() => {
        dispatch(fetchCars());
    }, [categories]);

    useEffect(() => {
        if (category) {
            dispatch(fetchCarsByCategory(category.id));
        } else {
            dispatch(fetchCars());
        }
    }, [category]);

    useEffect(() => {
        let isComplete = !!car;
        dispatch(setCompleteStatus({id: 1, status: isComplete}));
    }, [car]);

    const changeActiveCategory = (categoryName) => {
        dispatch(setCategory(categories.find((option) => option.name === categoryName)) || null);
    };

    if (isLoadingCars || isLoadingCategories) {
        return <Loader />;
    }

    return (
        <div className="model">
            <Radio
                name={'category'}
                value="name"
                radioOptions={categories}
                activeOption={category?.name || defaultCategory.name}
                onHandleChange={(categoryName) => changeActiveCategory(categoryName)}
                isHorizontal={true}
                defaultOption={defaultCategory}
            />
            <Cars cars={cars} />
        </div>
    );
};

export default Model;
