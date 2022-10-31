import s from './FormsControls.module.css';

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

/*
const TagElement = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span> {meta.error} </span>}
        </div>
    );
};

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <TagElement {...props}><textarea {...input} {...restProps}/></TagElement>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <TagElement {...props}><input {...input} {...restProps}/></TagElement>
}
*/

