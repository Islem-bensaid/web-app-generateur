export class CriteriaSearch {
    key: String;
    value: String;
    specificSearch: String;

    constructor(key: String, value: String, specificSearch: String){
        this.key = key;
        this.value = value;
        this.specificSearch = specificSearch;
    }
}