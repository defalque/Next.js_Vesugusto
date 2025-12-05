"use client";

import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import { UserAvatarSkeleton } from "../skeleton/Skeletons";

function UserActions() {
  return (
    <div className="mr-2 ml-2 flex items-center md:mr-0">
      <UserButton fallback={<UserAvatarSkeleton />}>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Vai all'area privata"
            labelIcon={<User className="size-4" />}
            href="/account"
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
}

export default UserActions;
