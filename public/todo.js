var myapp=angular.module('recapp',['ngRoute','ngStorage'])
myapp.controller('logincontroller',['$location','$http','$rootScope','$sessionStorage','recappservice',function($location,$http,$rootScope,$sessionStorage,recappservice){
    var main=this;
    
    console.log(recappservice.loggedin.x)
    this.clicking=function(){
     var mydata={
         userid:main.userId
     }
     $http.post('/api/login',mydata)
     .then((response)=>{
         console.log(response)
         if(response.data.user){
             recappservice.loggedin.x=true
             console.log(recappservice.loggedin.x)
             recappservice.loggedin.userid=response.data.user.userid  
             console.log(recappservice.loggedin.userid)
             $location.path('/home')

         }

     })
     .catch((err)=>{

     })
    }
}])
myapp.controller('homecontroller',['$location','recappservice','$http','$sessionStorage',function($location,recappservice,$http,$sessionStorage){
var main=this
console.log(recappservice.loggedin.userid)
this.data=null
this.purchasedata=null
this.searching=function(){
    $location.path('/search')
}
$http.get(`/api/recommend/${recappservice.loggedin.userid}`)
.then((response)=>{
    main.data=response.data
    console.log(main.data)
})
.catch((err)=>{
    console.log(err)
})
$http.get('/api/recommendpurchases')
.then((response)=>{
    main.purchasedata=response.data
    console.log(main.purchasedata)
})
.catch((err)=>{

})


}])
myapp.controller('searchcontroller',['$location','$http',function($location,$http){
    var main=this;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    this.searchedata=null
    this.searching=function(){
        main.searchedata=null
        var data=main.data
        $http.get(`/api/search/${data}`)
        .then((response)=>{
            main.searchedata=response.data
            console.log(main.searchedata)

        })

    }
    this.listening=function(){
        recognition.start()
    }
    recognition.addEventListener('speechstart', () => {
        console.log('Speech has been detected.');
      });
      
      recognition.addEventListener('result', (e) => {
        console.log('Result has been detected.');
      
        let last = e.results.length - 1;
        let text = e.results[last][0].transcript;
        console.log(text)
      
        main.data= text;
        
        $.get(`api/search/${text}`,function(data){
            console.log(data)
            if(data==null){

            }
        })
        $.get(`/api/search/${text}`)
        .then((response)=>{
            main.searchedata=response.data
            console.log(main.searchedata)

        })
        .catch((err)=>{
            console.log(err)
        })

        console.log(main.data)
        console.log('Confidence: ' + e.results[0][0].confidence);
      
        
      });
      recognition.addEventListener('speechend', () => {
        recognition.stop();
      });
      recognition.addEventListener('error', (e) => {
        console.log(e)
      });
}])