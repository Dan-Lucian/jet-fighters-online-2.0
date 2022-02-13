/* eslint-disable react/prop-types */
import React from 'react';

// This ErrorBoundary doesn't return a default error fallback component
// it accepts a FallbackComponent prop and returns it passing the error to it
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    const { children, FallbackComponent } = this.props;

    if (error !== null) {
      if (FallbackComponent) {
        return <FallbackComponent error={error} />;
      }

      throw new Error('The Error boundary requires a FallbackComponent prop');
    }

    return children;
  }
}

export default ErrorBoundary;
