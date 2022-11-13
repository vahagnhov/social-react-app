import React, {ChangeEvent} from "react";

type PropsType = {
    status: string,
    updateStatus: (NewStatus: string) => void
};

type StateType = {
    editMode: boolean,
    status: string
};

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })

        this.props.updateStatus(this.state.status);
    }
    onStateChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(PrevProps: PropsType, PrevState: StateType) {
        if (PrevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {

        return (
            <div>
                {!this.state.editMode
                    ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                    :
                    <div>
                        <input
                            onChange={this.onStateChange}
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                            value={this.state.status || '------'}/>
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;