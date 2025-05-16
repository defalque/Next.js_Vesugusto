"use client";

import { updateUserProfile } from "@/app/_lib/actions";
import { SubmitButton } from "./SubmitButton";
import comuni from "@/app/_lib/gi_comuni_cap.json";
import comuniMulticap from "@/app/_lib/multicap.json";
import { useEffect, useRef, useState } from "react";

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
  const wrapperRef = useRef(null);
  console.log(CAP);

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

  return (
    <form
      action={updateUserProfile}
      className="px-3 text-md flex gap-4 flex-col"
    >
      <div className="space-y-2">
        <label>Nome</label>
        <input
          name="name"
          disabled
          defaultValue={name}
          className="rounded-xl px-5 py-2 w-full disabled:cursor-not-allowed disabled:bg-primary-100 disabled:text-neutral-400 dark:disabled:bg-zinc-100"
        />
      </div>

      <div className="space-y-2">
        <label>Email</label>
        <input
          name="email"
          disabled
          defaultValue={email}
          className="rounded-xl px-5 py-2 w-full disabled:cursor-not-allowed disabled:bg-primary-100 disabled:text-neutral-400 dark:disabled:bg-zinc-100"
        />
      </div>

      <div className="grid grid-cols-4 gap-x-5 space-y-2">
        <div className="col-span-3">
          <label htmlFor="via">Via</label>
          <input
            required
            name="via"
            defaultValue={via}
            className="rounded-xl px-5 py-2 bg-primary-50 w-full shadow-md shadow-primary-200 dark:shadow-primary-dark-800 inset-shadow-sm inset-shadow-primary-200 text-primary-dark-900  dark:shadow-none dark:inset-shadow-none outline-none appearance-none"
          />
        </div>

        <div>
          <label htmlFor="numeroCivico">Numero civico</label>
          <input
            required
            name="numeroCivico"
            defaultValue={numeroCivico}
            className="rounded-xl px-5 py-2 bg-primary-50 w-full shadow-md shadow-primary-200 dark:shadow-primary-dark-800 inset-shadow-sm inset-shadow-primary-200 text-primary-dark-900 dark:shadow-none dark:inset-shadow-none outline-none"
          />
        </div>

        <div ref={wrapperRef} className="col-span-2 relative">
          <label htmlFor="comune">Comune</label>
          <input
            required
            name="comune"
            className="rounded-xl px-5 py-2 bg-primary-50 w-full shadow-md shadow-primary-200 dark:shadow-primary-dark-800 inset-shadow-sm inset-shadow-primary-200 text-primary-dark-900 dark:shadow-none dark:inset-shadow-none outline-none"
            value={query}
            // onChange={(e) => setQuery(e.target.value)}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-20 text-primary-950 dark:text-primary-dark-200 dark:hover:text-primary-dark-200 bg-primary-50 border border-primary-200 w-full shadow -mt-1 overflow-y-auto max-h-36">
              {suggestions.map((comune, index) => (
                <li
                  key={index}
                  className="text-sm px-4 py-2 dark:hover:bg-primary-dark-200 hover:bg-primary-950 hover:text-primary-100 cursor-pointer"
                  onClick={() => handleSelectComune(comune)}
                >
                  {comune.denominazione_ita}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label htmlFor="cap">CAP</label>
          <input
            required
            name="cap"
            value={cap}
            onChange={() => setCap(e.target.value)}
            className="rounded-xl px-5 py-2 bg-primary-50 w-full shadow-md shadow-primary-200 dark:shadow-primary-dark-800 inset-shadow-sm inset-shadow-primary-200 text-primary-dark-900 dark:shadow-none dark:inset-shadow-none outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phoneNumber">Il tuo numero di telefono</label>
        <input
          required
          name="phoneNumber"
          defaultValue={phoneNumber}
          className="rounded-xl px-5 py-2 bg-primary-50 w-full shadow-md shadow-primary-200 dark:shadow-primary-dark-800 inset-shadow-sm inset-shadow-primary-200 text-primary-dark-900 dark:shadow-none dark:inset-shadow-none outline-none"
        />
      </div>

      <SubmitButton></SubmitButton>
    </form>
  );
}

export default UpdateProfileForm;
