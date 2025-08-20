import LoginButton from "@/components/login-button";
import LogoutButton from "@/components/logout-button";

export default async function Home() {
  return (
    <div className="h-dvh w-dvw flex items-center justify-center flex-col gap-4">
      <h1 className="text-xl">Coming soon</h1>
      <LoginButton />
      <LogoutButton />
    </div>
  );
}
