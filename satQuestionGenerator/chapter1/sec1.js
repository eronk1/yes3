// Laws of exponents


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
    return [3,[randomNum,randomNum2,randomNum3],[[randomNum,randomNum2+randomNum3],[randomNum,randomNum2*randomNum3],[randomNum,randomNum2-randomNum3],[randomNum**2,randomNum2+randomNum3]],['x','m','x','n','x','m','n']];
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
    return [4,[randomNum,randomNum2,randomNum3],[[randomNum,randomNum2-randomNum3],[randomNum,randomNum2/randomNum3],[randomNum,randomNum2+randomNum3],[randomNum**2,randomNum2+randomNum3]],['x','m','x','n','x','m','n']];
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
    return [5,[randomNum,randomNum2,randomNum3],[[randomNum,randomNum2*randomNum3],[randomNum,randomNum2-randomNum3],[randomNum,randomNum2**randomNum3],[randomNum,randomNum2+randomNum3]]];
}