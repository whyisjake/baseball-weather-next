export default function FieldInfo(props) {
  return (
    <div className="card">
      <div className="card-header">Field History</div>
      <div className="card-body">
        <p className="card-text">
          There are two fields at Ygnacio Valley Elementary School. Field #1 is
          closest to the school and is named{" "}
          <a href="https://www.legacy.com/us/obituaries/eastbaytimes/name/larry-byrne-obituary?id=17068146">
            Larry Byrne Veterans Field
          </a>
          . Field #2 is furthest from the school and is named Jones Field.
        </p>
      </div>
      <div className="card-header">Scoreboards</div>
      <div className="card-body">
        <h5 className="card-title">Field #1 - AA</h5>
        <ol>
          <li>
            There is a power pole at the end of the first base line. Locate the
            power pole and flip the breaker that is labeled scoreboard.
          </li>
          <li>
            There is an extension cord and scoreboard controller in the first
            base dugout. There is a power outlet in the green box attached to
            the bathrooms. Run the extension cord from the power outlet to the
            stands on the third base side of the field.
          </li>
          <li>
            Once plugged in, it will send a command to boot up the scoreboard.
          </li>
          <li>
            The scoreboard will boot up and display the prior settings if not
            cleared. To create a new game state, do the following:
            <ol>
              <li>
                Press the <code>New Game</code> button.
              </li>
              <li>
                Press <code>1</code> to reset the game
              </li>
              <li>
                Press <code>Enter</code> to send the reset
              </li>
            </ol>
          </li>
          <li>
            During the game, use the Ball +1, Strike +1, and Out +1 to cycle the
            counts.
          </li>
          <li>The scores and pitch counts can be updated in the same way.</li>
          <li>
            If you need to update the pitch count or the score, you can manually
            override:
            <ol>
              <li>
                Press the{" "}
                <code>Set Guest Score/Set Home Score/Set Pitch Counts</code>{" "}
                button.
              </li>
              <li>Enter the score using the keypad.</li>
              <li>
                Press <code>Enter</code> to send the score.
              </li>
              <li>
                For pitch counts, it will have the left and right pitch counts.
                You press enter to cycle through them.
              </li>
            </ol>
          </li>
          <li>
            If you need to download the manual, you can find it{" "}
            <a href="https://www.electro-mech.com/wp-content/uploads/manuals/CXConsoleMPLinescore4DClock402B.pdf">
              here
            </a>
            .
          </li>
          <li>
            At the end of the game, put away the scoreboard controller,
            extension cord, and shut off the power at the power pole.
          </li>
        </ol>
        <h5 className="card-title">Field #2 - AAA</h5>
        <ol>
          <li>The scoreboard controller should be in the announcer booth.</li>
          <li>
            Try turning on the scoreboard by pressing the brightness button. If
            it comes on immediately, you can proceed. If it doesn&apos;t come
            on, there is a switch on the inside of the pump shed door. This
            switch should be up for the scoreboard to turn on.
          </li>
          <li>
            If there is a lingering score, you can clear the game state by
            following the reset settings.
            <ol>
              <li>
                Press the <code>Set</code>
              </li>
              <li>
                Press <code>R</code> - <code>E</code> - <code>S</code> -{" "}
                <code>E</code> - <code>T</code>
              </li>
              <li>
                Press <code>Enter</code> to send the reset
              </li>
            </ol>
          </li>
          <li>
            During the game, use the Ball +1, Strike +1, and Out +1 to cycle the
            counts.
          </li>
          <li>
            The score can be updated using the <code>Score +1</code> button.
          </li>
          <li>
            If you need to manually override the score, you can do so by
            pressing <code>Set</code> and then <code>Score +1</code> button
            followed by the score. For example, if the score home team score is
            6, but you accidentally have it as 7, press <code>Set</code>,{" "}
            <code>Home - Score +1</code>, enter the score, and then press{" "}
            <code>Enter</code>.
          </li>
          <li>
            At the end of the game, you can press the <code>Brightness</code> to
            turn the scoreboard off.
          </li>
        </ol>
      </div>
    </div>
  );
}
