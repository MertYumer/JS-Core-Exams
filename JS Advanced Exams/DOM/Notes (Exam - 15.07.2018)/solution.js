function addSticker() {
    const inputTitle = document.getElementsByTagName('input')[0];
    const title = inputTitle.value;

    const inputText = document.getElementsByTagName('input')[1];
    const text = inputText.value;

    const stickerList = document.getElementById('sticker-list');

    if (title && text) {
        const li = document.createElement('li');
        li.classList.add('note-content');

        const a = document.createElement('a');
        a.classList.add('button');
        a.textContent = 'x';
        a.addEventListener('click', () => li.remove());

        const h2 = document.createElement('h2');
        h2.textContent = title;

        const hr = document.createElement('hr');

        const p = document.createElement('p');
        p.textContent = text;

        li.appendChild(a);
        li.appendChild(h2);
        li.appendChild(hr);
        li.appendChild(p);

        stickerList.appendChild(li);
    }

    inputTitle.value = '';
    inputText.value = '';
}