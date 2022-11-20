import React, {ComponentType} from "react";
import Preloader from "../components/common/Preloader/Preloader";

type PropsType = {
    children?: React.ReactNode;
}

export function withSuspense<WCP>(WrappedComponent: ComponentType<WCP>) {
    return (props: WCP & PropsType) => {
        return <React.Suspense fallback={<Preloader/>} >
            <WrappedComponent {...props} />
        </React.Suspense>
    }
}