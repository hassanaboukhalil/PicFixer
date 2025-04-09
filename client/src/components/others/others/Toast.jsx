import { X } from "lucide-react";

const Toast = ({ toast, setToast }) => {
  return (
    <>
      {toast.visible && (
        <div
          className={`toast-notification ${
            toast.success ? "toast-success" : "toast-error"
          }`}
        >
          <div className="flex justify-between w-full">
            <h4 className="font-bold">{toast.success ? "Success" : "Error"}</h4>
            <div
              className="flex justify-end cursor-pointer"
              onClick={() => setToast({ ...toast, visible: false })}
            >
              <X />
            </div>
          </div>
          <p className="text-body4">{toast.message}</p>
        </div>
      )}
    </>
  );
};
export default Toast;
