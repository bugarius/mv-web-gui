import React from 'react';
import * as PropTypes from 'prop-types';
import ErrorApi from "./ErrorApi";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        ErrorApi.post(error.toString().concat(errorInfo.componentStack.toString()))
    }

    render() {
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any
};

export default ErrorBoundary;