import React from 'react';
import '../App.css';
import { useState } from 'react';

function  Calculatrice() {
const [values,setValues] = useState(0);
const [Oper,setOper] = useState("");
const operatis= [{rep:"+",func:addition},
{rep:"-",func:soustraction},
{rep:"*",func:multiplication}];
let ListOpes = [];
let ListNumbers = [];


function handleSubmit() {
    let value = 0;
    let operations = Oper;
    //operations.join('')
     //operations = "100+10+1"; // E
    let left = 0;
    let right = 0;
    value = handleOperations(operations)
    console.log(ListNumbers);
    console.log(ListOpes);

    setValues(parseInt(value));
}
let endFind = false;

function calculate() {
let finalVa;
let finalNumber = [];
    let value = ListOpes.find(a=> a.rep=== '*' || a.rep ==='/')
    value.map(a=>{
        a.func()
    })
}

function handleOperations(operation) {

    let val = getNext(0,operation);
    console.log(val);
    if(val === -1) {
        getOperation(operation.length-1,operation);
    } else {
        console.log(val);
        getOperation(val,operation);
    }
}


function getOperation(n, operation) {

   let valOpe =  operatis.find(val => val.rep===operation[n]);
   if(valOpe) {
        let leftValue = cutOper(operation, n);
                let remainingOperations = operation.slice(n + 1);

        ListNumbers.push(leftValue);
        ListOpes.push(valOpe);
        handleOperations(remainingOperations);
              /*

              console.log(remainingOperations);
                console.log(leftValue);

               // console.log(addition(leftValue + handleOperationChoosing(remainingOperations)));
                return valOpe.func(leftValue,handleOperations(remainingOperations));*/
   } else {
        ListNumbers.push(operation);
         /*endFind = true;
                console.log(operation);
                return parseInt(operation);*/
   }
    /*if (operation[n] === '+') {
        let leftValue = cutOper(operation, n);
        let remainingOperations = operation.slice(n + 1);
        console.log(remainingOperations);
        console.log(leftValue);

       // console.log(addition(leftValue + handleOperationChoosing(remainingOperations)));
        return addition(handleOperations(remainingOperations),leftValue);
    }
    if (operation[n] === '-') {
            let leftValue = cutOper(operation, n);
            let remainingOperations = operation.slice(n + 1);

           // console.log(addition(leftValue + handleOperationChoosing(remainingOperations)));
            return soustraction(leftValue, handleOperations(remainingOperations));
        }

     if (operation[n] === '*') {
                let leftValue = cutOper(operation, n);
                let remainingOperations = operation.slice(n + 1);

               // console.log(addition(leftValue + handleOperationChoosing(remainingOperations)));
                return multiplication(leftValue, handleOperations(remainingOperations));
            }
     if (operation[n] === '/') {
                    let leftValue = cutOper(operation, n);
                    let remainingOperations = operation.slice(n + 1);

                   // console.log(addition(leftValue + handleOperationChoosing(remainingOperations)));
                    return division(leftValue, handleOperations(remainingOperations));
                }
    if (operation[n] === '/') {
                        let leftValue = cutOper(operation, n);
                        let remainingOperations = operation.slice(n + 1);

                       // console.log(addition(leftValue + handleOperationChoosing(remainingOperations)));
                        return division(leftValue, handleOperations(remainingOperations));
                    }
    if (n === operation.length - 1) {
        endFind = true;
        console.log(operation);
        return parseInt(operation);
    }*/
    //return 0;
}

function applyOperation() {

}

function getNext(n,operation) {
    let val = -1;
    while(n<operation.length -1) {
        if (operation[n] === '+'|| operation[n] ==='-' ||operation[n] ==='*' || operation[n] ==='/') {
            console.log(operation[n]);
            val = n;
            break;
        }else {
            n++
        }
    }
    console.log(val);
    return val;
}



function cutOper(operation, n) {
    console.log(operation);
    console.log(operation.substring(0, n));
    const leftVal = parseInt(operation.substring(0, n));
    console.log(leftVal);
    return leftVal;
}

function addition(left,right) {
    return left +right;
}
function soustraction(left,right) {
    return left -right;
}
function multiplication(left,right) {
    return left *right;
}
function division(left,right) {
    return left /right;
}
function parenthese(syntax) {
    return (syntax);
}

function handleChangedText(event) {


    setOper(event.target.value);
}
return (
<>
    <input type="text" onChange={e=> handleChangedText(e)}  />
    <br/>
    Type
    <button onClick={handleSubmit} >Calculate</button>
    <br/>
    Operations : {Oper}
    <br/>
    Valeur = {values}

</>
);

}
export default Calculatrice;