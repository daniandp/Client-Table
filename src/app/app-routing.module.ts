import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { CreateClientComponent } from './components/create-client/create-client.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/clientList' },
    { path: 'clientList', component: ClientListComponent },
    { path: 'createClient', component: CreateClientComponent },
    { path: 'editClient/:id', component: CreateClientComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/clientList' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
