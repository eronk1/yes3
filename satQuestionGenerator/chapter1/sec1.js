// Solving Linear Equations by Substitution

//randomizes the choices
function randomizer(array){
    let arr = array;
    let newArr  = [];
    for(i=0;i<4;i++){
        while(true){
            let ranNum = Math.floor(Math.random()*4);
            let check = true;
            for(j=0;j<newArr.length;j++){
                if(newArr[j]==arr[ranNum]){
                    check = false;
                }
            }
            if(check){
                newArr.push(arr[ranNum]);
                break;
            }
        }
    }
    return newArr;
}

//x^1 = x
function law1(){
    let randomNum = Math.round((Math.random()*99));
    return [1,[randomNum],['x',1,'x']];
}

//x^0 = 1
function law2(){
    let randomNum = Math.round((Math.random())*99);
    return [2,[randomNum],['x',0,'x']];
}

//x^m * x^n = x^(m+n)
function law3(){
    let randomNum;
    let randomNum2;
    let randomNum3;
    while(true){
        randomNum = Math.round((Math.random())*10);
        randomNum2 = Math.round((Math.random())*10);
        randomNum3 = Math.round((Math.random())*10);    
        let pass = true;
        if(randomNum2+randomNum3 == randomNum2*randomNum3){
            pass = false;
        }
        if(randomNum2+randomNum3 == randomNum2-randomNum3){
            pass = false;
        }
        if(randomNum **(randomNum2+randomNum3) == (randomNum*randomNum) ** (randomNum2+randomNum3) ){
            pass = false;
        }
        if(pass){
            break;
        }
    }
    let arr = [[randomNum,randomNum2+randomNum3],[randomNum,randomNum2*randomNum3],[randomNum,randomNum2-randomNum3],[randomNum**2,randomNum2+randomNum3]];
    return [3,[randomNum,randomNum2,randomNum3],randomizer(arr),['x','m','x','n','x','m','n']];
}

// x^m / x^n = 
function law4(){
    let randomNum;
    let randomNum2;
    let randomNum3;
    while(true){
        randomNum = Math.round((Math.random())*10);
        randomNum2 = Math.round((Math.random())*10);
        randomNum3 = Math.round((Math.random())*10);    
        let pass = true;
        if(randomNum2-randomNum3 == randomNum2/randomNum3){
            pass = false;
        }
        if(randomNum2+randomNum3 == randomNum2-randomNum3){
            pass = false;
        }
        if(randomNum **(randomNum2-randomNum3) == (randomNum/randomNum) ** (randomNum2-randomNum3) ){
            pass = false;
        }
        if(pass){
            break;
        }
    }
    let arr = [[randomNum,randomNum2-randomNum3],[randomNum,randomNum2/randomNum3],[randomNum,randomNum2+randomNum3],[randomNum**2,randomNum2+randomNum3]]; 
    return [4,[randomNum,randomNum2,randomNum3],randomizer(arr),['x','m','x','n','x','m','n']];
}

//(x^m)^n = x^(mn)
function law5(){
    let randomNum;
    let randomNum2;
    let randomNum3;
    while(true){
        randomNum = Math.round(Math.random()*10);
        randomNum2 = Math.round(Math.random()*10);
        randomNum3 = Math.round(Math.random()*10);
        let pass = true;
        if(randomNum2*randomNum3 == randomNum2+randomNum3){
            pass = false;
        }
        if(randomNum2*randomNum3 == randomNum2**randomNum3){
            pass = false;
        }
        if(randomNum2*randomNum3 == randomNum2-randomNum3){
            pass = false;
        }
        if(pass){
            break;
        }
    }
    let arr = [[randomNum,randomNum2*randomNum3],[randomNum,randomNum2-randomNum3],[randomNum,randomNum2**randomNum3],[randomNum,randomNum2+randomNum3]];
    return [5,[randomNum,randomNum2,randomNum3],randomizer(arr)];
}

//(xy)^m = x^m y^m
function law6(){
    let randomNum;
    let randomNum2;
    let randomNum3;
    while(true){
        randomNum = Math.round(Math.random()*8+2);
        randomNum2 = Math.round(Math.random()*8+2);
        randomNum3 = Math.round(Math.random()*8+2);
        let pass = true;
        if(randomNum==randomNum2){
            pass = false;
        }
        let ans = (randomNum*randomNum2)**randomNum3;
        if(ans==(randomNum*(randomNum2)**randomNum3)||ans==(randomNum**randomNum3*(randomNum2))||ans==(randomNum**randomNum3*(randomNum2)||ans==(randomNum*randomNum*randomNum3))){
            pass = false;
        }

        if(pass){
            break;
        }
    }
    let arr = [[1,randomNum,randomNum3,randomNum2,randomNum3],[2,randomNum,randomNum3,randomNum2],[3,randomNum,randomNum2,randomNum3],[4,randomNum,randomNum2,randomNum3]];
    return [6,[randomNum,randomNum2,randomNum3],randomizer(arr)];
}

//(x / y)^m = x^m / y^m
function law7(){
    let randomNum;
    let randomNum2;
    let randomNum3;
    while(true){
        randomNum = Math.round(Math.random()*8+2);
        randomNum2 = Math.round(Math.random()*8+2);
        randomNum3 = Math.round(Math.random()*8+2);
        let pass = true;
        let ans = (randomNum/randomNum2)**randomNum3;        
        if(ans==(randomNum**randomNum3)/randomNum2||ans==(randomNum)/(randomNum2**randomNum3)||ans==randomNum/randomNum2){
            pass = false;
        }
        if(pass){
            break;
        }
    }
    let arr = [[1,randomNum,randomNum3,randomNum2,randomNum3],[2,randomNum,randomNum3,randomNum2],[3,randomNum,randomNum3,randomNum2],[4,randomNum,randomNum2]];
    return [7,[randomNum,randomNum2,randomNum3],randomizer(arr)];
}

//x^-m = 1/(x^m)
function law8(){
    let randomNum;
    let randomNum2;
    while(true){
        randomNum = Math.round(Math.random()*8+2);
        randomNum2 = Math.round(Math.random()*8+2);
        let pass = true;
        let ans = randomNum**(-randomNum2);
        
        if(ans==randomNum*randomNum||ans==-1*randomNum**randomNum2||ans==randomNum/randomNum2){
            pass = false;
        }

        if(pass){
            break;
        }
    }
    let arr = [[1,randomNum,randomNum],[2,randomNum,randomNum2],[3,-1*randomNum,randomNum2],[4,randomNum,randomNum2]];
    
    return [8,[randomNum,randomNum2],randomizer(arr)];
}

function getRandomLaw(){
    let random = Math.floor(1+Math.random()*8);
    if(random==1){
        return law1();
    }else if(random==2){
        return law2();
    }else if(random==3){
        return law3();
    }else if(random==4){
        return law4();
    }else if(random==5){
        return law5();
    }else if(random==6){
        return law6();
    }else if(random==7){
        return law7();
    }else if(random==8){
        return law8();
    }
}


module.exports = getRandomLaw();