import { useEffect, useState } from 'react';
import { Search, Users, ArrowRight, X } from 'lucide-react';
import { useCommunityStore } from '../store/communityStore';
import { CommunityPreview } from '../types';
import CommunityCard from '../components/community/CommunityCard';
import { Triangle } from 'lucide-react';

const ExplorePage = () => {
  const { communities, fetchCommunities, loading } = useCommunityStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCommunities, setFilteredCommunities] = useState<CommunityPreview[]>([]);
  
  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCommunities(communities);
    } else {
      const filtered = communities.filter(community => 
        community.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCommunities(filtered);
    }
  }, [searchTerm, communities]);
  
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Triangle size={48} className="text-primary-600" fill="currentColor" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Komune</h1>
        <p className="text-lg text-neutral-600">Humanity's Most Valuable Social Space</p>
      </div>
      
      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
        <input
          type="text"
          placeholder="Search communities"
          className="input pl-10 pr-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
            onClick={() => setSearchTerm('')}
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex items-center">
          <Users size={20} className="text-primary-600 mr-2" />
          <h2 className="text-xl font-semibold">Explore communities</h2>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-neutral-100 rounded-lg h-48"></div>
          ))}
        </div>
      ) : filteredCommunities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-neutral-600">No communities found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCommunities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center">
        <button className="btn-outline inline-flex items-center">
          <span>View more communities</span>
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ExplorePage;