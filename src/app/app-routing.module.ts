import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { RecipesComponent } from "./components/page/recipes/recipes.component";
import { RecipeDetailComponent } from "./components/page/recipe-detail/recipe-detail.component";


const routes: Routes = [
    {path: "",component: RecipesComponent},
    {path: "tag/:tag",component: RecipesComponent},
    {path: "search/:search",component: RecipesComponent},
    {path: "recipe/:id",component: RecipeDetailComponent},
    {path: "**",component: RecipesComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})


export class AppRoutingModule{}