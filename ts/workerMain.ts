/*
setTimeout(()=> {

  const first = document.querySelector('#number1') as HTMLInputElement;
  const second = document.querySelector('#number2') as HTMLInputElement;

  const result = document.querySelector('.result');

  if (window.Worker) {
    const myWorker = new Worker("./csreports.js");

    [first, second].forEach(input => {
      input.onchange = function() {
        myWorker.postMessage([first.value, second.value]);
        console.log('Message posted to worker');
      }
    })

    myWorker.onmessage = function(e) {
      result.textContent = e.data;
      console.log('Message received from worker');
    }
  } else {
    console.log('Your browser doesn\'t support web workers.');
  }

} , 3000);*/

