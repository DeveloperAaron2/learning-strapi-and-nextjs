export default function FormError({ error }: { error?: string[] }) {
  if (!error) {
      return null;
  }
  return (
    error.map((err, index) => (
      <div key={index} className="text-sm text-red-500 italic mt-1 py-2">
        {err}
      </div>
    ))
  );
}