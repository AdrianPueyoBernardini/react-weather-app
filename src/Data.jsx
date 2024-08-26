import { useState, useEffect} from "react";
const apiKey = "607a59022f661eeeb9a4aac9ab98eb91";
let lang = "es";



export const Alert = ({temp}) =>{

    const checkTemp = () =>{
        if(temp<-10){
            return { message: "ALERTA: Temperatura extremadamente baja", color: "#49eaff" , img:`${import.meta.env.BASE_URL}danger.png`}


        }else if(temp>=-10 && temp<0){

            return { message: "ALERTA: Temperatura muy baja", color: "lightblue" , img:`${import.meta.env.BASE_URL}danger.png`};

        }else if(temp>=0 && temp<10){

            return { message: "Temperatura baja", color: "lightblue" , img:`${import.meta.env.BASE_URL}smile.png`};
        }else if(temp>=10 && temp<25){

            return { message: "Temperatura sin riesgo", color: "green" , img:`${import.meta.env.BASE_URL}smile.png`};

        }else if(temp>=25 && temp<30){
            
            return { message: "Temperatura cálida", color: "orange" , img:`${import.meta.env.BASE_URL}smile.png`};

        }else if(temp>=30 && temp<40){
            
            return { message: "Temperatura alta", color: "orange" , img:`${import.meta.env.BASE_URL}danger.png`};

        }else if(temp>=40){
            
            return { message: "ALERTA: Temperatura extremadamente alta", color: "red" , img:"/danger.png"};

        }
    }
    const alertInfo = checkTemp(temp);

    return(
        <div className="alertPanel" style={{backgroundColor:alertInfo.color}}>
            {
                <>
                    <img src={alertInfo.img} alt="status img" className="alert__img"/>
                    <p className="alert__p">{alertInfo.message}</p>
                </>
            }
        </div>
    );
}

export const ErrorAdvice = ({err=false}) =>{
    
    return(
        <>
            {   
            
                    err?
                    (
                        <div className="ErrorMsgDiv">
                            <p className="ErrorMsgDiv__p">Ciudad no encontrada</p>
                        </div>
                    )
                    :
                    (
                        <div className="NoErrorMsgDiv">
                            <p className="ErrorMsgDiv__p">NO HAY ERROR</p>
                        </div>
                    )

            }
        </>

    );
}


export const DataDisplay = ({ city }) =>{

    const kelvinToCelsius = (kelvin=0) => kelvin - 273.15;

    const [cityData, setCityData] = useState(null);
    const [err, setNewErr] = useState(false);


    useEffect(()=>{
        if(!city){
            console.log("cadena vacia");
            //MENSAJE: DEBES INTRODUCIR UNA CIUDAD
            return;
        }

        let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city +  "&appid=" + apiKey + "&lang=" + lang;

        const fetchCities = async()=>{
            try {
                let response = await fetch(apiUrl);
                let dataJSON = await response.json();
                if (!response.ok){
                    setNewErr(true);
                    throw new Error("Error en la solicitud");
                    //MENSAJE: LA CIUDAD NO EXISTE
                }else{
                    setNewErr(false);
                }


                setCityData(dataJSON);
    
    
                console.log(dataJSON);
    
            } catch (error) {
                console.log(error);
            }
        };
        fetchCities();
    },[city]);

    return(
        <div className="dataBody">
            <ErrorAdvice err={err}/>
            {
                cityData?
                    (
                        <>
                            <div className="dataCard">
                                <div className="dataCard__cityDiv">
                                    <p className="">El tiempo en: </p>
                                    <h2 className="dataCard__city__h2">{cityData.name}</h2>
                                </div>

                                <div className="dataCard__tempDiv">
                                    <p className="dataCard__temp__description">{cityData.weather[0].description}</p>
                                    <div className="dataCard__tempDiv__1">
                                        <img src={"https://openweathermap.org/img/wn/" + cityData.weather[0].icon + "@4x.png"} alt="img" />
                                        <p className="dataCard__temp__p">{kelvinToCelsius(cityData.main.temp).toFixed(0) + "°"}</p>
                                    </div>
                                    <div className="dataCard__tempDiv__2">
                                        <p className="dataCard__tempSens__p">Sensación térmica de: </p>
                                        <p className="dataCard__tempSens__p2">{kelvinToCelsius(cityData.main.feels_like).toFixed(0) + "°"}</p>
                                    </div>
                                </div>
                                <div className="dataCard__extraInfo">
                                    <div className="dataCard__extraInfo__humidity">
                                        <p className="dataCard__Hum__p1">Humedad: </p>
                                        <p className="dataCard__Hum__p2">{cityData.main.humidity + "%"}</p>
                                    </div>
                                    <div className="dataCard__extraInfo__wind">
                                        <p className="dataCard__Hum__p1">Aire: </p>
                                        <p className="dataCard__Hum__p2">{cityData.wind.speed + "km/h"}</p> 
                                    </div>
                                    <div className="dataCard__extraInfo__maxmin"> 
                                        <div className="dataCard__extraInfo__max">
                                            <p>Max:</p>
                                            <p className="dataCard__minmax__p">{kelvinToCelsius(cityData.main.temp_max).toFixed(0) + "°"}</p>
                                        </div>
                                        <div className="dataCard__extraInfo__max">
                                            <p>Min:</p>
                                            <p className="dataCard__minmax__p">{kelvinToCelsius(cityData.main.temp_min).toFixed(0) + "°"}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <Alert temp={kelvinToCelsius(cityData.main.temp).toFixed(0)}/>
                        </>

                    )
                    :
                    (
                        <div className="dataCard">
                            <div className="dataCard__cityDiv">
                                <p className="">El tiempo en: </p>
                                <h2 className="dataCard__city__h2">Cargando...</h2>
                            </div>

                            <div className="dataCard__tempDiv">
                                <p className="dataCard__temp__description">Cargando...</p>
                                <div className="dataCard__tempDiv__1">
                                    <img src="" alt="img" />
                                    <p className="dataCard__temp__p">Cargando...</p>
                                </div>
                                <div className="dataCard__tempDiv__2">
                                    <p className="dataCard__tempSens__p">Sensación térmica de: </p>
                                    <p className="dataCard__tempSens__p2">Cargando...</p>
                                </div>
                            </div>
                            <div className="dataCard__extraInfo">
                                <div className="dataCard__extraInfo__humidity">
                                    <p className="dataCard__Hum__p1">Humedad: </p>
                                    <p className="dataCard__Hum__p2">Cargando...</p>
                                </div>
                                <div className="dataCard__extraInfo__wind">
                                    <p className="dataCard__Hum__p1">Aire: </p>
                                    <p className="dataCard__Hum__p2">Cargando...</p> 
                                </div>
                                <div className="dataCard__extraInfo__maxmin"> 
                                    <div className="dataCard__extraInfo__max">
                                        <p>Max:</p>
                                        <p className="dataCard__minmax__p">Cargando...</p>
                                    </div>
                                    <div className="dataCard__extraInfo__max">
                                        <p>Min:</p>
                                        <p className="dataCard__minmax__p">Cargando...</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
            }

        </div>
    );
}
