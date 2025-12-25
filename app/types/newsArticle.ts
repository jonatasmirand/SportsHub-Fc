export interface NewsArticle {
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    source: {
        name: string;
    };
};