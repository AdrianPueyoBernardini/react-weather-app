import { useState } from "react";
import { DataDisplay } from './Data'
import { Header } from './Header'


export const WeatherApp = () =>{
    const [city, setCity] = useState("zaragoza");
    return(
        <div>
            <Header setCity={setCity} title={"TEMPODATA"}/>
            <DataDisplay city={city}/>

        </div>
    );
}