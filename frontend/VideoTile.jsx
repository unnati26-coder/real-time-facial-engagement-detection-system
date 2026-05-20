import React, { useEffect, useRef } from 'react'

export default function VideoTile({ stream, className }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream || null
  }, [stream])
  return (
    <video ref={ref} autoPlay muted playsInline className={className} />
  )
}



