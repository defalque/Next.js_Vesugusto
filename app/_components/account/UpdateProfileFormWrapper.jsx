import { getUserInfo } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import UpdateProfileForm from "./UpdateProfileForm";

async function UpdateProfileFormWrapper() {
  const session = await auth();
  const user = await getUserInfo(session.user.userId);

  return (
    <UpdateProfileForm
      user={user}
      name={session.user.name}
      email={session.user.email}
    />
  );
}

export default UpdateProfileFormWrapper;
