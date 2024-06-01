import AuthSignIn from "@/components/auth-sign-in";

export default function Page() {
  return (
    <div className="z-10 grid w-full items-center px-4 sm:justify-center my-10">
      <AuthSignIn className="rounded-lg border bg-card text-card-foreground shadow-sm space-y-6" />
    </div>
  );
}
