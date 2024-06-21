interface ButtonProps {
  title: string;
  onClick: () => void;
  backgroundColor: string;
  backgroundColorHover: string;
  disabled?: boolean;
}

export default function Button({
  title,
  onClick,
  backgroundColor,
  backgroundColorHover,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={`border-[1px] ${backgroundColor} ${backgroundColorHover} rounded-lg w-fit
  px-4 py-1 text-white cusor-pointer font-light cursor-pointer text-sm`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
