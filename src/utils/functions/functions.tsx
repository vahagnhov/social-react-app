import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export interface WithRouterProps {
    location: ReturnType<typeof useLocation>;
    params: Record<string, string>;
    navigate: ReturnType<typeof useNavigate>;
}

export const withRouter = <Props extends WithRouterProps>(Component: React.ComponentType<Props>) => {
    return (props: Omit<Props, keyof WithRouterProps>) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...(props as Props)}
                router={{location, navigate, params}}
            />
        );
    }
}