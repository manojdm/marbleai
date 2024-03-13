import { PropsWithChildren } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="">
      <div className="p-4 px-12 min-h-[100vh] bg-zinc-100">
        <Breadcrumb />
        <div>{children}</div>
      </div>
    </div>
  );
};
