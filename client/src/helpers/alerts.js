import { toast } from 'react-toastify';

export const showErrors = (values, onClose) => {
    values.map(error => toast.error(error.message, { onClose }));
}

export const showWarn = (values, onClose) => {
    values.map(warn => toast.warn(warn.message, {onClose}))
}

export const showSuccess = (value, onClose) => {
    toast.success(value, { onClose });
}