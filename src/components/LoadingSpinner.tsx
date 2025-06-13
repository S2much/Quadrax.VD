interface LoadingSpinnerProps {
  isLoading: boolean;
}

function LoadingSpinner({ isLoading }: LoadingSpinnerProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black to-[#006889]">
        <div id="loader1" className="loader2"></div>
    </div>
  );
}

export default LoadingSpinner;