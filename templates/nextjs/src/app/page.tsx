import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
            Scalix App
          </div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
            {{project-name}}
          </h1>
          <p className="mt-2 text-gray-500">
            A modern Next.js application built with TypeScript and Tailwind CSS
          </p>
        </div>
        <div className="p-8 bg-gray-50">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Count: {count}
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Edit <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">src/app/page.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </main>
  )
}
