import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { RecordsComponent } from './components/records/records.component';
import { GameComponent } from './components/game/game.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'preferences', component: PreferencesComponent},
  { path: 'records', component: RecordsComponent},
  { path: 'game', component: GameComponent},
  { path: 'user', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
