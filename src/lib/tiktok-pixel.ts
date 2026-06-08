export const TIKTOK_PIXEL_ID = "D8IVJEBC77UDG683NI2G";

declare global {
  interface Window {
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
      identify: (params: Record<string, unknown>) => void;
      load: (id: string) => void;
    };
  }
}

export function ttqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.ttq) {
    window.ttq.track(event, params);
  }
}

export function ttqIdentify(params: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.ttq) {
    window.ttq.identify(params);
  }
}