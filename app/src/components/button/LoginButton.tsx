interface ButtonProps {
  title: string;
  onClick: () => void;
  backgroundColor: string;
  textColor: string;
  disabled?: boolean;
  icon: React.ReactNode;
}

export default function LoginButton({
  title,
  onClick,
  backgroundColor,
  textColor,
  disabled = false,
  icon,
}: ButtonProps) {
  return (
    <button
      className={`w-full flex justify-center items-center gap-2 h-[46px] cursor-pointer text-base font-medium leading-5 rounded-md ${backgroundColor} ${textColor}`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}
