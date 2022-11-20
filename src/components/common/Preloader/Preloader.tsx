import React, {FC} from "react";
import preloader from "../../../assets/images/preloader.gif";

let Preloader: FC = () => {
    return (
        <div style={{backgroundColor: 'white'}}>
            <img alt='preloader' src={preloader}/>
        </div>
    );
}

export default Preloader;