import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { TodoListComponent } from './todo-list/todo-list.component';

const mfeAppURL = "http://localhost:4300/remoteEntry.js"

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  // {path:'todo-list', component:TodoListComponent}
  { path: 'todo-list', 
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: mfeAppURL,
        remoteName: "mfeApp",
        exposedModule: "./TodoListModule"
      }).then(m => m.TodoListModule).catch(err => console.log(err));
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

