"use strict";

function Component(obj) {

    for (var prop in obj) {
        this[prop] = obj[prop];
    }
}

Component.prototype.setView = function (view, data = null) {
    this.htmlView = view;
    data ? this.data = data : null;
};

Component.prototype.render = function () {

    this.component = document.createElement(this.parent);
    this.component.innerHTML = this.htmlView.replace(/{\w*}/g, replacer.bind(this));

    return this.component;

    function replacer(str) {
        str = str.replace(/{|}/g, "");

        switch (this.parent) {
            case "header":
            case "footer":
                return this[str];
                break;

            case "nav" :
                return this.renderSubItem(this.data);
                break;
        }
    };
};

Component.prototype.delete = function () {
    this.component.remove();
};

Component.prototype.renderSubItem = function (obj) {
    var item = "";

    for (var key in obj) {
        var subitem = "";

        if (obj[key]['items']) {
            subitem = "<ul class='submenu'>" + this.renderSubItem(obj[key]['items']) + "</ul>";
        }

        item += "<li><a href=" + obj[key]['url'] + ">" + obj[key]['name'] + "</a>" + subitem + "</li>";
    }

    return item;
};

//////////////////////////////////////////////
/////////////////////////////////////////////

var componentHeader = new Component({parent: 'header', url: './img/logo.png', title: 'Рога и Копыта'}),
    componentMenu = new Component({parent: 'nav'}),
    componentFooter = new Component({parent: 'footer', text: '&#169; Копирайты'}),
    viewHeader = '<h1><img src="{url}" alt="{title}"/>{title}</h1>',
    viewMenu = '<ul>{li}</ul>',
    viewFooter = '<p><small>{text}</small</p>',
    dataMenu = [
        {
            name: 'Главная',
            url: '#'
        },
        {
            name: 'O нас',
            url: '#',
            items: [
                {
                    name: 'Кто мы', url: '#', items: [
                        {
                            name: 'Рога', url: '#', items: [
                                {name: 'Большие', url: '#'},
                                {name: 'Маленькие', url: '#'}
                            ]
                        },
                        {
                            name: 'Копыта', url: '#', items: [
                                {name: 'Парные', url: '#'},
                                {name: 'Непарные', url: '#'}
                            ]
                        }
                    ]
                },
                {name: 'Где мы', url: '#'},
                {name: 'Откуда', url: '#'}
            ]
        },
        {
            name: 'Контакты',
            url: '#'
        }
    ];

componentHeader.setView(viewHeader);
componentMenu.setView(viewMenu, dataMenu);
componentFooter.setView(viewFooter);
document.body.appendChild(componentHeader.render());
document.body.appendChild(componentMenu.render());
document.body.appendChild(componentFooter.render());