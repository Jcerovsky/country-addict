import { useContext } from "react";
import { Context } from "../Context";

function ErrorMessage() {
  const { errMsg, setErrMsg } = useContext(Context)!;
  return (
    <div className="relative bg-red-600 shadow-md rounded-md p-2 text-center w-1/2 ml-auto mr-auto text-black">
      <h1>{errMsg}</h1>
      <p
        className="absolute bottom-5 right-1 cursor-pointer hover:text-white"
        onClick={() => setErrMsg("")}
      >
        x
      </p>
    </div>
  );
}

export default ErrorMessage;
