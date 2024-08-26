

export const Header = ({setCity, title}) =>{

    const changeValue = (e) =>{
        
        if(e.key ==="Enter"){
            e.preventDefault();
            setCity(e.target.value);
            document.getElementById("searchBar").value="";

            const $dataCard = document.querySelector(".dataCard");
            const $dataAlert = document.querySelector(".alertPanel"); 

            $dataCard.style.animation ="none";
            $dataAlert.style.animation ="none";

            void $dataCard.offsetWidth;
            void $dataAlert.offsetWidth;


            $dataCard.style.animation ="movement 0.5s forwards";
            $dataAlert.style.animation ="movement 0.5s forwards";

            //alertPanel
        }

    }
    return(
            <div className="Header">
                <div className="Header__itemsContainer">
                    <div className="H1__div">
                        <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="" className="H1__img"/>
                        <h1 className="Header__H1">{title}</h1> 
                    </div>
                    <div className="SearchBarContainer">
                        <input type="text" placeholder="  ciudad" id="searchBar" onKeyDown={changeValue} autoComplete="off"/>
                        <img src={`${import.meta.env.BASE_URL}searchIcon.png`} alt="search icon" className="searchIcon"/>
                    </div>

                </div>

                
            </div>
        );
}