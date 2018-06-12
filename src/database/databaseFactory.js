import LocalStorage from "./localstorage";
import JSDB from "./jsdb";

export default class DataBaseFactory{
    static makeDatabase(type){
        switch(type){
            case "JSDB":
                return new JSDB();
            case "LocalStorage":
                return new LocalStorage();
        }
    }
}