import React from "react";

class ProfileStatus extends React.Component {
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
    onStateChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate (PrevProps,PrevState){
        if(PrevProps.status !== this.props.status){
            this.setState({
                 status: this.props.status
            });
        }
        console.log('componentDidUpdate');
    }

    render() {

        console.log('render');

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