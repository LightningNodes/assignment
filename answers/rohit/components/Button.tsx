import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

interface Props {
  text: string;
  loading: boolean;
}

export default function ButtonWithLoader({ text, loading }: Props) {
  return loading ? (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <Button>{text}</Button>
  );
}
