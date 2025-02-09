"use client";

export default function FormButton({
  type,
  pending,
}: {
  type: string;
  pending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-d mx-auto my-3 h-[43px] w-full rounded-md border-none bg-black font-bold tracking-wider text-gray-200 outline-none transition-all duration-200 ease-in hover:shadow-lg hover:shadow-neutral-700 disabled:contrast-75"
    >
      {type}
    </button>
  );
}
