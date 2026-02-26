export const fallbackError = ({ error, resetErrorBoundary }: any) => (
  <div className="w-full flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-2xl font-bold text-red">Oops! Something went wrong.</h1>
    <p className="mt-2 text-textSecondary">(Error Message: {error.message})</p>
    <button onClick={resetErrorBoundary} className="mt-4 px-4 py-2 bg-primary text-white hover:text-white hover:bg-primary rounded-lg">
      Try Again
    </button>
  </div>
);
