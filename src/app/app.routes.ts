import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component'


const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
  
    // otherwise redirect to home
    {
        path: '**',
        redirectTo: '/home'
    }
];

@NgModule(
    {
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ]
    })
export class AppRoutingModule {
}
