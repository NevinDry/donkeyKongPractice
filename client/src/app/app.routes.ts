import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import { MyBoardComponent } from './components/my-board/my-board.component';
import { AuthGuardService } from './guards/auth.guard';


const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'myBoard',
        component: MyBoardComponent,
        canActivate: [AuthGuardService] 
    },
    // otherwise redirect to home
    {
        path: '**',
        redirectTo: '/home',
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
