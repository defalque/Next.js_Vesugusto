import WelcomeEmail from "@/app/_components/ui/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Vesugusto <vesugustoteam@resend.dev>",
      to: ["marcodefalco2017@libero.it"],
      subject: "Benvenuto su Vesugusto",
      react: WelcomeEmail({ username: "Marco" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
