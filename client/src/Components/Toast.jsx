import { ToastContainer } from "react-toastify";

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      newestOnTop={false}
      rtl={false}
      draggable
      theme="dark"
      toastClassName="!bg-[#1f150c] !text-[#e1dcc9] !border !border-[#412d15] !rounded-2xl !font-lato-regular !shadow-[0_10px_35px_rgba(12,12,12,0.35)]"
      bodyClassName="!text-[#e1dcc9] !font-sora !text-sm"
      progressClassName="!bg-[#e1dcc9]"
    />
  );
};

export default Toast;
