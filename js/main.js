
	function el(css){
		return document.querySelector(css);
	}
	function con(parameter){
		console.log(parameter);
	}
	
	function getElements(css){
		return document.querySelectorAll(css);
	};
	function cont(t){
		return console.table(t);
	}
	// التصريح
	let array = [[],[],[],[],[],[],[],[],[]];
	let arrayBackUp = [[],[],[],[],[],[],[],[],[]];
	let newX =-1;
	let newY =-1;
	let lives = 3 ;
	let ziel = 0;
	let gameNow = false;
	let zeit =0;

	const bgColor="rgba(148, 156, 37, 0.911)";
	const nivaueHard ="hard";
	const nivaueMedium="medium";
	const nivaueEasy ="easy";
	const urlSudoku ="https://sugoku.herokuapp.com/board?difficulty=";
	// const arrayOfSelectdNumber = [];
	
	el("#btnEasy").addEventListener("click",loadGame);
	el("#btnMedium").addEventListener("click",loadGame);
	el("#btnHard").addEventListener("click",loadGame);
	
	
	el("#btnStart").addEventListener("click",startGame);
	el("#btnStart").disabled = true ;
	el("#resetbtn").addEventListener("click",restGame);
	el("#resetbtn").disabled=true;
	document.addEventListener("keydown",deleteNumber);


	//
	//لاعادة الخلايا الى الستايل  الافتراضي  
	function clearStyle(){
		for(let i = 0 ; i < 9 ; i ++){
			for(j = 0 ; j < 9 ; j ++){
			  el("#c"+i+j).style.backgroundColor = "khaki";
			  el("#c"+i+j).style.color ="#312E2B";

			}
		}
	};

	//لرسم الاطارات التقسيمية السفلية والجانبية
	function drawBorder(){

		for(let i = 0 ; i < 9 ; i++){
			el("#c"+2+i).style.borderBottom ="thick solid black";
			el("#c"+5+i).style.borderBottom ="thick solid black";
			el("#c"+i+2).style.borderRight ="thick solid black";
			el("#c"+i+5).style.borderRight ="thick solid black";
		}
	};


	//لخلق مصفوفة ثنائية البعد وقيمة عناصرها جميعا بقيم بدائية صفرية 0
	function iniT_Array(){
		let arr =[[],[],[],[],[],[],[],[],[]];
		for(let i = 0; i <9 ; i++ ){
			for(let j = 0; j < 9 ; j++ ){
				arr[i][j] = 0;
			}
		}
		return arr;
	};	



	// اعداد الايفينت ليستينير لكل خلية من خلايا الشبكة ورسم خطوط الشبكة
	function init_cell_of_div(){

		
			for(let i = 0 ; i < 9 ; i ++){
				for(j = 0 ; j < 9 ; j ++){

				  el("#c"+i+j).addEventListener("click",selectBoxes);
				  el("#c"+i+j).addEventListener("dblclick",clearStyle);
				}
			};
			drawBorder();
		
		   
	};
	
	//
	function selectBoxes(){
		clearStyle();
		let boxId = this.id;
		let res = boxId.substr(1, 2);
		let rowOfCell =getRow(res);		
		let ColumOfCell= getColumn(res);

		for (let i = 0; i < 9 ; i ++){
		el("#c"+rowOfCell+i).style.backgroundColor = bgColor;
		el("#c"+rowOfCell+i).style.color ="black";

		
		el("#c"+i+ColumOfCell).style.backgroundColor = bgColor;
		el("#c"+i+ColumOfCell).style.color ="black";	
		};

		if(array[rowOfCell][ColumOfCell] > 0){
				setStyleToSelectedBox(getBigBoxNo(parseInt(res)));
		};
		
	
		setStyleToSameValues(array[rowOfCell][ColumOfCell]);
		newX = rowOfCell;
		newY =ColumOfCell;
		el("#c"+rowOfCell+ColumOfCell).style.backgroundColor ="#312E2B";
		el("#c"+rowOfCell+ColumOfCell).style.color = "white";


};
//رقم نفسة بالشبكةوضع نفس الستايل للرقم المختار  هايلايت لل
function setStyleToSameValues(val){
	for(let i=0;i < 9; i ++){
		for (let j = 0 ; j < 9 ; j++){
			if (array[i][j] === val && array[i][j] > 0 ){
				
		el("#c"+i+j).style.backgroundColor = "#312E2B";
		el("#c"+i+j).style.color ="white";	
			}

		}
	}
}

// وضع ستايل للبوكس 
function setStyleToSelectedBox(num){
	let i_zero=0;
	let j_zero=0
	
	switch(num){
		case 1:	i_zero =0;	j_zero =0;
		break;
		case 2:	i_zero =0;	j_zero =3;
		break;
		case 3:	i_zero =0;	j_zero =6;
		break;
		case 4:	i_zero =3;	j_zero =0;
		break;
		case 5:	i_zero =3;	j_zero =3;
		break;
		case 6:	i_zero =3;	j_zero =6;
		break;
		case 7:	i_zero =6;	j_zero =0;
		break;
		case 8:	i_zero =6;	j_zero =3;
		break;
		case 9:	i_zero =6;	j_zero =6;
		break;
	};
	let i_end = i_zero +3;
	let j_end = j_zero +3;
	for(let i = i_zero; i < i_end ; i ++){
		for (let j = j_zero;j < j_end ; j ++){
			el("#c"+i+j).style.backgroundColor = bgColor;
			el("#c"+i+j).style.color ="black";
		}
	}

};

function getRow(cell){
		return cell.substr(0,1);
	};
	
function getColumn(cell){   
		return cell.substr(1,1);
	};
	
//add eventlistener to  the asidebar numbers .
function iniT_SelectedNumber(){
	for (let i = 1 ; i < 10 ; i ++ ){
		el("#n"+i).addEventListener("click",addNumber);
	};
};	

//remove eventlistener to  the asidebar numbers after used them .
function removeEventListenerSelectedNumber(){
	for (let i = 1 ; i < 10 ; i ++ ){
		el("#n"+i).removeEventListener("click",addNumber);
	};
};


function getNumberOfBtnID(id){
	return parseInt(id.substr(1, 1));
};


function addNumber(){
	//game now the game is on
	if(gameNow && newX >= 0 && newY >= 0 &&arrayBackUp[newX][newY]===0){
	
		//القيمة الي طلعت من الارقام وانرسمت عالشاشة
		let newValue=getNumberOfBtnID(this.id);

		//newx, newy =-1 لتجنب التنفيذ في حالة عدم تحديد اي خلية من المربع 
		let t1=chkVadility(newX,newY,newValue);


		if (t1){
			array[newX][newY] = newValue;
			el("#c"+newX+newY).innerHTML = newValue;
			ziel -- ;

			//if the added number ist the last number of 8 which i add 
			if (isNumberDone(newValue)){
				el("#n"+newValue).removeEventListener("click",addNumber);
			};

		}else{
			lives -- ;
			el("#life").value = lives;
			if (lives > 0){
				alert("Fehlernummer... \n Sie Haben noch Leben  ("+lives +")");
			}else{
				gameNow = false;
				el("#resetbtn").disabled=false;
				el("#btnStart").value = "Sudoku Spielen";
				el("#btnStart").disabled = true;
				el("#btnEasy").disabled = false;
				el("#btnMedium").disabled = false;
				el("#btnHard").disabled = false;
				setGameOverOnBoard();
				removeEventListenerSelectedNumber();
				alert("Game Over... \n Wollen Sie nochmal Spielen ")

			};
		};
	
	if (ziel === 0)	{
		setGameOverOnBoard();
		removeEventListenerSelectedNumber();
		gameNow = false;
		el("#resetbtn").disabled=false;
		el("#btnStart").value = "Sudoku Spielen";
		el("#btnStart").disabled = true;
		el("#btnEasy").disabled = false;
		el("#btnMedium").disabled = false;
		el("#btnHard").disabled = false;

		el("#c20").innerHTML = "S";
		el("#c21").innerHTML = "e";
		el("#c22").innerHTML = "h";
		el("#c23").innerHTML = "r";
	
		el("#c25").innerHTML = "g";
		el("#c26").innerHTML = "u";
		el("#c27").innerHTML = "t";
	};

	};
	
	
}

function setGameOverOnBoard(){
	clearStyle();

	for(let i = 0 ; i < 9 ; i++){
		for(let j = 0 ; j < 9 ; j ++){
			el("#c"+i+j).innerHTML = " ";
		}
	}
	el("#c40").innerHTML = "G";
	el("#c41").innerHTML = "a";
	el("#c42").innerHTML = "m";
	el("#c43").innerHTML = "e";

	el("#c45").innerHTML = "O";
	el("#c46").innerHTML = "v";
	el("#c47").innerHTML = "e";
	el("#c48").innerHTML = "r";

};


function setPause(){
	clearStyle();
	for(let i = 0 ; i < 9 ; i++){
		for(let j = 0 ; j < 9 ; j ++){
			el("#c"+i+j).innerHTML = "";
		}
	}
	el("#c40").innerHTML = "P";
	el("#c41").innerHTML = "a";
	el("#c42").innerHTML = "u";
	el("#c43").innerHTML = "s";

	el("#c44").innerHTML = "e";
	el("#c46").innerHTML = ".";
	el("#c47").innerHTML = "!";
	el("#c48").innerHTML = "!";

};

function isNumberDone(num){
	let count=0;
	//بحث في كل المربعات ال81
	//والعداد ال كاونت كم مرة طلعت معنا القيمة
	array.forEach((Element)=>{
		Element.forEach((val)=>{
			val === num ? count ++ : count ;
		});
	});
	return ( count === 9 );

};

function startTimer(){
	if (gameNow){
	setTimeout(startTimer,1000);	
	el("#time").value = showTime(zeit);
	zeit++
	}
};

function showTime(t){		
		let result = "";

		let hrs = Math.floor(t / 3600);
		let mins = Math.floor((t % 3600) / 60);
		let secs = Math.floor(t % 60);	
		
	
		if (hrs > 0) {
			result += "" + hrs + ":" + (mins < 10 ? "0" : "");
		};
		
		result += "" + mins + ":" + (secs < 10 ? "0" : "");
		result += "" + secs;
		return result;
}

function chkVadility(r,c,val)
{
	//newx, new y ,val : ist the button value which we press from aside
	let cellId=r+c;
	let t1 ,t2;
		t1 =chkRowandColumn(r,c,val);
		t2 =chkByBoxNo(getBigBoxNo(parseInt(cellId)),val);
	return 	 (t1 && t2 );

}
	
function chkRowandColumn(i_index,j_index,val){
	let yesWeCan ;
		for (let i = 0; i < 9 ; i ++){

		if (((array[i_index][i]) === val) || ((array[i][j_index])=== val) ){

			yesWeCan = false;
			break;
		}else{
	
			yesWeCan = true;
	}
	}
	return yesWeCan;
}

function chkByBoxNo(no,val){
	let i_zero=0;
	let j_zero=0
	switch(no){
		case 1:	i_zero =0;	j_zero =0;
		break;
		case 2:	i_zero =0;	j_zero =3;
		break;
		case 3:	i_zero =0;	j_zero =6;
		break;
		case 4:	i_zero =3;	j_zero =0;
		break;
		case 5:	i_zero =3;	j_zero =3;
		break;
		case 6:	i_zero =3;	j_zero =6;
		break;
		case 7:	i_zero =6;	j_zero =0;
		break;
		case 8:	i_zero =6;	j_zero =3;
		break;
		case 9:	i_zero =6;	j_zero =6;
		break;
						
	}
	let i_end = i_zero +3;
	let j_end = j_zero +3;

	for(let i = i_zero; i < i_end ; i ++){
		for (let j = j_zero;j < j_end ; j ++){
			if (array[i][j] === val ){
				return false;
			};
		};
	};
	return true;

}

function getBigBoxNo(index){
		/*  Viertel in Array */	
		//  1   2   3 //
		//  4   5   6 //
		//  7   8   9 //
		let viertel = 0;
		switch (index) {
			//  1 queb
			case 00:case 01:case 02:
			case 10:case 11:case 12:
			case 20:case 21:case 22:viertel = 1;								
			break;
			case 03:case 04:case 05:
			case 13:case 14:case 15:
			case 23:case 24:case 25:viertel = 2;								
			break;
			case 06:case 07:case 08:
			case 16:case 17:case 18:
			case 26:case 27:case 28:viertel = 3;								
			break;
			case 30:case 31:case 32:
			case 40:case 41:case 42:
			case 50:case 51:case 52:viertel = 4;								
			break;
			case 33:case 34:case 35:
			case 43:case 44:case 45:
			case 53:case 54:case 55:viertel = 5;								
			break;
			case 36:case 37:case 38:
			case 46:case 47:case 48:
			case 56:case 57:case 58:viertel = 6;								
			break;
			case 60:case 61:case 62:
			case 70:case 71:case 72:
			case 80:case 81:case 82:viertel = 7;								
			break;
			case 63:case 64:case 65:
			case 73:case 74:case 75:
			case 83:case 84:case 85:viertel = 8;								
			break;
			case 66:case 67:case 68:
			case 76:case 77:case 78:
			case 86:case 87:case 88:viertel = 9;								
			break;

		};
		return viertel;
	}
	
function chkNivaue(level){
		let myNivaue ="";

		switch (level){
			case "btnHard" : myNivaue  = nivaueHard;
			break;
			case "btnEasy" : myNivaue  = nivaueEasy;
			break;
			case "btnMedium" : myNivaue  = nivaueMedium;
			break;
		}
		return myNivaue;
	
	};
	
async function getArrayFromURL(url){
	ziel = 0;
		const response = await fetch(url);
		var data = await response.json();    
		// "board" akey of object from api 
		array =data.board;
		for (let i = 0 ; i < 9 ; i ++ ){
			for ( let j = 0 ; j < 9 ; j ++){
				arrayBackUp[i][j]=array[i][j];
				array[i][j] === 0 ? ziel++ :"";
			}
		}
		cont(array);
		cont(arrayBackUp);
	 };
	
function loadGame(){
	  
		getArrayFromURL(urlSudoku+chkNivaue(this.id));

		el("#btnEasy").disabled =  !el("#btnEasy").disabled ;
		el("#btnMedium").disabled = !el("#btnMedium").disabled ;
		el("#btnHard").disabled = !el("#btnHard").disabled ;  
		el("#btnStart").disabled = !el("#btnStart").disabled ;
 
	 }
	
function show_table(){
		 array.forEach((Element,i) => {//9 array of rows
			Element.forEach((cell,j)=>{//9 array of column
				if(cell>0){
					el('#c'+i+j).innerHTML=cell;
				}else{
					el('#c'+i+j).innerHTML="";
				}
		
			});
		});
	   
	};
	
function startGame(){
	if(gameNow){
		el("#btnStart").value = "Sudoku Spielen";
		setPause();			
		gameNow=false;
	}else{
		gameNow = true;	
		startTimer();
		show_table();	
		el("#btnStart").value = "Stop Sudoku !!";
		};
		
	};

function restGame(){
	zeit = 0 ;
	for (let i = 0 ; i < 9 ; i ++ ){
		for ( let j = 0 ; j < 9 ; j ++){
			array[i][j]=arrayBackUp[i][j];
		};
	};
	iniT_SelectedNumber();
	startGame();
	el("#resetbtn").disabled = true;
	lives = 3;
	el("#life").value =lives ;
};	


function deleteNumber(e){
	if ( e.key === "Delete" && gameNow
	 && arrayBackUp[newX][newY] === 0){

		el("#c"+newX+newY).innerHTML = "";		
		ziel ++ ;

		if(isNumberDone(array[newX][newY])){
			el("#n"+array[newX][newY]).addEventListener("click",addNumber);
		}
		array[newX][newY] = 0;
	};	
}


function ini_Main(){

	iniT_SelectedNumber();
	array = iniT_Array();
	init_cell_of_div();
	}

ini_Main();
