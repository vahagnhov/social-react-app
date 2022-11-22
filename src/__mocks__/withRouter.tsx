import React from 'react';
import {WithRouterProps} from "../utils/functions/functions";

export const withRouter = (Component: React.ComponentType<WithRouterProps>) => {
    return (props: WithRouterProps) => {
        return <Component {...props}  params={{ pathname: 'pathname' }} />;
    };
};

// reuse the mock in our tests by including it in the test file:   jest.mock('../withRouter');