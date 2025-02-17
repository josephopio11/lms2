import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { handleGithubSignin, handleGoogleSignin } from "./actions";

const SocialLogin = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <form className="w-full" action={handleGithubSignin}>
          <Button variant="outline" className="w-full" type="submit">
            <FaGithub className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>
        </form>
        <form className="w-full" action={handleGoogleSignin}>
          <Button variant="outline" className="w-full" type="submit">
            <FcGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
        </form>
      </div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </>
  );
};

export default SocialLogin;
