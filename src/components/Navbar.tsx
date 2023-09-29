import { UserButton, currentUser } from "@clerk/nextjs";
import NavbarContainer from "./NavbarContainer";

export default async function Navbar() {
  return (
    <div className="w-full fixed top-0  bg-white z-10 ">
      <div
        className="mx-auto px-2 sm:px-6 lg:px-8 "
        style={{ maxWidth: "100rem" }}
      >
        <NavbarContainer />
      </div>
    </div>
  );
}
