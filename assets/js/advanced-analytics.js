/* Advanced Analytics & Tracking Events */

(function() {
  'use strict';

  // Initialize custom analytics
  window.customAnalytics = {
    
    // Check if analytics consent given
    hasConsent: function() {
      try {
        return localStorage.getItem('analytics_consent') === 'granted';
      } catch (e) {
        return false;
      }
    },

    // Track custom events
    trackEvent: function(eventName, eventData) {
      if (!this.hasConsent()) return;

      // Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', eventName, eventData || {});
      }

      // Also send to dataLayer if available
      if (window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ...eventData
        });
      }

      // Debug log in development
      if (process.env.NODE_ENV === 'development' || !window.location.hostname.includes('github.io')) {
        console.log('[Analytics]', eventName, eventData);
      }
    },

    // Track page view
    trackPageView: function(title, path) {
      this.trackEvent('page_view', {
        page_title: title || document.title,
        page_path: path || window.location.pathname,
        page_location: window.location.href
      });
    },

    // Track button clicks
    trackClick: function(element, label) {
      this.trackEvent('click', {
        element_text: label || element.textContent,
        element_id: element.id,
        element_class: element.className,
        element_type: element.tagName
      });
    },

    // Track link clicks
    trackLinkClick: function(href, text) {
      const isExternal = !href.includes(window.location.hostname);
      
      this.trackEvent(isExternal ? 'outbound_link' : 'internal_link', {
        link_url: href,
        link_text: text,
        is_external: isExternal
      });
    },

    // Track social clicks
    trackSocialClick: function(platform, url) {
      this.trackEvent('social_share', {
        social_platform: platform,
        social_url: url
      });
    },

    // Track file downloads
    trackDownload: function(filename, filetype) {
      this.trackEvent('file_download', {
        file_name: filename,
        file_type: filetype
      });
    },

    // Track form submissions
    trackFormSubmit: function(formId, formName) {
      this.trackEvent('form_submission', {
        form_id: formId,
        form_name: formName,
        timestamp: new Date().toISOString()
      });
    },

    // Track video engagement (if applicable)
    trackVideoPlay: function(videoId, videoTitle) {
      this.trackEvent('video_play', {
        video_id: videoId,
        video_title: videoTitle
      });
    },

    // Track scroll depth
    trackScrollDepth: function() {
      let maxScroll = 0;
      
      window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );

        // Track at 25%, 50%, 75%, 100%
        if (scrollPercent > maxScroll && (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100)) {
          maxScroll = scrollPercent;
          
          this.trackEvent('scroll_depth', {
            page_path: window.location.pathname,
            scroll_percent: scrollPercent
          });
        }
      });
    },

    // Track time on page
    trackTimeOnPage: function() {
      const pageStartTime = Date.now();
      
      window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
        
        if (timeOnPage > 2) { // Only track if spent > 2 seconds
          this.trackEvent('page_engagement', {
            page_path: window.location.pathname,
            time_seconds: timeOnPage,
            page_title: document.title
          });
        }
      });
    },

    // Track element visibility (intersection observer)
    trackElementVisibility: function(selector, eventName) {
      const elements = document.querySelectorAll(selector);
      
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.tracked) {
              entry.target.dataset.tracked = 'true';
              
              this.trackEvent(eventName, {
                element_id: entry.target.id,
                element_text: entry.target.textContent.substring(0, 100),
                visibility: 'visible'
              });
            }
          });
        }, { threshold: 0.5 });

        elements.forEach(el => observer.observe(el));
      }
    },

    // Track errors for monitoring
    trackError: function(errorMessage, errorStack) {
      this.trackEvent('javascript_error', {
        error_message: errorMessage,
        error_stack: errorStack ? errorStack.substring(0, 500) : null,
        page_path: window.location.pathname,
        user_agent: navigator.userAgent
      });
    },

    // Track performance metrics
    trackPerformance: function() {
      window.addEventListener('load', () => {
        if (window.performance && window.performance.timing) {
          const perfData = window.performance.timing;
          const loadTime = perfData.loadEventEnd - perfData.navigationStart;
          const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
          const firstPaint = perfData.responseStart - perfData.navigationStart;

          this.trackEvent('page_performance', {
            load_time_ms: loadTime,
            dom_content_loaded_ms: domContentLoadedTime,
            first_paint_ms: firstPaint,
            page_path: window.location.pathname
          });
        }

        // Core Web Vitals (if available)
        if ('web-vital' in window) {
          try {
            getCLS(metric => this.trackEvent('cls', { cls_score: metric.value }));
            getFID(metric => this.trackEvent('fid', { fid_ms: metric.value }));
            getLCP(metric => this.trackEvent('lcp', { lcp_ms: metric.value }));
          } catch (e) {
            console.warn('Web Vitals not available');
          }
        }
      });
    },

    // Initialize all auto-tracking
    initAutoTracking: function() {
      // Page view
      this.trackPageView();

      // Scroll depth
      this.trackScrollDepth();

      // Time on page
      this.trackTimeOnPage();

      // Performance metrics
      this.trackPerformance();

      // Track PDF downloads
      document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
        link.addEventListener('click', (e) => {
          this.trackDownload(
            link.href.split('/').pop(),
            'pdf'
          );
        });
      });

      // Track external links
      document.querySelectorAll('a[target="_blank"], a[rel="external"]').forEach(link => {
        link.addEventListener('click', (e) => {
          this.trackLinkClick(link.href, link.textContent);
        });
      });

      // Track social links
      document.querySelectorAll('.social-icons a, .social-share a').forEach(link => {
        link.addEventListener('click', (e) => {
          const platform = link.href.split('/')[2] || link.textContent;
          this.trackSocialClick(platform, link.href);
        });
      });

      // Track form submissions
      document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
          this.trackFormSubmit(form.id, form.name);
        });
      });

      // Track certification/achievement visibility
      this.trackElementVisibility('.achievement-card, .cert-badge', 'achievement_viewed');
      this.trackElementVisibility('[data-section-id]', 'section_viewed');

      // Global error tracking
      window.addEventListener('error', (e) => {
        this.trackError(e.message, e.stack);
      });

      // Unhandled promise rejection tracking
      window.addEventListener('unhandledrejection', (e) => {
        this.trackError('Unhandled Promise Rejection', e.reason);
      });
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.customAnalytics.initAutoTracking();
    });
  } else {
    window.customAnalytics.initAutoTracking();
  }

  // Expose for manual use
  window.trackEvent = window.customAnalytics.trackEvent.bind(window.customAnalytics);
})();
