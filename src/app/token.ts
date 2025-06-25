import { InjectionToken } from "@angular/core";
import {navConfig} from './shared/interfaces/navConfig'
export const NAV_TOKEN=new InjectionToken<navConfig>('nav_token')
export const ENV=new InjectionToken<string>('logger-environment')
export const TOOLS_TOKEN=new InjectionToken<navConfig>('url_token')