/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import { useRef, useEffect } from 'react';

// styles
import styles from './Game.module.scss';

const draw = (ctx, stateGame) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(
    50,
    100,
    20 * Math.sin(stateGame.countFrame * 0.05) ** 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
};

const Game = ({ stateGame }) => {
  console.log('Render: <Game />');
  const refCanvas = useRef();

  useEffect(() => {
    const canvas = refCanvas.current;
    const context = canvas.getContext('2d');
    let idRequestAnimationFrame;

    const render = () => {
      draw(context, stateGame);
      idRequestAnimationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(idRequestAnimationFrame);
    };
  });

  const { widthMap, heightMap } = stateGame.settings;

  return (
    <canvas
      ref={refCanvas}
      width={widthMap}
      height={heightMap}
      className={styles.game}
    >
      Game screen
    </canvas>
  );
};

export default Game;
