export default function CreateCampaignLoading() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
      
      <div className="space-y-6">
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
        
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-24 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
        
        <div>
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
        
        <div>
          <div className="h-5 w-36 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
        
        <div>
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mt-1"></div>
        </div>
        
        <div className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
      </div>
    </div>
  );
}