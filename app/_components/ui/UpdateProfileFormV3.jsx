"use client";

import { updateUserProfile } from "@/app/_lib/actions";
import { SubmitButton } from "./SubmitButton";
import comuni from "@/app/_lib/gi_comuni_cap.json";
import comuniMulticap from "@/app/_lib/multicap.json";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { updateProfileSchema } from "@/app/_lib/schemas/updateProfileSchema";

function UpdateProfileForm({ user }) {
  const {
    name,
    email,
    via,
    numeroCivico,
    comune,
    cap: CAP,
    phoneNumber,
  } = user;

  const [query, setQuery] = useState(comune || "");
  const [cap, setCap] = useState(CAP || "");
  const [hasInputChanged, setHasInputChanged] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [formError, setFormError] = useState({ comune: "", cap: "" });
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (hasInputChanged && query.length >= 2) {
      const uniqueFiltered = [];
      const seenComuni = [];

      comuni
        .filter((comune) =>
          comune.denominazione_ita.toLowerCase().startsWith(query.toLowerCase())
        )
        .forEach((comune) => {
          const nomeComune = comune.denominazione_ita.toLowerCase();
          if (!seenComuni.includes(nomeComune) && uniqueFiltered.length < 100) {
            uniqueFiltered.push(comune);
            seenComuni.push(nomeComune);
          }
        });

      setSuggestions(uniqueFiltered);

      if (
        uniqueFiltered.length === 1 &&
        uniqueFiltered[0].denominazione_ita.toLowerCase() ===
          query.toLowerCase()
      ) {
        handleSelectComune(uniqueFiltered[0]);
      }
    } else {
      setSuggestions([]);
    }
  }, [query, hasInputChanged, comuni]);

  const handleInputChange = (e) => {
    setFormError({ comune: "" });
    setQuery(e.target.value);
    if (!hasInputChanged) {
      setHasInputChanged(true); // Imposta il flag alla prima modifica
    }
  };

  const handleSelectComune = (comuneSelezionato) => {
    setQuery(comuneSelezionato.denominazione_ita);
    const isMulticap = comuniMulticap.some(
      (mc) =>
        mc.comune.toLowerCase() ===
        comuneSelezionato.denominazione_ita.toLowerCase()
    );
    if (!isMulticap)
      setCap(comuneSelezionato.cap); // Imposta il CAP solo se non è multicap
    else setCap(""); // O imposta un valore di default, come una stringa vuota

    setTimeout(() => {
      setSuggestions([]);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError({
      comune: "",
      cap: "",
      via: "",
      numeroCivico: "",
      phoneNumber: "",
    });

    const formData = new FormData(e.target);
    const rawData = {
      comune: formData.get("comune"),
      cap: formData.get("cap"),
      via: formData.get("via"),
      numeroCivico: formData.get("numeroCivico"),
      phoneNumber: formData.get("phoneNumber"),
    };

    const result = updateProfileSchema.safeParse(rawData);

    if (!result.success) {
      const zodErrors = result.error.format();
      setFormError({
        comune: zodErrors.comune?._errors?.[0] || "",
        cap: zodErrors.cap?._errors?.[0] || "",
        via: zodErrors.via?._errors?.[0] || "",
        numeroCivico: zodErrors.numeroCivico?._errors?.[0] || "",
        phoneNumber: zodErrors.phoneNumber?._errors?.[0] || "",
      });
      return;
    }

    const success = await updateUserProfile(formData);
    if (success) {
      toast.success("Profilo aggiornato con successo.", {
        icon: <CheckCircleIcon className="w-6 h-6 text-primary-950" />,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-5 my-8 flex gap-4 flex-col text-xs sm:text-sm md:text-base"
    >
      <div className="space-y-2 flex flex-col">
        <label className="ml-1">Nome</label>
        <input
          name="name"
          disabled
          defaultValue={name}
          className="rounded-xl px-5 py-2 w-full disabled:cursor-not-allowed disabled:bg-primary-100 disabled:text-neutral-400 dark:disabled:bg-zinc-700"
        />
      </div>

      <div className="space-y-2 flex flex-col">
        <label className="ml-1">Email</label>
        <input
          name="email"
          disabled
          defaultValue={email}
          className="rounded-xl px-5 py-2 w-full disabled:cursor-not-allowed disabled:bg-primary-100 disabled:text-neutral-400 dark:disabled:bg-zinc-700"
        />
      </div>

      <div className="grid grid-cols-4 gap-x-5 gap-y-4">
        <div className="col-span-4 md:col-span-3 space-y-2 flex flex-col">
          <label htmlFor="via" className="ml-1">
            Via
          </label>
          <input
            required
            name="via"
            defaultValue={via}
            className="font-light rounded-xl px-2 md:px-5 py-2 bg-primary-50 dark:border-dark-200 dark:bg-dark-300 border border-gray-300 w-full outline-primary-950 dark:outline-gray-700 appearance-none"
          />
          {formError.via && (
            <p className="text-sm mb-1 -mt-1 text-primary-950 dark:text-primary-800">
              {formError.via}
            </p>
          )}
        </div>

        <div className="space-y-2 flex flex-col">
          <label htmlFor="numeroCivico" className="ml-1">
            Civico
          </label>
          <input
            required
            name="numeroCivico"
            defaultValue={numeroCivico}
            className="font-light rounded-xl px-2 md:px-5 py-2 bg-primary-50 dark:border-dark-200 dark:bg-dark-300 border border-gray-300 w-full outline-primary-950 dark:outline-gray-700 appearance-none"
          />
          {formError.numeroCivico && (
            <p className="text-sm mb-1 -mt-1 text-primary-950 dark:text-primary-800">
              {formError.numeroCivico}
            </p>
          )}
        </div>

        <div
          ref={wrapperRef}
          className="col-span-2 relative flex flex-col space-y-2"
        >
          <label htmlFor="comune" className="ml-1">
            Comune
          </label>
          <div className="relative">
            <input
              required
              name="comune"
              className={`font-light px-2 md:px-5 py-2 bg-primary-50 dark:border-dark-200 dark:bg-dark-300 border border-gray-300 w-full outline-primary-950 dark:outline-gray-700 appearance-none ${
                suggestions.length > 0 ? " rounded-t-xl" : "rounded-xl"
              }`}
              value={query}
              // onChange={(e) => setQuery(e.target.value)}
              onChange={handleInputChange}
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 text-primary-950 bg-primary-50 border border-primary-200 dark:bg-dark-300 dark:text-primary-50 dark:border-dark-200 w-full shadow -mt-1 overflow-y-auto max-h-36">
                {suggestions.map((comune, index) => (
                  <li
                    key={index}
                    className="font-light text-sm px-4 py-2 dark:hover:bg-dark-200 hover:bg-primary-950 hover:text-primary-100 cursor-pointer"
                    onClick={() => handleSelectComune(comune)}
                  >
                    {comune.denominazione_ita}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {formError.comune && (
            <p className="text-sm mb-1 -mt-1 text-primary-950 dark:text-primary-800">
              {formError.comune}
            </p>
          )}
        </div>

        <div className="space-y-2 flex flex-col">
          <label htmlFor="cap" className="ml-1">
            CAP
          </label>
          <input
            required
            name="cap"
            value={cap}
            onChange={(e) => {
              setFormError({ cap: "" });
              setCap(e.target.value);
            }}
            className="font-light rounded-xl px-2 md:px-5 py-2 bg-primary-50 dark:border-dark-200 dark:bg-dark-300 border border-gray-300 w-full outline-primary-950 dark:outline-gray-700 appearance-none"
          />
          {formError.cap && (
            <p className="text-sm mb-1 -mt-1 text-primary-950 dark:text-primary-800">
              {formError.cap}
            </p>
          )}
        </div>
      </div>

      <div className=" space-y-2 flex flex-col">
        <label htmlFor="phoneNumber" className="ml-1">
          Il tuo numero di telefono
        </label>
        <input
          required
          name="phoneNumber"
          defaultValue={phoneNumber}
          className="font-light rounded-xl px-2 md:px-5 py-2 bg-primary-50 dark:border-dark-200 dark:bg-dark-300 border border-gray-300 w-full outline-primary-950 dark:outline-gray-700 appearance-none"
        />
        {formError.phoneNumber && (
          <p className="text-sm mb-1 -mt-1 text-primary-950 dark:text-primary-800">
            {formError.phoneNumber}
          </p>
        )}
      </div>

      <SubmitButton></SubmitButton>
      <Toaster
        toastOptions={{
          style: {
            border: "1px solid #fa5252",
          },
        }}
      ></Toaster>
    </form>
  );
}

export default UpdateProfileForm;
