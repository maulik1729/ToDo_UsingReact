import LocalStorage from "./localstorage";
import JSDataBase from "./JSDataBase";
import {LOCALSTORAGE,JSDB} from '../constants/database'

export default class DataBaseFactory{
    static makeDatabase(type){
        switch(type){
            case JSDB:
                return new JSDataBase();
            case LOCALSTORAGE:
                return new LocalStorage();
        }
    }
}