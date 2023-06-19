import type { Photo } from "./main";

const PhotosTBody = document.querySelector('#photos tbody')! as HTMLTableSectionElement;

export function displayPhoto(photo: Photo) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${photo.id}</td>
        <td>${photo.title}</td>
        <td>
            <a href="${photo.url}">View Photo</a>
        </td>
    `;
    PhotosTBody.appendChild(row);
}