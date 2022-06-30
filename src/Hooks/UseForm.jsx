import { useState, useEffect, useMemo } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [Validation, setvalidation] = useState({})

    useEffect(() => {
        createValidators()
    }, [formState])

    useEffect(() => {
        setFormState( initialForm )
    }, [ initialForm ])

    const isFormValid = useMemo( () => {

        for (const formValue in Object.keys(Validation)) {
            if (Validation[formValue] !== null) return false;
        }

        return true
    }, [ Validation ]);

    // console.log(isFormValid);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {

        const formCheckValues = {}

        for (const formField of Object.keys(formValidations)) {

            const [fn, errorMessage] = formValidations[formField]

            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage

            setvalidation(formCheckValues)

        }

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...Validation,
        isFormValid
    }
}

