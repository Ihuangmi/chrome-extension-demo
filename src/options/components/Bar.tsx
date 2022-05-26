import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';

const Text = () => {
  const [flip, set] = useState(false)
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    // config: config.molasses,
    onRest: () => set(!flip),
  })

  return <animated.h1 style={props}>hello</animated.h1>
}

const ChainExample = () => {
  const styles = useSpring({
    loop: true,
    to: [
      { opacity: 1, color: "#ffaaee" },
      { opacity: 0, color: "rgb(14,26,19)" },
    ],
    from: { opacity: 0, color: "red" },
  })
  return <animated.div style={styles}>I will fade in and out</animated.div>
}

const App = () => {
  return (
    <>
      <ChainExample />
      <Text />
    </>
  )
}
export default App
