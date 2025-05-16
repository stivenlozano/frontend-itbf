import * as yup from "yup";
import type { FormErrors } from '../types';

export const handleValidatorsErrors = (err: unknown) => {
  if (err instanceof yup.ValidationError) {
    const newErrors: FormErrors = {};

    err.inner.forEach((e) => {
      if (e.path) newErrors[e.path] = e.message;
    });

    return newErrors;
  }
};