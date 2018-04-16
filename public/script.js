$(function(){
    let mytext=$("#mytext")
    let submit=$("#submit")
    let speech=$("#speech")
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    submit.click(()=>{
        let thing=mytext.val()
        if(!thing.match(/^http/)&&!thing.match(/\.(png|gif|jpg|jpeg)$/)){
        $.get(`api/search/${thing}`,function(data){
            console.log(data)
        })
    }
    else{
        $.get(`/api/searchvisual/${thing}`,(data)=>{
            console.log(data)
        })

    }
    })
    speech.click(()=>{
        recognition.start()
    })
    recognition.addEventListener('speechstart', () => {
        console.log('Speech has been detected.');
      });
      
      recognition.addEventListener('result', (e) => {
        console.log('Result has been detected.');
      
        let last = e.results.length - 1;
        let text = e.results[last][0].transcript;
        console.log(text)
      
        mytext.textContent = text;
        
        $.get(`api/search/${text}`,function(data){
            console.log(data)
            if(data==null){

            }
        })
        console.log(mytext)
        console.log('Confidence: ' + e.results[0][0].confidence);
      
        
      });
      recognition.addEventListener('speechend', () => {
        recognition.stop();
      });
      recognition.addEventListener('error', (e) => {
        console.log(e)
      });
      

})