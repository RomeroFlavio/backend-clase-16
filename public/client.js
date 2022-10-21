const socket = io.connect();

const validation = () => {
    const author = document.getElementById('author');
    author.addEventListener('change', event =>{
        document.getElementById('message').disabled = false;
        document.getElementById('btnMessage').disabled = false;
    });
};
 
const addMessage = () => {
    const author = document.getElementById('author').value;
    const message = document.getElementById('message').value;
    const today = new Date();
    const date = today.toLocaleString('en-GB');
    socket.emit('new-Message', { author, message, date });
    return false;
};

const renderProduct = data => {
    const arrayProducts = JSON.parse(data);
    const html = arrayProducts.map((element) => {
        return (`
            <tr>
                <td><h4>${element.title}</h4></td>
                <td><h4>${element.price}</h4></td>
                <td><img src="${element.thumbnail}" class="rounded" width="75"/></td>
            </tr>
        `);
    }).join(" ");
    document.getElementById('products').innerHTML = html;
    socket.emit('products-shown', 'Productos mostrados');
};

const renderChat = data => {
    const arrayChat = JSON.parse(data);
    const html = arrayChat.map((element) => {
        return (`
            <b style="color=blue">${element.author}</b>
            <p style="color=#E59866">${element.date}</p>
            <p style="color=green"><i>${element.message}</i></p>
        `);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
    socket.emit('message', 'Chat mostrado');
}

socket.on('products', data => {
    renderProduct(data);
});
 
socket.on('save-Message', data => {
    console.log(data);
    renderChat(data);
    document.getElementById('message').value = "";
});