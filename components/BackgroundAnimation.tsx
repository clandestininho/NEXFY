import { memo } from 'react';

const BackgroundAnimation = memo(() => {
  return <div id="background-animation"></div>;
});

// Memoize to prevent re-renders on App state changes
export default BackgroundAnimation;