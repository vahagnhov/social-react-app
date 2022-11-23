import {Field, Form, Formik} from "formik";
import React, {FC} from "react";
import {FilterType} from "../../redux/reducers/users-reducer";

const UsersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'all'
}

type PropsType = {
    onFilterChange: (filter: FilterType) => void
}

const UsersSearchForm: FC<PropsType> = React.memo((props) => {

    const onSubmit = (values: FilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        /*const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }*/
        props.onFilterChange(values);
        setSubmitting(false);
    };

    return <div>
        <Formik
            initialValues={{term: '', friend: 'all'}}
            validate={UsersSearchFormValidate}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field as="select" name="friend">
                        <option value="all">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unFollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Search
                    </button>
                </Form>
            )}
        </Formik>
    </div>
});

export default UsersSearchForm;