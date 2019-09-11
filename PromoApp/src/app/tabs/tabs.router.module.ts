import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'vault', loadChildren: '../vault/vault.module#VaultPageModule' },
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule'  },
      { path: 'post/:id', loadChildren: '../post/post.module#PostPageModule' },
      { path: 'edit-profile', loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule' }
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsRoutingModule {}
