import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { MarkdownViewerComponent } from './pages/markdown-viewer/markdown-viewer.component';
import { StyleTestComponent } from './pages/style-test/style-test.component';
import { CategoryViewerComponent } from './pages/category-viewer/category-viewer.component';
import { LoadingScreenComponent } from './core/loading-screen/loading-screen.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full',component:HomeComponent },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  // {path:'newblog',component:NewBlogComponent},
  {path:'tools',loadChildren:()=>import('./pages/tools/tools.component').then(m=>m.ToolsComponent)},
  {path:'tools/reflexes',loadChildren:()=>import('./pages/reflexes-test/reflexes-test.component').then(m=>m.ReflexesTestComponent)},
  {path:'tools/typing',loadChildren:()=>import('./pages/typing/typing.component').then(m=>m.TypingComponent)},
  {path:'view/:id',component:MarkdownViewerComponent},
  {path:'style-test',component:StyleTestComponent},
  {path:'tools/free-cell',loadChildren:()=>import('./pages/free-cell/free-cell.component').then(m=>m.FreeCellComponent)},
  {path:'classify-detail',component:CategoryViewerComponent},
  {path:'loading',component:LoadingScreenComponent},
  {path:'tools/chat',loadChildren:()=>import('./pages/aichat/aichat.component').then(m=>m.AIChatComponent)},
  {path:'decide',loadChildren:()=>import('./pages/decide/decide.component').then(m=>m.DecideComponent)},
  {path:'**',component:PageNotFoundComponent},
];
