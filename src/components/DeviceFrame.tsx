import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function DeviceFrame({ children, className }: Props) {
  return (
    <div className={`device-frame-wrap${className ? ` ${className}` : ""}`}>
      <div className="device-frame">
        <div className="device-notch" aria-hidden="true" />
        <div className="device-screen">{children}</div>
      </div>
    </div>
  );
}
