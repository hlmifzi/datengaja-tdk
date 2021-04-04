import React, { useCallback } from 'react';

function useWillUnmount(callback) {
    React.useEffect(useCallback(() => {
        // returned function will be called on component unmount
        return () => {
            callback();
        };
    }, [callback]), []);
}

export default useWillUnmount;
