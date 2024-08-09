
export default function Home() {
  return (
    <main className="flex flex-row h-screen bg-gray-100">
      <div>
        侧边框
      </div>
      <div className="flex-1 p-4" >
        <h1 className="text-blue-600 text-4xl font-bold mb-6">
          今天
        </h1>
        <div className="bg-white flex h-5/6">
         <div className="w-1/2">
          早上
        </div>
        <div className="w-1/2">
          上午
        </div>
        <div className="w-1/2">
          下午
        </div>
        <div className="w-1/2">
          晚上
        </div> 
        </div>
      </div>
        
        
    </main>
  );
}
