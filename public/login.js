const { response } = require("express");

setup();
function setup(){
    let fn_login;
    let ln_login;
    let pass_login;
    let page='main page';
    let temp1=false;
    let temp2=false;
    let video;
    document.getElementById('main_page').style.display='block';
    document.getElementById('main').style.display='none';
    document.getElementById('login').style.display='none';
    document.getElementById('sign_up').style.display='none';
    document.getElementById('back').style.display='none';
    document.getElementById('admin').style.display='none';
    document.getElementById('page').style.display='none';

    document.getElementById('back').addEventListener('click', function(){
        if(page=='main'){
            document.getElementById('main_page').style.display='block';
            document.getElementById('main').style.display='none';
            document.getElementById('login').style.display='none';
            document.getElementById('sign_up').style.display='none';
            document.getElementById('admin').style.display='none';
            document.getElementById('page').style.display='none';
            page='main page';
            document.getElementById('back').style.display='none';
        }
        if(page=='login'){
            document.getElementById('main_page').style.display='none';
            document.getElementById('main').style.display='block';
            document.getElementById('login').style.display='none';
            document.getElementById('admin').style.display='none';
            document.getElementById('sign_up').style.display='none';
            document.getElementById('page').style.display='none';
            page='main';
            document.getElementById('back').style.display='block';
            document.querySelector('body').style.backgroundColor = 'rgb(56, 51, 51)';
        }
        if(page=='signup'){
            document.getElementById('main_page').style.display='none';
            document.getElementById('main').style.display='block';
            document.getElementById('login').style.display='none';
            document.getElementById('admin').style.display='none';
            document.getElementById('sign_up').style.display='none';
            document.getElementById('page').style.display='none';
            page='main';
            document.getElementById('back').style.display='block';
            document.querySelector('body').style.backgroundColor = 'rgb(56, 51, 51)';
        }
        if(page=='page'){
            document.getElementById('main_page').style.display='none';
            document.getElementById('main').style.display='block';
            document.getElementById('login').style.display='none';
            document.getElementById('admin').style.display='none';
            document.getElementById('page').style.display='none';
            document.getElementById('sign_up').style.display='none';
            page='main';
            document.getElementById('back').style.display='block';
        }
    });

    document.getElementById('account').addEventListener('click', function(){
        document.getElementById('main_page').style.display='none';
        document.getElementById('main').style.display='block';
        document.getElementById('login').style.display='none';
        document.getElementById('sign_up').style.display='none';
        document.getElementById('page').style.display='none';
        document.getElementById('admin').style.display='none';
        page='main';
        document.getElementById('back').style.display='block';
    });

    document.getElementById('login_btn').addEventListener('click', function(){
        document.getElementById('main_page').style.display='none';
        document.getElementById('main').style.display='none';
        document.getElementById('login').style.display='block';
        document.getElementById('sign_up').style.display='none';
        document.getElementById('admin').style.display='none';
        document.getElementById('page').style.display='none';
        page='login';
        document.getElementById('back').style.display='block';
        document.querySelector('body').style.backgroundColor = 'white';
    });

    document.getElementById('sign_up_btn').addEventListener('click', function(){
        document.getElementById('main_page').style.display='none';
        document.getElementById('main').style.display='none';
        document.getElementById('login').style.display='none';
        document.getElementById('admin').style.display='none';
        document.getElementById('page').style.display='none';
        document.getElementById('sign_up').style.display='block';
        page='signup';
        document.getElementById('back').style.display='block';
        document.querySelector('body').style.backgroundColor = 'white';
    });

    document.getElementById('login_btn_submit').addEventListener('click', function(){
        pass_login=document.getElementById('pass').value;
        fn_login=document.getElementById('fn').value;
        ln_login=document.getElementById('ln').value;
        if(pass_login == 'adminadmin'){
            document.getElementById('admin').style.display='block';
            document.getElementById('main_page').style.display='none';
            document.getElementById('main').style.display='none';
            document.getElementById('login').style.display='none';
            document.getElementById('page').style.display='none';
            document.getElementById('sign_up').style.display='none';
            page='admin';
            document.getElementById('back').style.display='none';
            admin();
        }
        else{
            login();
        }
        async function login(){
            let response = await fetch('/api');
            let database = await response.json();
            let length_ = database.length;
            for(let i=0; i <= length_ ; i++){
                if(database[i].fn == fn_login){
                    if(database[i].pass == pass_login){
                        if(database[i].ln == ln_login){
                            i = length_;
                            alert('welcome');
                            getTheDatapost();
                        }
                    }
                }
            }

            document.getElementById('pass').value='';
            document.getElementById('fn').value='';
            document.getElementById('ln').value='';
        }
    });

    document.getElementById('sign_up_btn_submit').addEventListener('click', function(){
        sign_up();
    });

    document.getElementById('search_btn').addEventListener('click', () => {
        document.getElementById('tbody').innerHTML = '';
        searchForData();
        async function searchForData(){
            let response = await fetch('/getData');
            let docs = await response.json();
            let length_ = docs.length;
            document.getElementById('tbody').innerHTML = '';
            for(let i=0; i <= length_ ; i++){
                if(docs[i].catigory == document.getElementById('search').value){
                    document.getElementById('tbody').innerHTML += `
                        <div style="background-color: white; border-radius: 15px; pading: 0;margin: 0; border: 2px">
                            <img width="200" src="${docs[i].img}" style=" border-radius: 15px;">
                            <h3>name: ${docs[i].data}</h3>
                            <h3>price: ${docs[i].price}</h3>
                            <h3 style="border-radius: 15px;">phone number: ${docs[i].pn}</h3>
                        </div>
                    `;
                }
            }
        }
    });

    function sign_up(){
        let data = {
            fn: document.getElementById('fn_').value,
            ln: document.getElementById('ln_').value,
            pass: document.getElementById('pass_').value,
        }

        check();
        async function check(){
            let response = await fetch('/check');
            let database = await response.json();
            let length_ = database.length;
            temp1 = false;
            temp2 = 0;
            for(let i=0; i <= length_ ; i++){
                if(database[i].fn == data.fn){
                    if(database[i].pass == data.pass){
                        if(database[i].ln == data.ln){
                            i = length_;
                        }
                        else{
                            temp2++;
                        }
                    }
                    else{
                        temp2++;
                    }
                }
                else{
                    temp2++;
                }
                if(temp2 == length_){
                    save(data);
                    user = data;
                }
                else{
                    alert('this account already exists!');
                }
            }
        }
        document.getElementById('pass_').value='';
        document.getElementById('fn_').value='';
        document.getElementById('ln_').value='';
    }

    function save(docs){
        let options = {
            method: 'Post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(docs),
        };
        add();
        async function add(){
            let response = await fetch('/api', options);
            let res = await response.json();
            alert('saved!');
            document.getElementById('admin').style.display='none';
            document.getElementById('main_page').style.display='none';
            document.getElementById('main').style.display='none';
            document.getElementById('login').style.display='none';
            document.getElementById('page').style.display='block';
            document.getElementById('sign_up').style.display='none';
            page='page';
            document.getElementById('back').style.display='block';
            getTheDatapost();
        }
    }

    function getTheDatapost(){
        document.getElementById('admin').style.display='none';
        document.getElementById('main_page').style.display='none';
        document.getElementById('main').style.display='none';
        document.getElementById('login').style.display='none';
        document.getElementById('page').style.display='block';
        document.getElementById('sign_up').style.display='none';
        page='page';
        document.getElementById('back').style.display='block';
        document.querySelector('body').style.backgroundColor = 'rgb(56, 51, 51)';
        getTheData();
        async function getTheData(){
            let response = await fetch('/getData');
            let docs = await response.json();
            let length_ = docs.length;
            document.getElementById('tbody').innerHTML = '<br>';
            for(let i=0; i <= length_; i++){
                document.getElementById('tbody').innerHTML += `
                    <div style="background-color: white; border-radius: 15px; pading: 0;margin: 0; border: 2px">
                        <img width="200" src="${docs[i].img}" style=" border-radius: 15px;">
                        <h3>name: ${docs[i].data}</h3>
                        <h3>price: ${docs[i].price}</h3>
                        <h3 style="border-radius: 15px;">phone number: ${docs[i].pn}</h3>
                    </div>
                `;
            }
        }
        setInterval(getTheData, 1000);
    }
    noCanvas();
}

function admin(){
    document.getElementById('pass').value='';
    document.getElementById('fn').value='';
    document.getElementById('ln').value='';
    const video = createCapture(VIDEO);
    video.size(320, 240);
    document.getElementById('post').addEventListener('click', function(){
        video.loadPixels();
        let image64 = video.canvas.toDataURL();
        video.remove();
        let newPost = {
            data: document.getElementById('txt').value,
            img:  image64,
            price: document.getElementById('price').value,
            pn: document.getElementById('pn').value,
            catigory: document.getElementById('catigory').value,
        };

        let options = {
            method: 'Post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost),
        }
        newpost();
        async function newpost(){
            let response = await fetch('/post1', options);
            let res = await response.json();
            document.getElementById('main_page').style.display='none';
            document.getElementById('main').style.display='block';
            document.getElementById('login').style.display='none';
            document.getElementById('admin').style.display='none';
            document.getElementById('page').style.display='none';
            document.getElementById('sign_up').style.display='none';
            page='main';
            document.getElementById('back').style.display='block';
        }
    });
}