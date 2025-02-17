import Link from "next/link";

const Disclaimer = () => {
  return (
    <div className="text-balance text-center text-xs [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
      By clicking continue, you agree to our{" "}
      <Link target="_blank" href="/terms">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link target="_blank" href="/privacy">
        Privacy Policy
      </Link>
      .
    </div>
  );
};

export default Disclaimer;
