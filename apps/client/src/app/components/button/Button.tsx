const defaultProps = {
  className: '',
  onClick: () => {},
  disabled: false,
};

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

function Button({ children, onClick, className, disabled }: Props) {
  return (
    <button
      type='button'
      className={`${className} transition duration-100 active:transform active:scale-90 cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;
