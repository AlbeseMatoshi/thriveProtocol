export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'; // Define different button styles
  size?: 'small' | 'medium' | 'large'; // Define size options
  isLoading?: boolean; // Show a loading spinner if true
  disabled?: boolean; // Disable the button
  startIcon?: React.ReactNode; // Icon before the text
  endIcon?: React.ReactNode; // Icon after the text
}