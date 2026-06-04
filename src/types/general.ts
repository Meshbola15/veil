export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}
