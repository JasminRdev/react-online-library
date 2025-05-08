//just calling api

const API_KEY ="";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?";

export const getPopulareOnes = async () => {
    const response = await fetch(`${BASE_URL}q=bestseller&maxResults=40`);
    const data = await response.json();
    return data.items
};
// .then(res => res.json())
//   .then(data => {
//     console.log(data.items); // Array of books
//   });


export const searchOnes = async (query) => {
    const response = await fetch(`${BASE_URL}q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.items
};