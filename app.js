// necessaries variables

let input= $(".location-input");
let underline= $(".input-underline");
let locationSearchBtn= $(".insert-loc h3");
let loc= $(".new-location");
let maxMinTemp= $(".temperature h3");
let temp=$(".temperature h1");
let weatherIcon= $(".weather-icon");
let description= $(".description");
let infoValue=$(".info-value");
let metric= $(".f, .c");

let metricValue="metric";
let iconPath= __dirname + "/Weather icon/animated/";

//API variables 

let meteo;

let key= "7188bd7effa165e7bd8695e177cc10a1";
let url="https://api.openweathermap.org/data/2.5/weather?units=" + metricValue +"&appid=" + key + "&lang=en&q=" + loc.text().trim();
const xhr= new XMLHttpRequest();

// standard interface settings

input.hide();

// globe btn 

locationSearchBtn.on("click", ()=>{
    locationSearchBtn.hide();
    input.fadeIn("slow");
});


// input underline Animation

input.on("focus", ()=>{
    underline.toggleClass("input-underline-action");
});

input.on("blur", ()=>{
    underline.toggleClass("input-underline-action");
});

//metric set

metric.on("click", (e)=>{

    if(e.target.textContent.toLowerCase().trim() == 'c'){
        if(metric.eq(0).hasClass("active")){
            metric.eq(0).removeClass("active");
        }
        if(!(metric.eq(1).hasClass("active"))){
            metric.eq(1).addClass("active");
        }
        metricValue= "metric";
    }else{
        if(metric.eq(1).hasClass("active")){
            metric.eq(1).removeClass("active");
        }
        if(!(metric.eq(0).hasClass("active")) == true){
            metric.eq(0).addClass("active");
        }

        metricValue= "imperial"
    }

    url="https://api.openweathermap.org/data/2.5/weather?units=" + metricValue +"&appid=" + key + "&lang=en&q=" + loc.text().trim();
    xhr.open("GET", url, true);
    xhr.send();

});


//API standard call

$(document).ready(()=>{
    xhr.open("GET", url, true);
    xhr.send();
});

xhr.onloadend= ()=>{
    if(xhr.status == 404){
        $(".location-text, .new-location").text("");
        $(".its").text("");
        description.text("Place not found, please check if it's spelled correctly");
    }
    
};

xhr.onreadystatechange= ()=>{
    if(xhr.readyState === 4){
        meteo= JSON.parse(xhr.response);
        description.text(()=>{
            return meteo.weather[0].description.trim();
        });
        
        temp.text(()=>{
            return Math.round(meteo.main.temp);
        });
        
        maxMinTemp.text(()=>{
            return Math.round(meteo.main.temp_min) + "° " + "/ " + Math.round(meteo.main.temp_max) + "°";
        });

        if(meteo.weather[0].icon == "50d"){
            weatherIcon.attr("src", "https://openweathermap.org/img/wn/50d@2x.png");
        }else{
            weatherIcon.attr("src", iconPath + (meteo.weather[0].main).toLowerCase() + ".svg");
        }
        
        for(let i=0; i<infoValue.length; i++){
            switch(i){
                case 0:
                    infoValue.eq(i).text(()=>{
                        return Math.round(meteo.wind.speed);
                    });
                    break;
                
                case 1:
                    infoValue.eq(i).text(()=>{
                        return meteo.clouds.all;
                    });
                    break;
                
                case 2:
                    infoValue.eq(i).text(()=>{
                        return meteo.main.humidity;
                    });  
                    break;
            }
           
        }
    }
};


//insert new location 

input.on("change", ()=>{
    
    loc.text(()=>{
        return input.val();
    });

    url="https://api.openweathermap.org/data/2.5/weather?units=" + metricValue +"&appid=" + key + "&lang=en&q=" + loc.text().trim();
    console.log(url);
    xhr.open("GET", url, true);
    xhr.send();

});


