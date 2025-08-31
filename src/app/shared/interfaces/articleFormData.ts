export interface ArticleFormData {
    articleId?:string
    title?: string;
    categoryId?: number;
    visibility?: string;
    content?: string;
    img?:string;
    createTime?:string;
    categoryName:String;
    markdown?:String;
}