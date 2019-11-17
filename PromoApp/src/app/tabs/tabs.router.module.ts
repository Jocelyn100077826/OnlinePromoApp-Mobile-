import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core'
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: '',
		component: TabsPage,
		children: [
            { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
            { path: 'vault', loadChildren: '../vault/vault.module#VaultPageModule' },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
			{ path: 'post/:id', loadChildren: '../post/post.module#PostPageModule' },
			{ path: 'code/:id', loadChildren: '../code/code.module#CodePageModule' }
		]
	}	
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsRoutingModule { }