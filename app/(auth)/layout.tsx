import ImageChange from "./ImageChange";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: Props) => {
  // const session = await auth();
  // if (!!session?.user) {
  //   redirect("/");
  // }
  return <ImageChange>{children}</ImageChange>;
};

export default AuthLayout;
