import { useState, useCallback } from 'react';
import { Database } from '@/types/database.types';
import { IBookInsert, IBookUpdate } from '@/types/book.types';

type BookStatus = Database['public']['Enums']['status_livro'];

export interface BookFormValues {
    nome: string;
    numPag: string;          // string para facilitar inputs numéricos
    status: BookStatus;
    autor: string;
    ano: string;             // string para facilitar input
    text: string;
    dtInicial: string;       // ISO date string "YYYY-MM-DD"
    dtFinal: string;
    numPagRead: string;
    img: string;
}

export interface BookFormErrors {
    nome?: string;
    numPag?: string;
    status?: string;
    autor?: string;
    ano?: string;
    dtInicial?: string;
    dtFinal?: string;
    numPagRead?: string;
}

interface UseBookFormOptions {
    /** Passa o livro existente para modo de edição */
    initialValues?: Partial<BookFormValues>;
    onSubmit: (data: IBookInsert | IBookUpdate) => Promise<void> | void;
}

const DEFAULT_VALUES: BookFormValues = {
    nome: '',
    numPag: '',
    status: 'Desejado',
    autor: '',
    ano: '',
    text: '',
    dtInicial: '',
    dtFinal: '',
    numPagRead: '',
    img: '',
};

function validate(values: BookFormValues): BookFormErrors {
    const errors: BookFormErrors = {};

    if (!values.nome.trim()) {
        errors.nome = 'Nome é obrigatório.';
    }

    const numPag = Number(values.numPag);
    if (!values.numPag) {
        errors.numPag = 'Número de páginas é obrigatório.';
    } else if (!Number.isInteger(numPag) || numPag <= 0) {
        errors.numPag = 'Informe um número de páginas válido (inteiro positivo).';
    }

    if (!values.status) {
        errors.status = 'Status é obrigatório.';
    }

    if (values.ano) {
        const ano = Number(values.ano);
        const currentYear = new Date().getFullYear();
        if (!Number.isInteger(ano) || ano < 1 || ano > currentYear + 5) {
            errors.ano = `Ano deve ser entre 1 e ${currentYear + 5}.`;
        }
    }

    if (values.numPagRead) {
        const numPagRead = Number(values.numPagRead);
        if (!Number.isInteger(numPagRead) || numPagRead < 0) {
            errors.numPagRead = 'Páginas lidas deve ser um número inteiro não-negativo.';
        } else if (values.numPag && numPagRead > Number(values.numPag)) {
            errors.numPagRead = 'Páginas lidas não pode exceder o total de páginas.';
        }
    }

    if (values.dtInicial && values.dtFinal) {
        const start = new Date(values.dtInicial);
        const end = new Date(values.dtFinal);
        if (end < start) {
            errors.dtFinal = 'Data final não pode ser anterior à data inicial.';
        }
    }

    return errors;
}

function toPayload(values: BookFormValues): IBookInsert {
    return {
        nome: values.nome.trim(),
        numPag: Number(values.numPag),
        status: values.status,
        autor: values.autor.trim() || null,
        ano: values.ano ? Number(values.ano) : null,
        text: values.text.trim() || null,
        dtInicial: values.dtInicial || null,
        dtFinal: values.dtFinal || null,
        numPagRead: values.numPagRead ? Number(values.numPagRead) : 0,
        img: values.img.trim() || null,
        // idUsuario é injetado externamente (auth context)
        idUsuario: '',
    };
}

export function useBookForm({ initialValues, onSubmit }: UseBookFormOptions) {
    const [values, setValues] = useState<BookFormValues>({
        ...DEFAULT_VALUES,
        ...initialValues,
    });
    const [errors, setErrors] = useState<BookFormErrors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof BookFormValues, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditMode = Boolean(initialValues && Object.keys(initialValues).length > 0);

    const setValue = useCallback(
        <K extends keyof BookFormValues>(field: K, value: BookFormValues[K]) => {
            setValues((prev) => ({ ...prev, [field]: value }));
            // Revalida o campo ao alterar se já foi tocado
            setTouched((prev) => {
                if (prev[field]) {
                    const newValues = { ...values, [field]: value };
                    const newErrors = validate(newValues);
                    setErrors((e) => ({ ...e, [field]: newErrors[field as keyof BookFormErrors] }));
                }
                return prev;
            });
        },
        [values]
    );

    const setBlurred = useCallback(
        (field: keyof BookFormValues) => {
            setTouched((prev) => ({ ...prev, [field]: true }));
            const fieldErrors = validate(values);
            setErrors((prev) => ({
                ...prev,
                [field]: fieldErrors[field as keyof BookFormErrors],
            }));
        },
        [values]
    );

    const handleSubmit = useCallback(async () => {
        const allTouched = Object.keys(values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {} as Record<keyof BookFormValues, boolean>
        );
        setTouched(allTouched);

        const validationErrors = validate(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).some((k) => validationErrors[k as keyof BookFormErrors])) {
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = toPayload(values);
            await onSubmit(payload);
        } finally {
            setIsSubmitting(false);
        }
    }, [values, onSubmit]);

    const reset = useCallback(() => {
        setValues({ ...DEFAULT_VALUES, ...initialValues });
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    const isValid = Object.keys(validate(values)).length === 0;

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isEditMode,
        isValid,
        setValue,
        setBlurred,
        handleSubmit,
        reset,
    };
}