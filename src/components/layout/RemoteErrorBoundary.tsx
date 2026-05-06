import { Component, type ReactNode, type ErrorInfo } from 'react';
import { remoteEventEmitter } from '../../app/remoteEventEmitter';

interface Props {
  children: ReactNode;
  remoteName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class RemoteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const remoteName = this.props.remoteName ?? 'unknown';
    console.error(`[RemoteErrorBoundary] Error en remoto "${remoteName}":`, error, info);
    remoteEventEmitter.emit('remote:error', {
      remoteName,
      error,
      timestamp: Date.now(),
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>
            No se pudo cargar {this.props.remoteName ?? 'el módulo'}.
          </p>
          <p style={{ color: '#888', fontSize: '0.875rem' }}>
            Comprueba que el remoto está desplegado y accesible.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '8px',
              padding: '8px 20px',
              borderRadius: '999px',
              border: '1px solid #FF914D',
              background: 'transparent',
              color: '#FF914D',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
