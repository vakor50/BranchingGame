# Branching Story

This project is meant to be a way to build a branching storyline. Using a JSON array, a tree of options, effects and consequences is created. A player can move through the different branches of the tree to have a different possible result than the first time they played.

### Tech
Built using JavaScript and jQuery, with data being pulled from a JSON object.


### TODO
- re-evaluate styling of game creation
- allow player to choose created games to play when they go to the play game tab
- maintain list for in-game items
- give options to use in-game items
	- a node might have a tag that says, "you can use this item here"
	- must check if node has this tag, node  .hasOwnProperty('tagname');
- once you acquire an item, it is always an action option on a node
- build larger story
- figure out a way for nodes to have common children
  
  
Time spent: ~6 hours
