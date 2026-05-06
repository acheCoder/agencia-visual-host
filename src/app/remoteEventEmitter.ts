type RemoteErrorPayload = {
  remoteName: string;
  error: Error;
  timestamp: number;
};

type EventHandler = (payload: RemoteErrorPayload) => void;

class RemoteEventEmitter {
  private listeners = new Map<string, Set<EventHandler>>();

  on(event: string, handler: EventHandler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  off(event: string, handler: EventHandler) {
    this.listeners.get(event)?.delete(handler);
  }

  emit(event: string, payload: RemoteErrorPayload) {
    this.listeners.get(event)?.forEach((handler) => handler(payload));
  }
}

export const remoteEventEmitter = new RemoteEventEmitter();
