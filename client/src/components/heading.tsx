interface HeadingProps {
  title: string;
  description?: string;
}

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="break-words text-left text-4xl font-bold text-yellow-500">
        {title}
      </h1>
      {!!description && <p className="font-light">{description}</p>}
    </div>
  );
};
