import { useEffect } from "react";

export default function OnlineReload() {
  useEffect(() => {
    function handleOnline() {
      window.location.reload();
    }

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return null; // no UI needed
}
