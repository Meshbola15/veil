import type { ReactNode } from "react";

interface ScreenCardProps {
  children: ReactNode;
  className?: string;
  headerContent?: ReactNode;
  headerContentClassName?: string;
  onClick?: () => void;
}

export function ScreenCard({ children, className = "", headerContent, headerContentClassName = "", onClick }: ScreenCardProps) {
  return (
    <div onClick={onClick} className={`w-full rounded-[30px] bg-white shadow-card ${className}`}>
      {headerContent ? <div className={`p-2 ${headerContentClassName}`}>{headerContent}</div> : null}
      <div className="p-5">{children}</div>
    </div>
  );
}
