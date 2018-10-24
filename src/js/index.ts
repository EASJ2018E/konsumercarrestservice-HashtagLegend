import axios, {AxiosResponse, AxiosError} from "../../node_modules/axios/index";

//http://rest-pele-easj-dk.azurewebsites.net/api/cars

interface ICar{
    model: string;
    vendor: string;
    price: number;
}

const uri: string = "http://rest-pele-easj-dk.azurewebsites.net/api/cars";

let getCarsButton: HTMLButtonElement = document.getElementById("getAll") as HTMLButtonElement
getCarsButton.addEventListener("click", getAllCars)

let addCarButton: HTMLButtonElement = document.getElementById("addCar") as HTMLButtonElement
addCarButton.addEventListener("click", addCar)

let deleteCarButton: HTMLButtonElement = document.getElementById("deleteCar") as HTMLButtonElement
deleteCarButton.addEventListener("click", deleteCar)

let content: HTMLDivElement = document.getElementById("content") as HTMLDivElement

function getAllCars(): void{

//axios.get <typen der returneres, kan evt være et array[]> (indsæt uri hvor data ligger)
axios.get<ICar[]>(uri)
//så laves der en funktion der har en parameter "response" af typen AxiosResponse, der modtager et ICar array.
.then(function(response: AxiosResponse<ICar[]>):void{
    let result: string = "<ol>"
    //
    response.data.forEach((car : ICar) => {

        if(car == null)
        {
            result += "<li> Null Element </li>"
        }
        else
        {
            result += "<li> <b>model:</b> " + car.model + " <b>Vendor: </b>" + car.vendor + "<b>Price: </b>" + car.price + "</li>"
        }
    })
        result += "</ol>"

        content.innerHTML = result;
    
})

//hvis der sker en fejl, så udskriver div tagget en fejl besked i stedet.
.catch(function(error: AxiosError) :void{
    content.innerHTML = error.message
})


}

//Laver et axios post kald.
function addCar():void{

let addModelElm: HTMLInputElement = document.getElementById("model") as HTMLInputElement
let addVendorElm: HTMLInputElement = document.getElementById("vendor") as HTMLInputElement
let addPricelElm: HTMLInputElement = document.getElementById("price") as HTMLInputElement

//henter indholdet fra input elementerne på html siden og sætter dem i de nye variabler.
let myModel: string = addModelElm.value;
let myVendor: string = addVendorElm.value;
let myPrice: number = +addPricelElm.value;

//Laver et post af typen iCar, giver uri hvor kaldet skal sendes hen, så sætter den derefter parametre på en iCar og sender dem med i kaldet.
//.then
axios.post<ICar>(uri, {model:myModel, vendor:myVendor, price:myPrice})
    .then((response: AxiosResponse) => {console.log(response.status + " " + response.statusText)})
}

function deleteCar<ICar>():void{
    let model: HTMLInputElement = document.getElementById("deleteModel") as HTMLInputElement
    let newUri = uri + "/" +model.value
    axios.delete(newUri)
    .then((response: AxiosResponse) => {console.log(response.status)})
      

}


