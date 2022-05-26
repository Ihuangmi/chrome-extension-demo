import 'video.js/dist/video-js.css'

import React from 'react'
import videojs from 'video.js'

interface VideoJsOptions {
  autoplay: boolean
  controls: boolean
  responsive: boolean
  fluid: boolean
  sources: {
    src: string
    type: string
  }[]
}

export const VideoJS = (props: { options: VideoJsOptions; onReady: (player: any) => void }) => {
  const videoRef = React.useRef<any>(null)
  const playerRef = React.useRef<any>(null)
  const { options, onReady } = props

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current

      if (!videoElement) return

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready')
        onReady && onReady(player)
      }))
    } else {
      playerRef.current.autoplay(options.autoplay)
      playerRef.current.src(options.sources)
    }
  }, [options, videoRef])

  React.useEffect(() => {
    const player: any = playerRef.current

    return () => {
      if (player) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  )
}
let url = 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4'

const App = () => {
  const playerRef = React.useRef(null)

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: url,
        type: 'video/mp4',
      },
    ],
    playbackRates: [0.5, 1, 1.5, 2],
  }

  const handlePlayerReady = (player: any) => {
    playerRef.current = player

    player.on('waiting', () => {
      player.log('player is waiting')
    })

    player.on('dispose', () => {
      player.log('player will dispose')
    })
  }

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </>
  )
}
export default App
