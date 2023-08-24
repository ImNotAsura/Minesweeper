# Minesweeper

3 different rendered states for the game
Choosing screen - Ability to choose difficulty, from drop down menu, or input your own rows and cols and choose amount of bombs -> Be it % of board or number
Game itself -> Render board
Ending - How many easy/med/hard was completed so far. (Custom sizing will have its own LB) and the time taken to complete the game (Will need to implement timer during the game itself)

How to play minesweeper:
Left click on an un-opened cell to reveal. (Underneath will be a number or a bomb)
For a number -> The cells surrounding it will consist of the number of bombs === number
Right click to set a flag on a cell that you think is a bomb
Flood feature will automatically reveal empty spaces that will not have number or bomb -> On successful left click

MVP
Able to render a board and able to click on the cells, with game ending when bomb is clicked
