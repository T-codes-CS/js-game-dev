// console.log("Hello World");

// Declare our variable for our 2d array, score, row, and columns.
let board;
let score = 0;
let rows = 4;
let columns = 4;
let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

// create a function to set a game
// start of setaGame()
function setGame(){
	// Initialize the 4x4 game board with all tiles set to 0
	board =[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];

	// Create the gameboard on the HTML document
	// 0 < 4 (Y)
	// 1 < 4 (Y)
	// 2 < 4 (Y)
	// 3 < 4 (Y)
	// 4 < 4 (N)

	// First loop is to create rows, second loop is to create columns
	// inner loop will be executed to finish before outer loop 
	for(let r=0; r < rows; r++){
		for(let c=0; c < columns; c++){
			//console.log(`[r${r}-c${c}]`)

			// create div element representing a tile
			let tile = document.createElement("div");

			// set a unique id for each tile based on its coordinate
			// "+" is used to concatenata values if dealing with String.
			tile.id = r.toString() + "-" + c.toString();

			// get the number from the board
			// wherein the board is currently set to 0
			let num = board[r][c];

			// Update the tiles appearance based on the value.
			updateTile(tile, num);
			
			// 
			document.getElementById("board").append(tile);
			}
		}

		// Random tile
		setTwo();
		setTwo();
	}

function updateTile(tile, num){
				//clear the tile innerText
				tile.innerText = "";

				// clear the classList to avoid multiple classes
				tile.classList.value = "";

				// add class named "tile" to the classlist of the tile, for the styling
				tile.classList.add("tile");

				// to check if the current num parameter is not zero
				if(num > 0){
					// set the tile's text to the number based on the num value.
					tile.innerText = num.toString();

					if(num<=4096){
						tile.classList.add("x"+num.toString());
					}
					else{
						// if number is greater than 4096, a special class "x8192" will be added.
						tile.classList.add("x8192");
					// end of updateTile()
						}	
				}
			}

// start of window.onload
// event that triggers when a webpage finished loading
window.onload = function(){
	// function 
setGame();
// end of setGame()

}
// end of window.onload



// start of handleSlide()
// e representst the event object, which contains information about the event occured.
function handleSlide(e){
	// check the keydown event.
	console.log(e.code);

	// Check if the pressed key's code is one of the arrow keys.
if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)){

	// prevent default behavior, to avoid scrolling on keydown.
	e.preventDefault();	

			// (=) assignment operator (to assign/change value of a variable), (==) to compare if value from left to right are equal.
			if(e.code == "ArrowLeft"){
				slideLeft();
				setTwo();
			}
			else if(e.code == "ArrowRight"){
				slideRight();
				setTwo();
			}
			else if(e.code == "ArrowUp"){
				slideUp();
				setTwo();
			}
			else if(e.code == "ArrowDown"){
				slideDown();
				setTwo();
			}

document.getElementById("Score").innerText = score;

// use setTimeout to delay the alert
	setTimeout(()=>{
		if(hasLost()){
			alert("Game Over! You have lost the game. Game will restart.")
			restartGame();
			alert("Press any arrow key to restart.")
		}

	checkWin();

		}, 100); //delay time in miliseconds
	}
}

//EventListener, when any key is pressed the handleSlide() is called to handle the key press.
document.addEventListener("keydown", handleSlide);

// end of handleSlide()


// start of filterZero(tiles)
// removing empty tiles
function filterZero(tiles){
	// create new array removing the zeroes
	return tiles.filter(num => num != 0);
}
// end of filterZero(tiles)


// start of slide(tiles)
// function for sliding and merging tiles
function slide(tiles) {
	// [0,2,2,2]
	// [2,2,2]
	tiles = filterZero(tiles);
	for(let i = 0; i < tiles.length; i++){

		// if two adjacent numbers are equal.
		if(tiles[i] == tiles [i+1]){

				// merge them by doubling the first one
				tiles[i] *= 2;
				// set the second one to zero
				tiles[i+1] = 0;
				// result: [2,2,2] -> [4,0,2]

				// score = score + tiles[i];
				// short hand version
				score += tiles[i];

		}
	}

	// [4,0,2] -> [4,2]
	tiles = filterZero(tiles)

	// add zeroes back
	while(tiles.length < 4){
		// add zero on the end of the array
		tiles.push(0);
		// [4,2,0,0]
	}

	return tiles;
}

// end of slide(tiles)



// start of slideLeft()
function slideLeft(){
	for(let r=0; r<rows; r++){
		// store current row in the row variable
		let row = board[r]; // 0: [0,2,2,2]

		// line for animation
		// copy the content of the original row
		let originalRow =  row.slice();

		// slide() function will return to a new value for a specific row. (merging of tiles)
		row = slide(row);


		// updated value in the board.
		board[r] = row;

		for(let c=0; c<columns; c++){
			let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            // line for animation
            // if current tile != to the original tile, apply animation
            if(originalRow[c] !== num && num !== 0){
            	// specify the animation style and duration
            	tile.style.animation = "slide-from-right 0.3s"

            	//remove the animation class after animation is complete
            	setTimeout(()=> {
            		tile.style.animation = "";
            	}, 300);
            }



            updateTile(tile, num);

		}
	}
}
// end of slideLeft()


// start of slideRight()
function slideRight(){
	for(let r=0; r<rows; r++){
		// store current row in the row variable
		let row = board[r]; // 0: [0,2,2,2]

		// original row for animation
		let originalRow = row.slice();

		// reverse the row array since it is sliding to right
		// r = 0: [0,2,2,2] -> [2,2,2,0]
		row.reverse();


		// slide() function will return to a new value for a specific row. (merging of tiles)
		row = slide(row); // [4,2.0.0]

		row.reverse(); // [0,0,2,4]



		// updated value in the board.
		board[r] = row;

		for(let c=0; c<columns; c++){
			let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            // line for animation
            // if current tile != to the original tile, apply animation
            if(originalRow[c] !== num && num !== 0){
            	// specify the animation style and duration
            	tile.style.animation = "slide-from-left 0.3s"

            	//remove the animation class after animation is complete
            	setTimeout(()=> {
            		tile.style.animation = "";
            	}, 300);
            }

            updateTile(tile, num);

		}
	}
}
// end of slideRight()


// start of slideUp()
function slideUp(){
	for(let c=0; c<columns; c++){
		
		// create a temporary array col that represents the column from top to bottom
		let col =[board[0][c], board[1][c], board[2][c], board[3][c]];

		// original col animation
		let originalCol = col.slice();

		col =slide(col);


		for(let r=0; r<rows; r++){
			// set the values of board array back to the values of the modified col.
			board[r][c] = col[r];

			let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if(originalCol[r] != num && num !== 0){
            	tile.style.animation = "slide-from-bottom 0.3s";

            	setTimeout(() =>{
            		tile.style.animation = "";
            	}, 300)
            }

            updateTile(tile, num);

		}
	}
}
// end of slideUp()


// start of slideDown()
function slideDown(){
	for(let c=0; c<columns; c++){
		
		// create a temporary array col that represents the column from top to bottom
		let col =[board[0][c], board[1][c], board[2][c], board[3][c]];

		// copy for animation
		let originalCol = col.slice();

		col.reverse();
		col =slide(col);
		col.reverse();


		for(let r=0; r<rows; r++){
			// set the values of board array back to the values of the modified col.
			board[r][c] = col[r];

			let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];


            if(originalCol[r] != num && num !== 0){
            	tile.style.animation = "slide-from-top 0.3s";

            	setTimeout(() =>{
            		tile.style.animation = "";
            	}, 300)
            }

            updateTile(tile, num);

		}
	}
}
// end of slideDown()


// start of hasEmptyTile()
// check whether game board contains any empty space (0)
// return a boolean value (true/false)
function hasEmptyTile() {
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			// Check if current tile == 0, if yes it will return true
			if(board[r][c] == 0){
				return true;
			}
		}
	}

	// no tile == 0
	return false;
}
// end of hasEmptyTile()


// start of setTwo()

// add a new random "2" tile in the game board.
function setTwo(){
	// check if hasEmptyTile is false
	// ! - opposite of boolean
	if(!hasEmptyTile()){
		return;
	}

	// declare a value found in tile
	let found = false;

	while(!found){

		// Math.random() - generates random number base on the given condition
		// Math.floor() - rounds down to the nearest integer.
		// to get a random value for r and c from 1 - 4.
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);


		// if position value is 0, set the value to 2.
		if(board[r][c] == 0){
			board[r][c] = 2;
			let tile = document.getElementById(r.toString()+"-"+c.toString());
			tile.innerText = "2";
			tile.classList.add("x2");

			// set the found variable to tre.
			found = true;
		}
	}
}
// end of setTwo()


// start of checkWin()
function checkWin() {
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			// check if the current tile is a winning tile
			if(board[r][c] == 2048 && is2048Exist == false){
				alert("You Win! You got 2048.")
				is2048Exist = true; // once 2048 already eist alert message will only pop once.
			}
			else if(board[r][c] == 4096 && is4096Exist == false){
				alert("You are unstoppable at 4096! You are fantastically unstoppable");
				is4096Exist = true;
			}
			else if(board[r][c] == 8192 && is8192Exist == false){
				alert("Victory! You have reached 8192! You are incredibly awesome!");
				is8192Exist = true;
			}
		}
	}
}

// end of checkWin()

// start of hasLost()
// check if the board is full
function hasLost(){
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			// found an empty tile, user has not lost
			if(board[r][c] == 0){
				return false;
			}

			const currentTile = board[r][c];

			// check if the adjacent (up, down, left, right) cells have possible merge
			if(
				r > 0 && board[r - 1][c] === currentTile ||
                r < rows - 1 && board[r + 1][c] === currentTile ||
                c > 0 && board[r][c - 1] === currentTile ||
                c < columns - 1 && board[r][c + 1] === currentTile 
			){
				// Found adjacent cells with the same value, user has not lost.
				return false;
			}
		}
	}

	// No possible moves left or empty tiles, user lost
	return true;
}
// end of hasLost()

// start of restartGame()
// RestartGame by replacing all values into zero.
function restartGame(){
        board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];    
    setTwo();   // new tile 
    score = 0;  
}
// end of restartGame()



// for mobile devices


// declare variable for touch input
let startX = 0;
let startY = 0;

// event listener to capture touch in the screen and assign the  and y coordinates in the start and startY varibale.
document.addEventListener("touchstart", (e) =>{
	startX = e.touches[0].clientX;
	startY = e.touches[0].clientY;

	 // console.log(startX);
	 // console.log(startY);
})

// event listener to check where you touch the screen and prevents scrolling
// input targets any elements that includes the word tile
document.addEventListener("touchmove", (e) =>{

	if(!e.target.className.includes("tile")){
		return
	}

	e.preventDefault(); // disables scrolling
}, {passive: false});


// listen for the touchend event on the entire document.
document.addEventListener("touchend", (e) =>{

	// check if the element triggered has a class name"tile"
	if(!e.target.className.includes("tile")){
		return; // exit the function.
	}

	// calculate the difference between the initial position and the final touch.
	let diffX = startX - e.changedTouches[0].clientX;
	let diffY = startY - e.changedTouches[0].clientY;

	console.log(diffX);
	console.log(diffY);

	// Check if the swipe is for horizontal or vertical.
	// horizontal > vertical

if(Math.abs(diffX) > Math.abs(diffY)){
		// horizontal swipe
		if(diffX > 0){
			slideLeft();
			setTwo();
		}
		else{
			slideRight();
			setTwo()
		}
	}
	else{
		// vertical swipe
		if(diffY > 0){
			slideUp();
			setTwo()
		}
		else{
			slideDown();
			setTwo();
		}
	}

	document.getElementById("Score").innerText = score;
		setTimeout(()=>{
		if(hasLost()){
			alert("Game Over! You have lost the game. Game will restart.")
			restartGame();
			alert("Press any arrow key to restart.")
		}

	checkWin();

		}, 100); //delay time in miliseconds
	

})


