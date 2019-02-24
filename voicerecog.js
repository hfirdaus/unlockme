window.onload = function () {

    var prompt = document.getElementById('prompt');
    var result = document.getElementById('result');

    var dict = {
        "aller": "to go",
        "avoir": "to have",
        "être": "to be",
        "faire": "to make",
        "voir": "to see",
        "dire": "to say",
        "falloir": "to be necessary",
        "savoir": "to know",
    //    "bon" : "1",
      //  "test" : "test1"
    };



    var setTestWord = function () {
        var keys = Object.keys(dict);
        prompt.textContent = keys[Math.trunc(keys.length * Math.random())];
    };

    setTestWord();

    var openPhone = function (answer) {
        annyang.abort();
        console.log("openphone");
        // implement, it should wait so the person sees the english word and then it fades and then we go to the new word
        $("#prompt").css('color','blue');
        $("#prompt").fadeOut(1500,function () {
            $(this).text("");
            clearTimeout(micMovement);
            $("#mic").fadeTo("fast",0);
            $("#result").text(answer).fadeIn(1500, function () {
                $(this).delay(1500).fadeOut(1500,function () {
                    $("#login").delay(1500).text("Login!"); // TODO: Change based on Fungai's transition code
                    location.reload();
                });
            });
        });
    };

    let micMovement = setInterval(function () {
        $("#mic").effect("bounce",1000);
    },2000);

    var ifWordDisplayedAndSaid = function (spokenWord) {
        if (prompt.textContent.localeCompare(spokenWord) == 0) {
            //prompt.textContent = "";
            //result.textContent = dict[spokenWord];
            let answer = dict[spokenWord];
            openPhone(answer);
        } else {
            wrongWord();
        }
    };

    var wrongWord = function(){
        console.log("wrongword");
        $("#prompt").css('color',"red");
        $("#prompt").effect("shake","default","default",function () {
            $("#prompt").css('color',"black");
        });
        setTestWord();
    };
    
    if (annyang) {
        // Let's define a command.
        var commands = {
            '*word': ifWordDisplayedAndSaid,
        };

        // Add our commands to annyang
        annyang.addCommands(commands);

        annyang.setLanguage("fr-FR");
        
        annyang.start();
    }
};


