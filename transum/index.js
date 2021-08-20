    let tried=false
    if(document.querySelectorAll('#Checkbutton')[0]){
        document.querySelectorAll('.Dontshowforprinting')[0].outerHTML+=`
            <iframe id='aimedtuba-control-bar' src='about:blank'></iframe>
            <style>
                #aimedtuba-control-bar{
                    width:100vw;
                    height:30px;
                    overflow-x:auto;
                    border:none;
                }
            </style>
        `
        document.getElementById('aimedtuba-control-bar').contentDocument.write(`
            <a id='aimedtuba-sus'hidden></a>
            <button id='aimedtuba-control-bar-button' onclick="aimedtuba.instant_answer.change()">Auto Check</button>
            <button id='aimedtuba-control-bar-button' onclick="aimedtuba.instant_complete.change()">Auto Complete</button>
            <button id='aimedtuba-control-bar-button' onclick="aimedtuba.beta.change()">Insert Answers (BETA)</button>
            <script>
                let aimedtuba={
                    instant_answer:{
                        do:false,
                        change () {
                            if(aimedtuba.instant_answer.do==false)
                            {aimedtuba.instant_answer.do=true}else
                            {aimedtuba.instant_answer.do=false}
                        },
                    },                                
                    instant_complete:{
                        do:false,
                        change () {
                            if(aimedtuba.instant_complete.do==false)
                            {aimedtuba.instant_complete.do=true}else
                            {aimedtuba.instant_complete.do=false}                                    
                        },
                    },
                    beta:{
                        do:false,
                        change () {
                            if(aimedtuba.beta.do==false)
                            {aimedtuba.beta.do=true}else
                            {aimedtuba.beta.do=false}                                    
                        },
                    }
                }
                setInterval(function(){document.getElementById('aimedtuba-sus').innerHTML=JSON.stringify(aimedtuba)},100)
            </script>
            <style>
                #aimedtuba-control-bar-button{
                    color:white;
                    background-color:transparent;
                    border:1px solid white;
                    height:23px;
                }
            </style>
        `)
            document.querySelectorAll('#Checkbutton')[0].outerHTML='<a href="javascript:void(0);" class="ButNew ButCheck" id="Checkbutton" tabindex="13" onclick="checkAnswers();" title="Double-click this button to float it">Check</a>'
            setInterval(function(){
                let aimedtuba=JSON.parse(document.getElementById('aimedtuba-control-bar').contentDocument.getElementById('aimedtuba-sus').innerHTML)
                if(aimedtuba.instant_answer.do==true){
                    document.querySelectorAll('#Checkbutton')[0].click()
                }
                if(aimedtuba.instant_complete.do==true){
                    if(tried==false){tried=true
                        var script = document.createElement('script'); 
                        script.innerHTML = ` 

                            if(checkAnswers.toString().includes("AnswerRight = false;")){
                                    eval(${'`'}
                                        checkAnswers=function(){
                                            $${'{'}replaceLast(checkAnswers.toString().replaceAll("AnswerRight = false;","AnswerRight = true;").replaceAll(''+"'"+').val() != "") {',"')) {").replace('function checkAnswers() {',''),'}','')}
                                        }
                                        checkAnswers()
                                    ${'`'})
                            }
                            function replaceLast(x, y, z){
                                var a = x.split("");
                                var length = y.length;
                                if(x.lastIndexOf(y) != -1) {
                                    for(var i = x.lastIndexOf(y); i < x.lastIndexOf(y) + length; i++) {
                                        if(i == x.lastIndexOf(y)) {
                                            a[i] = z;
                                        }
                                        else {
                                            delete a[i];
                                        }
                                    }
                                }
                            
                                return a.join("");
                            }
                        `;
                        document.getElementsByTagName('head')[0].appendChild(script);    
                    }
                    document.querySelectorAll('#Checkbutton')[0].click()
                }
                if(aimedtuba.beta.do==true){
                    var script = document.createElement('script'); 
                    script.innerHTML = ` 
                        checkAnswers.toString().split("').val().toUpperCase()) == '").forEach(function(item,index){
                            if(index!=0){
                                document.querySelectorAll('input[name=Guess'+index+']')[0].value=item.split("'")[0]
                            }
                        })
                    `
                    document.getElementsByTagName('head')[0].appendChild(script);    
                }
            },100)
    }