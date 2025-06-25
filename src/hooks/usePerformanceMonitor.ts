
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  fcp: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Measure Core Web Vitals
    const measureLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }
    };

    const measureFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
      }
    };

    const measureCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      }
    };

    const measureNavigationTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', () => {
          setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            setMetrics(prev => ({
              ...prev,
              ttfb: navigation.responseStart - navigation.requestStart,
              fcp: navigation.domContentLoadedEventEnd - navigation.navigationStart
            }));
            setIsLoading(false);
          }, 0);
        });
      }
    };

    measureLCP();
    measureFID();
    measureCLS();
    measureNavigationTiming();

    // Cache management
    const cacheKey = 'performance-metrics';
    const cachedMetrics = localStorage.getItem(cacheKey);
    if (cachedMetrics) {
      setMetrics(JSON.parse(cachedMetrics));
    }

    return () => {
      localStorage.setItem(cacheKey, JSON.stringify(metrics));
    };
  }, []);

  return { metrics, isLoading };
};
