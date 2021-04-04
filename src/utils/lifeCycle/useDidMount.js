import React, { useCallback } from 'react'

const useDidMount = (callback) => {
    React.useEffect(useCallback(() => {
        callback()
    }, [callback]), [])
}

export default useDidMount