/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import { useRef, useEffect } from 'react';

// utils
import { clearCanvas, drawBullets, drawJets } from '../../utils/canvas';

// config
import { typesJet } from '../../../../config/typesJet';

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
    imgJetOwner.src = typesJet[stateGame.owner.typeJet].imgJet;

    const imgJetJoiner = new Image();
    imgJetJoiner.src = typesJet[stateGame.joiner.typeJet].imgJet;

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
    <div className={styles.wrapper}>
      <canvas
        ref={refCanvas}
        width={widthMap}
        height={heightMap}
        className={styles.game}
      >
        Game screen
      </canvas>
      <div className={styles.wrapperScores}>
        <div style={{ color: stateGame.owner.color }}>
          {stateGame.owner.score}
        </div>
        <div style={{ color: stateGame.joiner.color }}>
          {stateGame.joiner.score}
        </div>
      </div>
    </div>
  );
};

export default Game;
