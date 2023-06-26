import { Button, Icons } from "@/src/components";

export const CreateNewDishButton = () => {
  return (
    <Button
      title="Adicionar novo prato"
      className="fixed bottom-5 right-5 flex h-[50px] w-[50px] flex-col items-center justify-center rounded-full bg-yellow-500 shadow-sm duration-100 hover:bg-yellow-600"
    >
      <Icons.plus className="text-black" size={30} />
    </Button>
  );
};
