import { useForm as useReactHookForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const useForm = (schema, defaultValues = {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
    watch,
    setValue,
    getValues,
    reset,
    clearErrors,
    setError,
  } = useReactHookForm({
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues,
    mode: 'onChange',
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    control,
    watch,
    setValue,
    getValues,
    reset,
    clearErrors,
    setError,
  };
};
