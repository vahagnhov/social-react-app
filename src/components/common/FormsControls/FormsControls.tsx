import React, {FC} from "react";
import s from './FormsControls.module.css';
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorsType} from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

const FormControl: FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span> {error} </span>}
        </div>
    );
};

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
};

export const Input: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
};

export function createField<FormsKeysType extends string> (placeholder: string,
                            name: FormsKeysType,
                            validators: Array<FieldValidatorsType>,
                            component: React.FC<WrappedFieldProps>,
                            props = {}, text = '')  {
    return <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>

}

export type GetStringKeys<T> = Extract<keyof T, string>

