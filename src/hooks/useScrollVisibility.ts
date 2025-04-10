'use client';

import { useState, useEffect } from 'react';

export default function useScrollVisibility(footerOffset = 120) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // 检查是否在移动设备上
      const isMobile = window.innerWidth <= 768;
      
      if (!isMobile) {
        setIsVisible(true);
        return;
      }
      
      setIsScrolling(true);
      setIsVisible(false);
      
      // 检查是否接近底部
      const scrollPosition = window.scrollY + window.innerHeight;
      const nearBottom = document.body.offsetHeight - scrollPosition < footerOffset;
      setIsAtBottom(nearBottom);
      
      // 清除之前的定时器
      clearTimeout(scrollTimeout);
      
      // 设置新的定时器，停止滚动后显示按钮
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        if (!nearBottom) {
          setIsVisible(true);
        }
      }, 500);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [footerOffset]);
  
  return { isVisible: isVisible && !isAtBottom, isScrolling, isAtBottom };
}
