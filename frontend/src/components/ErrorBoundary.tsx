'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message?: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error) {
    console.error('UI error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-6">
          <h2 className="text-xl text-red-500 font-semibold">Something went wrong</h2>
          <p className="text-gray-400 mt-2">{this.state.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
