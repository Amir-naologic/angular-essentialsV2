import { Route } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { KanbanDesignComponent } from "./components/kanban/kanban-design.component";

export const appRoutes: Route[] = [
    { path: '', component: KanbanDesignComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
];
