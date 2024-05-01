import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./components/page/recipes/recipes.component";
import { RecipeDetailComponent } from "./components/page/recipe-detail/recipe-detail.component";
import { AuthComponent } from "./components/page/auth/auth.component";
import { RecipesDataResolver } from "./components/page/recipes/recipes.resolver";


const routes: Routes = [
    {path: "",component: RecipesComponent,resolve: {RecipesDataResolver}},
    {path: "tag/:tag",component: RecipesComponent,resolve: {RecipesDataResolver}},
    {path: "search/:search",component: RecipesComponent,resolve: {RecipesDataResolver}},
    {path: "recipe/:id",component: RecipeDetailComponent,resolve: {RecipesDataResolver}},

    {path: "auth/login",component: AuthComponent},
    {path: "auth/register",component: AuthComponent},
    {path: "**",component: RecipesComponent},
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})


export class AppRoutingModule{}