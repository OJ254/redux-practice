// src/components/ui/feedback/Spinner/BigSpinner.tsx

'use client'; // Marks this component as a Client Component in Next.js

// React hooks for state management and side effects
import { useEffect, useState } from 'react';
// Next.js Image component for optimized image loading
import Image from 'next/image';
// Import the spinner GIF asset
import spinnerGif from '@/assets/images/big-spinner.gif';

/**
 * Interface defining the props for the BigSpinner component
 * @interface SpinnerProps
 * @property {number} [size=80] - The width and height of the spinner in pixels
 * @property {string} [alt='Loading...'] - Alternative text for accessibility
 * @property {string} [className=''] - Additional CSS classes to apply to the spinner
 * @property {boolean} [fullscreen=true] - Whether to display the spinner in a fullscreen overlay
 */
interface SpinnerProps {
  size?: number;
  alt?: string;
  className?: string;
  fullscreen?: boolean;
}

/**
 * BigSpinner Component
 *
 * A larger loading spinner component with an optional fullscreen overlay.
 * Features a fade-in animation on mount and uses the Next.js Image component
 * for optimal performance.
 *
 * @component
 * @param {SpinnerProps} props - The component props
 * @param {number} [props.size=80] - The width and height of the spinner in pixels
 * @param {string} [props.alt='Loading...'] - Alternative text for accessibility
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @param {boolean} [props.fullscreen=true] - Whether to display in fullscreen overlay
 *
 * @example
 * // Basic fullscreen usage
 * <Spinner />
 *
 * @example
 * // Inline spinner without fullscreen overlay
 * <Spinner fullscreen={false} size={40} />
 */
const Spinner = ({
  size = 80,
  alt = 'Loading...',
  className = '',
  fullscreen = true,
}: SpinnerProps) => {
  // State to control the fade-in animation
  const [visible, setVisible] = useState(false);

  /**
   * Effect to handle the fade-in animation on mount
   * Adds a small delay to ensure the transition is visible
   */
  useEffect(() => {
    // Trigger fade-in on mount
    const timer = setTimeout(() => setVisible(true), 5);
    return () => clearTimeout(timer);
  }, []);

  // CSS classes for fade-in animation
  const baseClass = 'transition-opacity duration-100 ease-in-out opacity-0';
  const activeClass = visible ? 'opacity-100' : '';

  /**
   * The core spinner image element
   * Used both in fullscreen and non-fullscreen modes
   */
  const imageElement = (
    <Image
      src={spinnerGif}
      alt={alt}
      width={size}
      height={size}
      priority // Marks this image as high priority for loading
      unoptimized
      className={`inline-block ${className}`}
    />
  );

  // Return just the image element if not in fullscreen mode
  if (!fullscreen) return imageElement;

  /**
   * Fullscreen overlay wrapper
   * Includes backdrop blur and semi-transparent background
   */
  return (
    <div
      className={`bg-body-light/60 dark:bg-body-dark/60 fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm ${baseClass} ${activeClass}`}
    >
      {imageElement}
    </div>
  );
};

export default Spinner;
