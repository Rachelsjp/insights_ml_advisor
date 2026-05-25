import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-6 text-white">

        <h1 className="text-3xl font-bold mb-4">
          Dashboard 🚀
        </h1>

        <p className="text-gray-400 mb-6">
          Welcome to your ML Advisor platform
        </p>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold">Total Queries</h2>
            <p className="text-2xl mt-2 text-purple-400">12</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold">RAG Responses</h2>
            <p className="text-2xl mt-2 text-green-400">8</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold">Web Responses</h2>
            <p className="text-2xl mt-2 text-blue-400">4</p>
          </div>

        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">
            About ML Advisor
          </h2>
          <p className="text-gray-400">
            This platform helps you understand machine learning concepts using AI-powered RAG and web-based responses.
          </p>
        </div>

      </div>
    </Layout>
  );
}