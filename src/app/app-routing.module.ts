import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { RecipesComponent } from "./components/page/recipes/recipes.component";


const routes: Routes = [
    {path: "",component: RecipesComponent},
    {path: "tag/:tag",component: RecipesComponent},
    {path: "search/:search",component: RecipesComponent},
    {path: "**",component: RecipesComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})


export class AppRoutingModule{}