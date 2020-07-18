
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface UserId {
    id: string;
}

export interface IQuery {
    navigations(): Navigation[] | Promise<Navigation[]>;
    navigation(id: string): Navigation | Promise<Navigation>;
    me(): User | Promise<User>;
    users(): User[] | Promise<User[]>;
    user(id: string): User | Promise<User>;
}

export interface IMutation {
    createNavigation(name?: string, url?: string, icon?: string, users?: UserId[]): Navigation | Promise<Navigation>;
    updateNavigation(id: string, name?: string, url?: string, icon?: string, users?: UserId[]): Navigation | Promise<Navigation>;
    removeNavigation(id: string): RemoteNavigationId | Promise<RemoteNavigationId>;
    login(username?: string): string | Promise<string>;
    createUser(name?: string, age?: number, password?: string): User | Promise<User>;
    updateUser(id: string, name?: string, age?: number, password?: string): User | Promise<User>;
    removeUser(id: string): RemoteUserId | Promise<RemoteUserId>;
}

export interface Navigation {
    id: string;
    name?: string;
    url?: string;
    icon?: string;
    users: User[];
}

export interface RemoteNavigationId {
    id: string;
}

export interface User {
    id: string;
    name?: string;
    age?: number;
    password?: string;
    navigations: Navigation[];
}

export interface RemoteUserId {
    id: string;
}
