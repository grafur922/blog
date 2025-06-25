import { Routes } from '@angular/router';
import { NewBlogComponent } from './core/new-blog/new-blog.component';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ToolsComponent } from './pages/tools/tools.component';
import { ReflexesTestComponent } from './pages/reflexes-test/reflexes-test.component';
import { TypingComponent } from './pages/typing/typing.component';
import { MarkdownViewerComponent } from './pages/markdown-viewer/markdown-viewer.component';
import { StyleTestComponent } from './pages/style-test/style-test.component';
import { FreeCellComponent } from './pages/free-cell/free-cell.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full',component:HomeComponent },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  {path:'newblog',component:NewBlogComponent},
  {path:'tools',component:ToolsComponent},
  {path:'tools/reflexes',component:ReflexesTestComponent},
  {path:'tools/typing',component:TypingComponent},
  {path:'view/:id',component:MarkdownViewerComponent},
  {path:'style-test',component:StyleTestComponent},
  {path:'tools/free-cell',component:FreeCellComponent},
  {path:'**',component:PageNotFoundComponent},
];
