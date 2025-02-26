import { AxiosError } from "axios";
import { toast } from "react-toastify";

export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  previousData: T,
  errorTitle: string
) {
  try {
    return await fn();
  } catch (error: any) {
    let errorMessage = error.message;
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.detail;
    }
    toast.error(
      <ErrorToast errorTitle={errorTitle} errorMessage={errorMessage} />,
      { position: "bottom-right" }
    );
    return previousData;
  }
}

function ErrorToast({
  errorTitle,
  errorMessage,
}: {
  errorTitle: string;
  errorMessage: string;
}) {
  return (
    <div>
      <h1>{errorTitle}</h1>
      <p>{errorMessage}</p>
    </div>
  );
}
