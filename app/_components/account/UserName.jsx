import { auth } from "@/auth";

// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

async function UserName() {
  // await delay(2000);
  const session = await auth();

  return (
    <p className="">
      {session.user.name}
      <span aria-hidden>!</span>
    </p>
  );
}

export default UserName;
