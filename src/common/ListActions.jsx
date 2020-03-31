import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

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
        const {entity, actions: {proceed, remove, info}} = this.props;
        return (
                <>
                    <div id="split-button-basic-1" className={"btn-group" + (isOpened ? " show" : "")} ref={this.setWrapperRef}>
                        <button className="btn btn-primary" onClick={() => info(entity)}>Zarządzaj</button>
                        <button type="button" aria-haspopup="true" aria-expanded="true"
                                className="dropdown-toggle btn btn-primary" onClick={this.switchMenu}><span
                                className="sr-only">Toggle Dropdown</span></button>
                        <div tabIndex={-1} role="menu" aria-hidden="false" className={"dropdown-menu" + (isOpened ? " show" : "")}
                             x-placement="bottom-start" style={{
                            position: 'absolute',
                            willChange: 'transform',
                            top: '0px',
                            left: '-100px',
                            transform: 'translate3d(76px, 33px, 0px)'
                        }} data-placement="bottom-start">
                            {this.renderButton(entity, false, () => proceed(entity), 'Edytuj')}
                            <div tabIndex={-1} className="dropdown-divider"/>
                            {this.renderButton(entity, false, () => remove(entity), 'Usuń')}
                        </div>
                    </div>
                </>
        )
    }
}

export default withRouter(ListActions);