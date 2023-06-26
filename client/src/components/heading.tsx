interface HeadingProps {
  title: string;
  description?: string;
}

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <>
      <h1 className="text-left text-4xl font-bold text-yellow-500">{title}</h1>
      {!!description && <p className="font-light">{description}</p>}
    </>
  );
};
