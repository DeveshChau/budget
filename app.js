const UIController = (function () {
    const DOMString = {
        add__type: '.add__type',
        add__description: '.add__description',
        add__value: '.add__value',
        add__btn: '.add__btn'
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMString.add__type).value,
                description: document.querySelector(DOMString.add__description).value,
                value: document.querySelector(DOMString.add__value).value
            }
        },
        getDOMString: function () {
            return DOMString;
        }
    }
})();

const DataController = (function () {

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
    const ctrlAddItems = function() {
        const input = uiCtrl.getInput();
        console.log(input);        
    }
    return {
        init: function() {
            console.log('Application started.')
            setUpEventListener();
        }
    }
})(UIController, DataController);
Controller.init();