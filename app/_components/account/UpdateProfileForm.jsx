"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "@/app/_lib/schemas/updateProfileSchema";

import { useFormButtonsContext } from "@/app/_contexts/FormButtonsContext";
import { updateUserProfile } from "@/app/_lib/actions";
import { showCustomErrorToast } from "../ui/CustomToast";

import FormRow from "./FormRow";
import FormButtons from "./FormButtons";

import * as m from "motion/react-m";
import { LazyMotion, MotionConfig } from "motion/react";
import { useReducedMotion } from "@/app/_hooks/useReducedMotion";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

function UpdateProfileForm({ user }) {
  const { buttonState, setButtonState } = useFormButtonsContext();
  const shouldReduce = useReducedMotion();

  const defaultValues = {
    address: user.address || "",
    houseNumber: user.houseNumber || "",
    zipCode: user.zipCode || "",
    city: user.city || "",
    phoneNumber: user.phoneNumber || "",
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, dirtyFields, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    values: defaultValues,
    resolver: zodResolver(updateProfileSchema),
  });

  const onSubmit = async (data) => {
    // const modifiedFields = Object.keys(dirtyFields).reduce((acc, key) => {
    //   acc[key] = data[key];
    //   return acc;
    // }, {});

    try {
      setButtonState("loading");
      // const result = await updateUserProfile(data);
      const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
      const request = updateUserProfile(data);
      const result = await Promise.all([request, minDelay]).then(
        ([res]) => res,
      );

      if (result.errors) {
        Object.entries(result.errors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message,
          });
        });

        setButtonState("idle");
        return;
      }
      setButtonState("success");
      setTimeout(() => setButtonState("idle"), 1750);
    } catch (err) {
      const toast = (await import("react-hot-toast")).default;
      showCustomErrorToast(toast, err);
      setButtonState("idle");
    }

    //DEV MODE
    // setButtonState("loading");
    // setTimeout(() => {
    //   setButtonState("success");
    // }, 1750);
    // setTimeout(() => {
    //   setButtonState("idle");
    // }, 3500);
  };

  return (
    <>
      <LazyMotion features={loadFeatures}>
        <MotionConfig
          transition={{
            type: "spring",
            bounce: 0,
            duration: shouldReduce ? 0 : 0.3,
          }}
          shouldReduce={shouldReduce ? "always" : "never "}
        >
          <m.form
            layout
            style={{ position: "relative" }}
            onSubmit={handleSubmit(onSubmit)}
            className="my-8 grid w-full grid-cols-4 grid-rows-[auto_auto] gap-5"
          >
            <m.div
              layout
              style={{ position: "relative" }}
              className="col-span-full flex w-full flex-col gap-y-2 lg:col-span-2"
            >
              <FormRow
                {...register("address")}
                type="text"
                id="address"
                label="Indirizzo"
                placeholder="Inserisci indirizzo..."
                disabled={isSubmitting}
                errorField={errors.address}
                shouldReduce={shouldReduce}
              />
            </m.div>

            <m.div
              layout
              style={{ position: "relative" }}
              className="col-span-2 flex w-full flex-col gap-y-2 lg:col-span-1"
            >
              <FormRow
                {...register("houseNumber")}
                type="text"
                id="houseNumber"
                label="Civico"
                placeholder="Inserisci civico..."
                disabled={isSubmitting}
                errorField={errors.houseNumber}
                shouldReduce={shouldReduce}
              />
            </m.div>

            <m.div
              layout
              style={{ position: "relative" }}
              className="col-span-2 flex w-full flex-col gap-y-2 lg:col-span-1"
            >
              <FormRow
                {...register("zipCode")}
                type="text"
                id="zipCode"
                label="CAP"
                placeholder="Inserisci CAP..."
                disabled={isSubmitting}
                errorField={errors.zipCode}
                shouldReduce={shouldReduce}
              />
            </m.div>

            <m.div
              layout
              style={{ position: "relative" }}
              className="col-span-full flex w-full flex-col gap-y-2 lg:col-span-2"
            >
              <FormRow
                {...register("city")}
                type="text"
                id="city"
                label="Città"
                placeholder="Inserisci città..."
                disabled={isSubmitting}
                errorField={errors.city}
                shouldReduce={shouldReduce}
              />
            </m.div>

            <m.div
              layout
              style={{ position: "relative" }}
              className="col-span-full flex w-full flex-col gap-y-2 lg:col-span-2"
            >
              <FormRow
                {...register("phoneNumber")}
                type="tel"
                id="phoneNumber"
                label="Cellulare"
                placeholder="Inserisci cellulare..."
                disabled={isSubmitting}
                errorField={errors.phoneNumber}
                shouldReduce={shouldReduce}
              />
            </m.div>

            <FormButtons
              shouldReduce={shouldReduce}
              disabled={
                isSubmitting ||
                !isValid ||
                !isDirty ||
                buttonState === "loading" ||
                buttonState === "success"
              }
              defaultText="Aggiorna profilo"
              pendingText="Aggiornamento..."
              successText="Profilo aggiornato"
              widths={{
                idle: 160,
                loading: 195,
                success: 198,
              }}
            />
          </m.form>
        </MotionConfig>
      </LazyMotion>
    </>
  );
}

export default UpdateProfileForm;
