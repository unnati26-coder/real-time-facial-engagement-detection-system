import React, { useEffect, useMemo, useRef, useState } from 'react'
import VideoTile from './VideoTile'

function useCamera() {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [ready, setReady] = useState(false)
  const start = async () => {
    const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    setStream(s)
    if (videoRef.current) videoRef.current.srcObject = s
    setReady(true)
  }
  const stop = () => {
    if (stream) stream.getTracks().forEach(t => t.stop())
    setStream(null)
    setReady(false)
    if (videoRef.current) videoRef.current.srcObject = null
  }
  return { videoRef, stream, ready, start, stop }
}

function useStudents(count) {
  const names = ['Alex','Jordan','Taylor','Sam','Casey','Riley','Avery','Drew','Morgan','Jamie']
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: `s${i}`,
    name: names[i % names.length],
    engaged: Math.random() > 0.3,
  })), [count])
}

function useEngagementSocket(onUpdate) {
  useEffect(() => {
    let ws
    const url = `ws://localhost:8765` // Python server emits { studentId, seeing }
    try {
      ws = new WebSocket(url)
      ws.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data)
          // Expect: { studentId: 's0', seeing: true }
          if (data && typeof data.seeing === 'boolean') onUpdate(data)
        } catch {}
      }
    } catch {}
    return () => { try { ws && ws.close() } catch {} }
  }, [onUpdate])
}

export default function App() {
  const { videoRef, stream, ready, start, stop } = useCamera()
  const [students, setStudents] = useState(() => useStudents(6))
  const [focusedId, setFocusedId] = useState('s0')
  const focused = students.find(s => s.id === focusedId) || students[0]

  // Receive engagement from Python and only map to behaviour "seeing"
  useEngagementSocket(({ studentId, seeing }) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, engaged: !!seeing } : s))
  })

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream
  }, [stream])

  const borderColor = focused?.engaged ? '0 255 0' : '255 0 0'

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100" style={{ ['--engagement']: borderColor }}>
      <div className="app-border border-[10px]" style={{ borderColor: `rgb(${borderColor})` }}>
        <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-slate-800 bg-slate-950/80 px-4 py-2 backdrop-blur">
          <strong className="text-base">Teacher View</strong>
          <div className="ml-auto flex items-center gap-2">
            {!ready ? (
              <button onClick={start} className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 hover:bg-slate-700">Start Camera</button>
            ) : (
              <button onClick={stop} className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 hover:bg-slate-700">Stop Camera</button>
            )}
          </div>
        </div>

        <div className="grid h-[calc(100vh-52px)] grid-cols-3">
          <section className="col-span-2 relative flex items-center justify-center bg-black">
            <VideoTile stream={stream} className="h-full w-full object-cover" />
            <div className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-sm">{focused?.name || 'You'}</div>
          </section>
          <aside className="col-span-1 grid grid-rows-[auto_1fr] border-l border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
              <div>Students</div>
              <div className="text-slate-400">{students.length}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 overflow-auto p-3">
              {students.map(s => (
                <button key={s.id} onClick={() => setFocusedId(s.id)} className="group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950 text-left">
                  <VideoTile stream={stream} className="block h-28 w-full bg-black object-cover" />
                  <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full shadow-[0_0_0_2px_rgba(0,0,0,0.5)]" style={{ backgroundColor: s.engaged ? '#22c55e' : '#ef4444' }} />
                  <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs">{s.name}</div>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}


