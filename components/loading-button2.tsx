import { Button } from "@/components/ui/button";

export default function LoadingButton2({
  pending,
  children,
  type,
  size,
}: {
  pending: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  size?: "default" | "sm" | "lg" | "icon";
}) {
  return (
    <Button
      className="ml-auto text-white"
      type={type || "submit"}
      disabled={pending}
      size={size}
    >
      {children}
    </Button>
  );
}
