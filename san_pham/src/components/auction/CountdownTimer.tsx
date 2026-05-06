'use client';

import { useState, useEffect } from 'react';
import { formatTimeLeft } from '@/lib/utils';
import styles from './CountdownTimer.module.css';

interface CountdownTimerProps {
  endTime: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CountdownTimer({ endTime, size = 'md' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(endTime));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  if (!isMounted) {
    return (
      <div className={`${styles.countdown} ${styles[size]}`}>
        <div className={styles.unit}><span className={styles.value}>--</span></div>
        <span className={styles.separator}>:</span>
        <div className={styles.unit}><span className={styles.value}>--</span></div>
        <span className={styles.separator}>:</span>
        <div className={styles.unit}><span className={styles.value}>--</span></div>
      </div>
    );
  }

  if (timeLeft.total === 0) {
    return (
      <div className={`${styles.countdown} ${styles[size]} ${styles.ended}`}>
        <span className={styles.endedText}>Đã kết thúc</span>
      </div>
    );
  }

  return (
    <div className={`${styles.countdown} ${styles[size]} ${timeLeft.isUrgent ? styles.urgent : ''}`}>
      {timeLeft.days > 0 && (
        <div className={styles.unit}>
          <span className={styles.value}>{String(timeLeft.days).padStart(2, '0')}</span>
          <span className={styles.label}>Ngày</span>
        </div>
      )}
      {timeLeft.days > 0 && <span className={styles.separator}>:</span>}
      <div className={styles.unit}>
        <span className={styles.value}>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className={styles.label}>Giờ</span>
      </div>
      <span className={styles.separator}>:</span>
      <div className={styles.unit}>
        <span className={styles.value}>{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className={styles.label}>Phút</span>
      </div>
      <span className={styles.separator}>:</span>
      <div className={styles.unit}>
        <span className={styles.value}>{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className={styles.label}>Giây</span>
      </div>
    </div>
  );
}
