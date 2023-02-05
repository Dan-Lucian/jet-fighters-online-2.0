import Heading from 'routes/about/components/Heading/Heading';
import Styles from 'routes/about/AboutPage.module.scss';

const AboutPage = () => (
  <main className={Styles.card}>
    <div className={Styles.innerWrapper}>
      <section className={Styles.sectionWrapper}>
        <Heading>What is this?</Heading>
        <p className={Styles.indent}>{text.whatIsThis}</p>
      </section>

      <section className={Styles.sectionWrapper}>
        <Heading>How do you play this?</Heading>
        <ol>
          {text.howToPlay.map((textBullet, idx) => (
            <li key={idx}>{textBullet}</li>
          ))}
        </ol>
      </section>

      <section className={Styles.sectionWrapper}>
        <Heading>What is the registration for?</Heading>
        <ol>
          {text.whyRegistration.map((textBullet, idx) => (
            <li key={idx}>{textBullet}</li>
          ))}
        </ol>
      </section>
    </div>
  </main>
);

// the text used inside the component
const text = {
  whatIsThis:
    'Jet Fighters Online is a web platform where you can play a real-time multiplayer game based on the “Jet Fighter” 1975 Atari game featuring 2d aircraft combat.',
  howToPlay: [
    'You create a lobby which will be a given an unique ID.',
    'You share that ID with your friend so he can join the created lobby.',
    'The one who created the lobby has the right to choose the game settings which include the map size and the maximum score.',
    'Both players have the right to choose their own jet type as well as a color for it.',
    'The game can be started the moment both players are ready.',
    'Jet controls include left and right arrows for left and right steering and spacebar for shooting.',
    'After the game is over the players return to the lobby and can battle again with the possiblity to change the game settings or choose a different jet.',
    'After both players exit the lobby, the lobby will be destroyed.',
  ],
  whyRegistration: [
    'You will be provided with a name which will be displayed while playing.',
    'Your game results will be saved and you will be provided with information on amount of overall wins/loses/draws.',
    'Your profile will display your most played jets.',
  ],
};

export default AboutPage;
