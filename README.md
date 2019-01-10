# GarbGuess App
This app will help you decide what to wear and when

### My Approach
1) X - make sure repo connected to public github repo & base app running locally
2) X - finalize what features to prioritize to meet MVP
3) X - architect the data schema
4) X - Insert sample data example with sample.json
5) X - Figure out what front-end UI components I want to add (leverage this to figure out how to design API functionality)
		--> X - simple add clothing functionality (form)
		--> random mode that gets bunch of stuff that matches color palette user inputs (will need to add a few articles to test)
				- what would this return? what consittues a "full outfit?"
6) X - Design API controller methods to meet MVP
7) X - confirm all functionality working
8) X - any remaining time: styling

### What this MVP will ideally provide
- FOCUS on adding the following 2 features:
		1) X - add clothing form
		2) random mode that gets outfit based on color palette you provide (provide 2 colors) --> api will randomly gen 5 part outfit
		3) IF TIME --> try to add quick delete functionality based on NAME (what if same name, differnet color? would need to submit a whole other form)
- data stucture:
	- all piece of "clothing" (4 body Parts) : Head, Torso, Legs, Feet
  - 8 types: hats, coats, sweaters, pants, t-shirts, long-sleeve shirts, socks, shoes
	- Full Outfit recommendation: headgear (could be none), coat (could be none), sweater(could be none), long-sleeve OR t-shirt, pants, socks (could be none), shoes
			- always need the following (only NEED to provide the following 3) : long-sleeve/t-shirt, pants, shoes
- may need to SKIP SHOES (depends on timing)


### How to run this application

run the following commands:

- npm install
- npm start (do not use start-dev, leverages nodemon which will auto reload server when changes saved)
		--> NOTE: make sure to uncomment insertSample() command to populate your locally running mongoDB instance with the sample data
- npm start will build the front-end and spool up the server
- check localhost:3000 to view the application in the browser of your choice

### Broken Code Explanations (if necssary):
- was not able to finish designing the controller needed to query the DB for outfit with a "color scheme" 
	--> would need to craft a way to always get back at LEAST a full oufit (long-sleeve/t-shirt, pants, shoes) and possibly more, based on colors selected
	--> how to select color scheme based on 2 colors (this would need to be designed programmatically by someone more stylish than me)

### What I would have liked to have gotten to with more time
- Validation: definitely would plan to sanitize and validate all inputs in proper app (client & server should never trust one another)
- Delete: ability to remove clothing from inventory (wardrobes & tastes change)
		--> note: would need to be able to delete one at a time based on name / color (eg. could have same sweatshirt in 2 different colors)
- Chose to go with "lightnessLevel", felt more intuitive for deciding what to wear for simple taxonomy (light, medium, heavy)
- Render some sort of "clothing successfully added! message"
- Definitely would've preferred dropdown boxes for bodyPart, "type", & lightnessLevel (light, medium, heavy) --> add structure