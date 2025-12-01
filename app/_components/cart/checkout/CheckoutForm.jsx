"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "@/app/_lib/schemas/updateProfileSchema";

import { useFormButtonsContext } from "@/app/_contexts/FormButtonsContext";

import { updateUserProfile } from "@/app/_lib/actions";

import { showCustomErrorToast } from "../../ui/CustomToast";

import FormRow from "../../account/FormRow";
import FormButtons from "../../account/FormButtons";

import * as m from "motion/react-m";
import { LazyMotion, MotionConfig, AnimatePresence } from "motion/react";
import useMeasure from "react-use-measure";
const loadFeatures = () =>
  import("../../../_lib/features").then((res) => res.default);

function CheckoutForm({ address, houseNumber, zipCode, city, phoneNumber }) {
  const [ref, bounds] = useMeasure();
  const { buttonState, setButtonState } = useFormButtonsContext();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    values: {
      address: address || "",
      houseNumber: houseNumber || "",
      zipCode: zipCode || "",
      city: city || "",
      phoneNumber: phoneNumber || "",
    },
    resolver: zodResolver(updateProfileSchema),
  });

  const onSubmit = async (data) => {
    try {
      setButtonState("loading");
      const result = await updateUserProfile(data);
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

    // setButtonState("loading");
    // setTimeout(() => {
    //   setButtonState("success");
    // }, 1750);
    // setTimeout(() => {
    //   setButtonState("idle");
    // }, 3500);
  };

  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.3 }}>
        <m.form
          layout
          initial={{ height: bounds.height }}
          animate={{ height: bounds.height }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            ref={ref}
            className="xs:grid-cols-4 grid grid-cols-1 grid-rows-[auto_auto] gap-4 text-sm font-normal md:text-base"
          >
            <m.div layout className="col-span-3 flex flex-col gap-y-2">
              <FormRow
                {...register("address")}
                type="text"
                id="address"
                label="Indirizzo"
                placeholder="Inserisci indirizzo..."
                disabled={isSubmitting}
                errorField={errors.address}
              />
            </m.div>

            <m.div
              layout
              className="xs:col-span-1 col-span-3 flex flex-col gap-y-2"
            >
              <FormRow
                {...register("houseNumber")}
                type="text"
                id="houseNumber"
                label="Civico"
                placeholder="Inserisci civico..."
                disabled={isSubmitting}
                errorField={errors.houseNumber}
              />
            </m.div>

            <m.div layout className="col-span-3 flex flex-col gap-y-2">
              <FormRow
                {...register("city")}
                type="text"
                id="city"
                label="Città"
                placeholder="Inserisci città..."
                disabled={isSubmitting}
                errorField={errors.city}
              />
            </m.div>

            <m.div
              layout
              className="xs:col-span-1 col-span-3 flex flex-col gap-y-2"
            >
              <FormRow
                {...register("zipCode")}
                type="text"
                id="zipCode"
                label="CAP"
                placeholder="Inserisci CAP..."
                disabled={isSubmitting}
                errorField={errors.zipCode}
              />
            </m.div>

            <m.div layout className="col-span-full flex flex-col gap-y-2">
              <FormRow
                {...register("phoneNumber")}
                type="tel"
                id="phoneNumber"
                label="Cellulare"
                placeholder="Inserisci cellulare..."
                disabled={isSubmitting}
                errorField={errors.phoneNumber}
              />
            </m.div>

            {/* <AnimatePresence initial={false} mode="popLayout"> */}
            {(isDirty ||
              buttonState === "loading" ||
              buttonState === "success") && (
              <m.div
                // key={buttonState}
                // initial={{ opacity: 0, y: -30 }}
                // animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, y: -30 }}
                className="col-span-full"
              >
                <FormButtons
                  isSubmitting={isSubmitting}
                  disabled={
                    isSubmitting ||
                    !isDirty ||
                    !isValid ||
                    buttonState === "loading" ||
                    buttonState === "success"
                  }
                  defaultText="Modifica informazioni"
                  pendingText="Modifica in corso..."
                  successText="Modifiche salvate"
                  widths={{
                    idle: 210,
                    loading: 205,
                    success: 210,
                  }}
                />
              </m.div>
            )}
            {/* </AnimatePresence> */}
          </div>
        </m.form>
      </MotionConfig>
    </LazyMotion>
  );
}

export default CheckoutForm;
