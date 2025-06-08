export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">
        Generating Code...
      </div>
    </div>
  );
}