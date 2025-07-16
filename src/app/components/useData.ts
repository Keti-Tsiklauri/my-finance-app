import { useState, useEffect } from "react";

import type { Data } from "@/types/types";

export default function useData() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return data;
}
