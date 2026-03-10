/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const HeaderUser = () => {
  const { user: loggedInUser } = useAuth();
  const [userInitial, setUserInitial] = useState("");
  const [userNameDisplay, setUserNameDisplay] = useState("");

  useEffect(() => {
    if (loggedInUser?.fullName) {
      setUserInitial(loggedInUser.fullName.charAt(0).toUpperCase());

      const names = loggedInUser.fullName.split(" ");
      const firstWord = names[0];
      const secondWord = names[1] || "";

      let display =
        firstWord.length > 6 ? firstWord.charAt(0).toUpperCase() : firstWord;

      if (secondWord) {
        display += " " + secondWord.charAt(0).toUpperCase();
      }

      setUserNameDisplay(display);
    } else {
      setUserInitial("");
      setUserNameDisplay("");
    }
  }, [loggedInUser]);

  return (
    <li>
      <Link
        to="/user"
        className="flex flex-col justify-center items-center gap-y-1 transition-colors duration-300"
      >
        {userInitial ? (
          <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
            {userInitial}
          </div>
        ) : (
          <CiUser />
        )}
        <span className="hidden lg:inline-block text-[10px]">
          {userNameDisplay || "Account"}
        </span>
      </Link>
    </li>
  );
};

export default HeaderUser;
