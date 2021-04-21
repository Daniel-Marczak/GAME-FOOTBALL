About the game
--------------------------------------------------------------------------------
This browser game was made purely for entertainment/practice reason (I just
wanted to practice some programming skills and learn more about JS and CSS).
I came up with an idea of creating a small football game that would be similar
to one that I had seen some long time ago.

--------------------------------------------------------------------------------
INSTRUCTIONS
--------------------------------------------------------------------------------
How to start the match
--------------------------------------------------------------------------------
To start the match one has to enter the names of the teams and set the match
time duration for at least one minute. Maximum match time duration can be set
for 90 minutes. "ALLOW TO MOVE BACKWARDS" check box, as the very name suggests,
is an option that allows a current player to move backwards but only to the
point where the turn started. When selected, SHOW "CURRENT PLAYER" INFO check
box displays an info about a current player at each start/end of a given turn.
Having set all the necessary input, one can click the "START" button and starts
the match.


Turns
--------------------------------------------------------------------------------
After the game has started, the home team's name input changes background color
to blue which indicates that it is home team's turn. When the home team's name
input changes background color to previous color, gray, and the away team's name
input changes background color to red, it means that it is away team's turn.


Time
--------------------------------------------------------------------------------
The match duration time is split in half and both players get an equal amount
of time for the moves. A player's timer starts/stops counting down at each
start/end of a given turn. When a timer of one of the players reaches zero,
the match is over.


Basic rules
--------------------------------------------------------------------------------
Players can move in all directions (i.e. NW, N, NE, E, SE, S, SW, W) but only
to a dot that is a direct neighbour of a current dot which is marked as a white
dot with a black border. A player can only make one move at a time if the move
is made to a light green dot and that dot is not an edge dot (next to a white
line). If the player makes a move to a green dot that is an edge dot, or makes
a move to a dot which has been marked black, the player can move one more time.
Direct moves from one edge dot to another edge dot are not allowed but the edge
dots that are next to corner dots. If the player moves to a dot from which
another move can't be made, the opposite player scores a point and the match
restarts. To put it briefly, all possible moves are marked with a light green
line (horizontal, vertical and diagonal) which is placed between light green
dots.


Goals
--------------------------------------------------------------------------------
To score a goal a player has to move directly to one of the three goal dots
which are located directly in front of the goal gates and then click on the
goal gate.


Dots
--------------------------------------------------------------------------------
The regular dot - moves are possible in all directions but the direction from
which a player moved to that dot.

The edge dot - moves depend on the side of the football field. The edge dot
doesn't allow the player to move along the edge of the football field but
enables the player to make one more move when entered.

The corner dot - moves to one of the four corner dots causes a current player
to lose a point as there are no other moves available from that dot.

The goal dot - goal dots are located directly in front of the goal gates.
There are three goal dots (for each goal gate) of which left and right act
the same way as the edge dot does, which means that the player can make one more
move from this dots and for instance, score a goal by clicking on the goal gate.
The middle goal dot acts as the regular dot.

The black dot - players can make one more move if they move to the black dot.


Tips
--------------------------------------------------------------------------------
One has to bear in mind, that one can score a point not only by attacking a goal
gate, but also by blocking the opposite player and directing him/her to a place
from which no other moves can be made. Also, one can try to block access to
one's goal gate before attacking the opposite player's goal gate (which can
build some psychological comfort afterwards, but is quite risky).
Play fair and have fun.
