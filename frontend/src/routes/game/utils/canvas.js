/* eslint-disable no-use-before-define */
const clearCanvas = (ctx) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const drawBullets = (ctx, stateGame) => {
  const { owner, joiner } = stateGame;

  for (let i = 0; i < owner.bullets.length; i += 1) {
    ctx.fillStyle = owner.bullets[i].color;
    ctx.fillRect(owner.bullets[i].x, owner.bullets[i].y, 4, 4);
  }

  for (let i = 0; i < joiner.bullets.length; i += 1) {
    ctx.fillStyle = joiner.bullets[i].color;
    ctx.fillRect(joiner.bullets[i].x, joiner.bullets[i].y, 4, 4);
  }
};

const drawJets = (ctx, stateGame, imagesJet) => {
  const { owner, joiner } = stateGame;
  const { imgJetOwner, imgJetJoiner } = imagesJet;

  drawJet(ctx, owner, imgJetOwner);
  drawJet(ctx, joiner, imgJetJoiner);
};

const drawJet = (ctx, stateGamePlayer, imgJet) => {
  const { scale, x, y } = stateGamePlayer;

  // just works
  const rad = -((stateGamePlayer.angle * Math.PI) / 180 + Math.PI);

  // sets scale and origin
  ctx.setTransform(scale, 0, 0, scale, x, y);
  ctx.rotate(rad);
  ctx.drawImage(imgJet, -imgJet.width / 2, -imgJet.height / 2);
};

export { clearCanvas, drawBullets, drawJets };
