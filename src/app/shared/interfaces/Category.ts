export interface Category{
    categoryId:number
    categoryName:string
export interface CategorySelect extends Category{
    select:boolean;
}