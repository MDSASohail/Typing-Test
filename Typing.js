const timer=document.getElementById("timer");
const quote=document.getElementById('quote');
const inputText=document.getElementById("textInput");
const times=document.getElementById("times");
let i=0;
const span=document.getElementsByClassName("span");

let t;     
let timeCalculator=[];
let startStorp;

const url='https://api.quotable.io/random';
let words;

let inputWords;
inputText.addEventListener('input',()=>{
    if(startStorp)
    {
        i=0;
        // console.log("Timer start")
      t=setInterval(()=>{
            timer.innerText=i;
            i+=1;
        },1000);
        startStorp=false;
    }
    inputWords=inputText.value.split(' ');
    inputWords.forEach((item,index)=>{
        if(item===words[index])
        {
            // console.log("Correct",span[index]);
            span[index].classList.remove("inCorrect");
            span[index].classList.add('correct')
        }
        else
        {
            // console.log("Incorrect",span[index])
            span[index]?.classList.add('inCorrect')
        }
        // console.log(words.length,index+1)
        if(words.length==index)
        {
            quote.innerHTML="";
            getQuote();
            inputText.value=""
            clearInterval(t);
            console.log("Eng")
            // timeCalculator.push({words:words.length,time:i})
            addTime()
        }
        
    })
    
})

console.log(times)
function addTime()
{
    console.log("Appending child")
    const p=document.createElement('p');
   
    p.innerHTML=`<span class="timeClass">${words.length}</span> <span class="timeClass">${i}</span>`
    times.appendChild(p)
}
async function getQuote()
{
    startStorp=true;
    // console.log("Times are ",timeCalculator)
     try {
         const q=await fetch(url);
         const quoteParse=await q.json();
       
          words=quoteParse.content.split(' ');
         const div=document.createElement('div');
         div.classList.add("full");
         
         words.forEach(word=>{
            const span=document.createElement('span');
            span.classList.add("span")
            
            span.innerText = word + ' ';
            div.appendChild(span)
         })
         quote.appendChild(div)
        
     } catch (error) {
        console.log("Error in getting quote",error.message);
     }
}

getQuote()
