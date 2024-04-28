import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./components/partials/header/header.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from "./angular-material.module";
import { RecipesComponent } from "./components/page/recipes/recipes.component";
import { FormsModule } from "@angular/forms";
import { SearchBarComponent } from "./components/partials/searchBar/searchBar.component";
import { NotFoundComponent } from "./components/partials/not-found/not-found.component";
import { RecipeDetailComponent } from "./components/page/recipe-detail/recipe-detail.component";
import { AuthComponent } from "./components/page/auth/auth.component";

@NgModule({
    declarations:[
        AppComponent,
        HeaderComponent,
        RecipesComponent,
        SearchBarComponent,
        NotFoundComponent,
        RecipeDetailComponent,
        AuthComponent
    ],
    imports:[
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularMaterialModule,
    ],
    providers:[
    provideAnimationsAsync()
  ],
    bootstrap: [AppComponent]
})

export class AppModule{}