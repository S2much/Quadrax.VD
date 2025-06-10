interface LoadingSpinnerProps {
  isLoading: boolean;
}

function LoadingSpinner({ isLoading }: LoadingSpinnerProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div id="loader1" className="loader1">
        <div id="loader2" className="loader2"></div>
      </div>

    </div>
  );
}

export default LoadingSpinner;