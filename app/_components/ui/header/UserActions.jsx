"use client";

import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import { UserAvatarSkeleton } from "../skeleton/Skeletons";

function UserActions() {
  return (
    <UserButton fallback={<UserAvatarSkeleton />}>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Vai all'area privata"
          labelIcon={<User className="size-4" />}
          href="/account"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}

export default UserActions;
