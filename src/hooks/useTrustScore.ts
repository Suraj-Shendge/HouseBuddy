import { useMemo } from 'react';
import { Worker, TrustScoreDetails } from '../types';

export const useTrustScore = (worker: Worker): TrustScoreDetails => {
  return useMemo(() => {
    const ratingWeight = worker.avg_rating * 20;
    const jobsWeight = Math.min((worker.completed_jobs || 0) / 5, 100) * 0.5;
    const responseWeight = worker.response_speed || 85;
    
    const overall = Math.round(
      (ratingWeight * 0.4) + (jobsWeight * 0.35) + (responseWeight * 0.25)
    );
    
    let badge: 'high' | 'medium' | 'low';
    if (overall >= 85) badge = 'high';
    else if (overall >= 60) badge = 'medium';
    else badge = 'low';
    
    return {
      overall,
      rating_weight: Math.round(ratingWeight),
      jobs_weight: Math.round(jobsWeight),
      response_speed_weight: Math.round(responseWeight),
      badge,
      progress: overall,
    };
  }, [worker]);
};

export const getTrustBadgeColor = (badge: 'high' | 'medium' | 'low'): string => {
  const colors = {
    high: '#34C759',
    medium: '#FF9500',
    low: '#FF3B30',
  };
  return colors[badge];
};

export const getTrustBadgeLabel = (badge: 'high' | 'medium' | 'low'): string => {
  const labels = {
    high: 'Highly Trusted',
    medium: 'Moderately Trusted',
    low: 'New Provider',
  };
  return labels[badge];
};
