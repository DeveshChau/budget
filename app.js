const UIController = (function () {
    const DOMString = {
        add__type: '.add__type',
        add__description: '.add__description',
        add__value: '.add__value',
        add__btn: '.add__btn',
        income__list: '.income__list',
        expenses__list: '.expenses__list'
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMString.add__type).value,
                description: document.querySelector(DOMString.add__description).value,
                value: document.querySelector(DOMString.add__value).value
            }
        },
        addItemList: function (newItem, type) {
            let element;
            if (type === 'inc') {
                element = DOMString.income__list;
                html = `<div class="item clearfix" id="income-%id%">
                <div class="item__description">%description%</div>
                <div class="right clearfix">
                    <div class="item__value">%value%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`;
            } else if (type === 'exp') {
                element = DOMString.expenses__list;
                html = `<div class="item clearfix" id="expense-%id%">
                <div class="item__description">%description%</div>
                <div class="right clearfix">
                    <div class="item__value">%value%</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`;
            }

            newHTML = html.replace('%id%', newItem.ID);
            newHTML = newHTML.replace('%description%', newItem.description);
            newHTML = newHTML.replace('%value%', newItem.value);
            document.querySelector(element).insertAdjacentHTML("beforeend", newHTML)
        },
        getDOMString: function () {
            return DOMString;
        }
    }
})();

const DataController = (function () {
    
    let data = {
        item: {
            inc: [],
            exp: []
        }
    }
    let Income = function (id, description, value) {
        this.ID = id,
            this.description = description,
            this.value = value
    }
    return {
        addItem: function (type, description, value) {
            let ID, newItem
            if (data.item[type].length > 0) {
                ID = data.item[type][data.item[type].length - 1].id + 1;
            } else {
                ID = 0
            }
            if (type === 'inc') {
                newItem = new Income(ID, description, value);
            } else if (type === 'exp') {
                newItem = new Income(ID, description, value);
            }
            data.item[type].push(newItem);
            return newItem;
        }
    }
})();

const Controller = (function (uiCtrl, dataCtrl) {
    const setUpEventListener = function () {
        DOM = uiCtrl.getDOMString();
        document.querySelector(DOM.add__btn).addEventListener('click', ctrlAddItems);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItems();
            }
        });
    }
    const ctrlAddItems = function () {
        const input = uiCtrl.getInput();
        newItem = dataCtrl.addItem(input.type, input.description, input.value);
        uiCtrl.addItemList(newItem, input.type);
    }
    return {
        init: function () {
            console.log('Application started.')
            setUpEventListener();
        }
    }
})(UIController, DataController);
Controller.init();