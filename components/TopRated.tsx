import React from 'react';
import { SEARCH_RESULTS } from '../constants';
import { Desk } from '../types';
import WorkspaceCard from './WorkspaceCard';
import Skeleton from './Skeleton';

interface Props {
  onDeskClick?: (desk: Desk) => void;
  onViewAllClick?: () => void;
  isLoading?: boolean;
}

const TopRated: React.FC<Props> = ({ onDeskClick, onViewAllClick, isLoading }) => {
  return (
    <section className="bg-[#E1E8E0]/30 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              {isLoading ? <Skeleton className="h-9 w-64" /> : "Top Rated Desks Today"}
            </h2>
            <p className="text-gray-500">
              {isLoading ? <Skeleton className="h-4 w-48" /> : "Exceptional spaces vetted by our community."}
            </p>
          </div>
          {!isLoading && (
            <button 
              onClick={onViewAllClick}
              className="text-sm font-semibold underline underline-offset-4 hover:text-gray-600 transition-colors"
            >
              View all
            </button>
          )}
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {isLoading ? (
            [...Array(4)].map((_, i) => <WorkspaceCard key={i} isLoading />)
          ) : (
            SEARCH_RESULTS.slice(0, 12).map((desk) => (
              <WorkspaceCard 
                key={desk.id} 
                desk={desk} 
                onClick={(d) => onDeskClick?.(d)} 
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TopRated;