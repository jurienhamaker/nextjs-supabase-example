import { Button } from "@/components/button";

export default function AuthError() {
  return (
    <div className="h-dvh w-dvw flex flex-col gap-4 justify-center items-center">
      Authentication Error
      <Button as="a" href="/">
        Back
      </Button>
    </div>
  );
}
