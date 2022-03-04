class Calculator {
    constructor() {
        this.totalCost = new TotalCost();
        //DOM elements
        this.inputs = document.querySelectorAll('.form__input');
        this.selectInput = document.querySelector('.select__input');
        this.packages = document.querySelectorAll('.select__dropdown  li');
        this.accountingChexbox = document.querySelector('#accounting');
        this.terminalChexbox = document.querySelector('#terminal');
        this.totalPrice = document.querySelector('.total__price');
        this.itemPrices = document.querySelectorAll('.item__price');
        this.packageLists = document.querySelectorAll('.select__dropdown li');
        this.checkboxs = document.querySelectorAll('.form__checkbox input[type="checkbox"]')

        //INTERFACE
        this.productPrice = 10;
        this.orderPrice = 2;
        this.basicPackagePrice = 20;
        this.proffesionalPackagePrice = 50;
        this.premiumPackagePrice = 100;
        this.accounting = 20;
        this.rental = 15;

        //LISTENERS
        //inputs
        this.inputs.forEach(input => {
            input.addEventListener("input", this.inputCalc.bind(this))
        });
        //show ul list
        this.selectInput.addEventListener("click", this.showList.bind(this));
        //hide list after select list item
        this.packageLists.forEach(packageList => {
            packageList.addEventListener("click", this.selectPackage.bind(this))
        })
        // checkboxs
        this.checkboxs.forEach(checkbox => {
            checkbox.addEventListener("change", this.selectCheckbox.bind(this))
        })

    }
    //METHODS
    // inputs
    inputCalc(e) {
        let value = e.target.value * 1;
        const id = e.target.id;
        if (!Number.isInteger(value)) {
            return alert("musisz podać liczbę całkowitą!")
        }
        const currentCost = document.querySelector(`li[data-id=${id}] .item__calc`);
        const itemTotalCost = document.querySelector(`li[data-id=${id}] .item__price`);
        if (id === "products") {
            this.totalCost.productsCost = Math.floor(value) * this.productPrice;
            itemTotalCost.textContent = `$${this.totalCost.productsCost}`;
            currentCost.textContent = `${value} * $${this.productPrice}`;
        }
        else if (id === "orders") {
            this.totalCost.ordersCost = Math.floor(value) * this.orderPrice;
            itemTotalCost.textContent = `$${this.totalCost.ordersCost}`;
            currentCost.textContent = `${value} * $${this.orderPrice}`;
        }

        this.totalPrice.textContent = this.totalCost.updateTotalCost();
    }
    // show ul after click
    showList() {
        document.querySelector('.select__dropdown').classList.toggle("d-none");
    }
    // add package to calc
    selectPackage(e) {
        document.querySelector('.select__dropdown').classList.toggle("d-none");
        const packageType = e.target.dataset.value;
        const packageSubTotal = document.querySelector('li[data-id="package"] .item__price');
        const packageDescription = document.querySelector('li[data-id="package"] .item__calc');
        if (packageType === "basic") {
            this.totalCost.packageCost = this.basicPackagePrice;
            packageSubTotal.textContent = `$${this.totalCost.packageCost}`;
            packageDescription.textContent = packageType;
        }
        else if (packageType === "professional") {
            this.totalCost.packageCost = this.proffesionalPackagePrice;
            packageSubTotal.textContent = `$${this.totalCost.packageCost}`;
            packageDescription.textContent = packageType;
        }
        else if (packageType === "premium") {
            this.totalCost.packageCost = this.premiumPackagePrice;
            packageSubTotal.textContent = `$${this.totalCost.packageCost}`;
            packageDescription.textContent = packageType;
        }

        this.totalPrice.textContent = this.totalCost.updateTotalCost();
    }
    //checkboxs
    selectCheckbox(e) {
        const id = e.target.id;
        const checkboxTotalCost = document.querySelector(`li[data-id=${id}] .item__price`);

        if (id === "accounting") {
            if (e.target.checked) {
                this.totalCost.accountingCost = this.accounting;
                checkboxTotalCost.textContent = `$${this.accounting}`;
            }
            else {
                this.totalCost.accountingCost = 0;
                checkboxTotalCost.textContent = `$0`;
            }
        }
        else if (id === "terminal") {
            if (e.target.checked) {
                this.totalCost.terminalCost = this.rental;
                checkboxTotalCost.textContent = `$${this.rental}`;
            }
            else {
                this.totalCost.terminalCost = 0;
                checkboxTotalCost.textContent = `$0`;
            }
        }

        this.totalPrice.textContent = this.totalCost.updateTotalCost();
    }

}

class TotalCost {
    constructor() {
        this.productsCost = 0;
        this.ordersCost = 0;
        this.packageCost = 0;
        this.accountingCost = 0;
        this.terminalCost = 0;

        this.money = 0;
    }
    updateTotalCost() {
        this.money = this.productsCost + this.ordersCost + this.packageCost + this.accountingCost + this.terminalCost;
        return `$${this.money}`;
    }
}