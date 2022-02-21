/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import { useRef, useEffect } from 'react';

// assets
import imgJet from '../../../assets/jet-black.webp';

// utils
import { clearCanvas, drawBullets, drawJets } from '../utils/canvas';

// styles
import styles from './Game.module.scss';

const draw = (ctx, stateGame, imagesJet) => {
  clearCanvas(ctx);
  drawBullets(ctx, stateGame);
  drawJets(ctx, stateGame, imagesJet);
};

const Game = ({ stateGame }) => {
  console.log('Render: <Game />');
  const refCanvas = useRef();
  const imagesJet = useRef(null);

  useEffect(() => {
    if (!stateGame.settings.idLobby) return;

    const imgJetOwner = new Image();
    imgJetOwner.src = imgJet;

    const imgJetJoiner = new Image();
    imgJetJoiner.src = imgJet;

    imagesJet.current = {
      imgJetOwner,
      imgJetJoiner,
    };
  }, []);

  useEffect(() => {
    if (!stateGame.settings.idLobby) return;

    const canvas = refCanvas.current;
    const context = canvas.getContext('2d');
    let idRequestAnimationFrame;

    const render = () => {
      draw(context, stateGame, imagesJet.current);
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
