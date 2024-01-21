import { useId, useState } from "react";

const useCustomId = () => {
  if (typeof useId !== 'function') {
    throw new Error("useCustomId must be used within a React functional component");
  }
  const [customId,] = useState (useId());
  return customId;
};

export default useCustomId;
