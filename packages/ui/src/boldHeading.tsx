export const BoldHeading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={`${className} text-4xl text-[#6a51a6] font-bold outline-none`}
    >
      {title}
    </div>
  );
};
