import { useState } from "react";

const useToast = () => {
  const [toast, setToast] = useState({
    message: "",
    success: true,
    visible: false,
  });

  return [toast, setToast];
};
export default useToast;
