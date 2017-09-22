# Branching Story

This project is meant to be a way to build a branching storyline. Using an object array, a tree of options, effects and consequences is created. A player can move through the different branches of the tree to have a different possible result than the first time they played.

### Begin
Page loads on tree creation tool. Here a user can create a branching story by adding nested elements with their cause and effect. Each nest element can be removed as well.

Once you've created a tree, you can scroll to the bottom of the page and click "Save Story"

Once the story is saved, you can click the "Play Game" to load the menu for choosing a game to play. There is a game loading with some dummy text.


### TODO
- Add local storage or session storage of game trees
- re-evaluate styling of game creation
- maintain list for in-game items
- give options to use in-game items
	- a node might have a tag that says, "you can use this item here"
	- must check if node has this tag, node  .hasOwnProperty('tagname');
- once you acquire an item, it is always an action option on a node
- build larger sample story
- figure out a way for nodes to have common children
  
  
Time spent: ~6 hours
