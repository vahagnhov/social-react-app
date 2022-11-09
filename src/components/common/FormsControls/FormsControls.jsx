import s from './FormsControls.module.css';
import {Field} from "redux-form";

const TagElement = TagElement => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                <TagElement {...input} {...props} />
            </div>
            {hasError && <span> {meta.error} </span>}
        </div>
    );
};

export const Textarea = TagElement("textarea");

export const Input = TagElement("input");

export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
    return <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        />
    </div>

}

