let cardAmt='';
let amount='';
let fullPin='';
let pin='';
let detailss = [];
let cards = '';
let getPin=''
let savePins=''
generateData.addEventListener('click', generatePin)
function generatePin() {
    cardAmt = amountCard.value;
    if (cardAmt !=='') {
        pin = (Math.floor(100000+Math.random()*9000000000000000));
        if (cardTime.value =='mtn') {
            fullPin=`*555*${pin}#`
        } else if(cardTime.value =='airtel'){
            fullPin=`*126*${pin}#`
        } else if (cardTime.value == 'glo') {
            fullPin=`*123*${pin}#`
        } else if (cardTime.value =='9-mobile') {
            fullPin=`*232*${pin}#`
        }
        detailss.push({amountCard:cardAmt, pin:fullPin, status:false})
        amountCard.value=''
        display()
        savePins.localStorage.setItem('pinDetails', JSON.stringify(details))
    } else{
        alert('Please input a valid Amount')
    }
    }
getPin=localStorage.getItem('pinDetails');
function checkPins() {
    if(getPin){
        detailss=JSON.parse(getPin)
        display()
    }
}
checkPins()
function display() {
        let data = detailss.map((ele, index) => {
        return `<tr>
        <td>${index+1}</td>
        <td>${ele.amountCard}</td>
        <td>${ele.pin}</td>
        <td id="cond">${ele.status == false?`<p>UNUSED</p>`:`<p>USED</p>`}</td>
        <td><h1 class="btn btn-danger" onclick="del(${index})">DELETE</h1></td>
        </tr>`
    })
    console.log(data);
    tbody.innerHTML=data.join('')
}
//
loader.onclick = function loadCard() {
    if (loadPins.value !=='') {
        let onames = detailss.find(function (element) {
            return element.pin == loadPins.value
        })
        if (typeof onames == 'object') {
            if (onames.status == false) {
                onames.status = true
                alert('Recharge Successful')
                cond.innerHTML = onames.status
                console.log(onames.status);
            display()
            }
            else {
                alert('Pin already Used')
            } 
        } else{
            alert('Invalid Pin')
        }
    } else{
        alert('Enter a pin to load card')
    }
}
function del(index) {
    detailss.splice(index, 1)
    display()
}