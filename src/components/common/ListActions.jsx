import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {EntityLiveStatus} from "./enums/EntityLiveStatus";

class ListActions extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isOpened: false,
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    switchMenu = () => {
        this.setState((prevState) => ({isOpened: !prevState.isOpened}));
    };

    closeMenu = () => {
        this.setState(() => ({isOpened: false}));
    };

    componentDidMount()
    {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount()
    {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node)
    {
        this.wrapperRef = node;
    }

    handleClickOutside(event)
    {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target))
        {
            this.closeMenu()
        }
    }

    renderButton = (entity, disabled, onClick, label) =>
    {
        return <button type="button" tabIndex={0} className={"dropdown-item" + (disabled ? " disabled" : "")}
                       onClick={onClick}>
            {label}
        </button>
    };

    render()
    {
        const {isOpened} = this.state;
        const {entity, actions: {proceed, remove, info, archive, revertArchive}, triggerRemoveCallback} = this.props;

        const mainButtonAction = info ? info : proceed;

        return (
                <>
                    <div id="split-button-basic-1" className={"btn-group" + (isOpened ? " show" : "")} ref={this.setWrapperRef}>
                        {entity?.liveStatus === EntityLiveStatus.ARCHIVED ?
                                <button className="btn btn-primary"
                                        onClick={() => proceed(entity)}>Podgląd</button>
                                :
                            <button className="btn btn-primary"
                                    onClick={() => mainButtonAction(entity)}>{info ? "Zarządzaj" : "Edytuj"}</button>
                        }
                        <button type="button" aria-haspopup="true" aria-expanded="true"
                                className="dropdown-toggle btn btn-primary" onClick={this.switchMenu}><span
                                className="sr-only">Toggle Dropdown</span></button>
                        <div tabIndex={-1} role="menu" aria-hidden="false" className={"dropdown-menu" + (isOpened ? " show" : "")}
                             style={{
                            position: 'absolute',
                            willChange: 'transform',
                            top: '0px',
                            left: '-100px',
                            transform: 'translate3d(76px, 33px, 0px)'
                        }}
                             onClick={this.closeMenu}
                        >
                            {info && entity?.liveStatus !== EntityLiveStatus.ARCHIVED && this.renderButton(entity, false, () => proceed(entity), 'Edytuj')}
                            {archive && entity?.liveStatus !== EntityLiveStatus.ARCHIVED && this.renderButton(entity, false, () => archive(entity), 'Archiwizuj')}
                            {revertArchive && entity?.liveStatus === EntityLiveStatus.ARCHIVED && this.renderButton(entity, false, () => revertArchive(entity), 'Cofnij archiwizację')}
                            {info && <div tabIndex={-1} className="dropdown-divider"/>}
                            {this.renderButton(entity, false, () => {
                                remove(entity);
                                triggerRemoveCallback && triggerRemoveCallback();
                            }, 'Usuń')}
                        </div>
                    </div>
                </>
        )
    }
}

export default withRouter(ListActions);