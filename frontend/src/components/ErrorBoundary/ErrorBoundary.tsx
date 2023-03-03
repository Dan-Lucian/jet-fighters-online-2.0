import React, { ReactNode } from 'react';

interface IFallbackComponentProps {
  error: Error;
}

interface IErrorBoundaryProps {
  FallbackComponent: ({ error }: IFallbackComponentProps) => JSX.Element;
  children?: ReactNode;
}

interface IErrorBoundaryState {
  error: Error | null;
}

// This ErrorBoundary doesn't return a default error fallback component
// it accepts a FallbackComponent prop and returns it passing the error to it
class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  public componentDidCatch(error: Error) {
    this.setState({
      error,
    });
  }

  public render() {
    const { error } = this.state;
    const { children, FallbackComponent } = this.props;
    
    if (!error) {
      return children;
    }

    if (FallbackComponent) {
      return <FallbackComponent error={error} />;
    }

    throw new Error('The Error boundary requires a FallbackComponent prop');
  }
}

export default ErrorBoundary;
