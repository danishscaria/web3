export default function CampaignLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-64 bg-gray-300 animate-pulse"></div>
        
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          
          <div className="h-2.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
          
          <div className="mt-4 flex justify-between">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="p-6 border-b">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div className="border rounded-md p-4">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="flex space-x-2">
                <div className="h-10 bg-gray-200 rounded animate-pulse flex-1"></div>
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}