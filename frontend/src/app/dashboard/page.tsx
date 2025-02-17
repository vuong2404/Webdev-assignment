"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="m-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to G-scores</h1>
      <div className="w-50 flex gap-8">
        <button
          onClick={() => router.push("/search_score")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Search Score
        </button>
        <button
          onClick={() => router.push("/reports")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Xem Reports
        </button>
      </div>
    </div>
  );
}
