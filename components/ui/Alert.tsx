// components/ui/Alert.tsx (ejemplo)
type AlertType = "success" | "error" | "info" | "warning";

export function Alert({ type, message }: { type: AlertType; message: string }) {
  const colorMap = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    warning: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className={`p-4 rounded-md ${colorMap[type]}`}>
      {message}
    </div>
  );
}