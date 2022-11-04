import React from "react";
import Preloader from "../components/common/Preloader/Preloader";


export const withSuspense = (Component) => {
    return <React.Suspense fallback={<Preloader/>}>
        <Component/>
    </React.Suspense>
}