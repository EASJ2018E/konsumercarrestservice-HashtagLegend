import axios, {AxiosResponse, AxiosError} from "../../node_modules/axios/index";

//http://rest-pele-easj-dk.azurewebsites.net/api/cars

interface ICar{
    model: string;
    vendor: string;
    price: number;
}

let getCarsButton: HTMLButtonElement = document.getElementById("getAll") as HTMLButtonElement
getCarsButton.addEventListener("click", getAllCars)

let content: HTMLDivElement = document.getElementById("content") as HTMLDivElement

function getAllCars(): void{
let uri: string = "http://rest-pele-easj-dk.azurewebsites.net/api/cars";

//axios.get <typen der returneres, kan evt være et array[]> (indsæt uri hvor data ligger)
axios.get<ICar[]>(uri)
//så laves der en funktion der har en parameter "response" af typen AxiosResponse, der modtager et ICar array.
.then(function(response: AxiosResponse<ICar[]>):void{
    let result: string = "<ol>"
    //
    response.data.forEach((car : ICar) => {
        result += "<li> <b>model:</b> " + car.model + " <b>Vendor: </b>" + car.vendor + "<b>Price: </b>" + car.price + "</li>"
    })
        result += "</ol>"

        content.innerHTML = result;
    
})

//hvis der sker en fejl, så udskriver div tagget en fejl besked i stedet.
.catch(function(error: AxiosError) :void{
    content.innerHTML = error.message
})


}

