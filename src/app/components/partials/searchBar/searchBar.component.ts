import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
    selector:"search-bar",
    templateUrl:"searchBar.component.html",
    styleUrl:"searchBar.component.css"
})

export class SearchBarComponent{

    searchTerm = ""


    constructor(private router: Router,activeRoute:ActivatedRoute){
        activeRoute.params.subscribe( param => {
            if(param.search) this.searchTerm = param.search })}

    search(search: string){
        this.router.navigateByUrl("/search/" + search);
    }

}