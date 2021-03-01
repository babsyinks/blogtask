const handleDeleteAcct = ()=>{
    const createElement = (ele)=>document.createElement(ele)
    const backdrop = createElement('div')
    backdrop.classList.add('backdrop')
    const modal = createElement('div')
    modal.classList.add('modal')
    const msg = createElement('div')
    msg.textContent = 'Are You Sure You Want To Delete Your Account?This Action Cannot Be Undone!'
    msg.id = 'deleteMsg'
    modal.appendChild(msg)
    const confirm = createElement('button')
    confirm.value = 'Delete'
    confirm.textContent = 'Delete'
    confirm.id = "confirmDel"
    const anchor = createElement('a')
    anchor.href = '/deleteAcct'
    anchor.appendChild(confirm)
    const decline = createElement('button')
    decline.value = 'Cancel'
    decline.textContent = 'Cancel'
    decline.id = "declineDel"
    decline.onclick = ()=>{
        document.body.removeChild(backdrop)
    }
    const btnWrapper = createElement('span')
    btnWrapper.appendChild(anchor)
    btnWrapper.appendChild(decline)
    modal.appendChild(btnWrapper)
    backdrop.appendChild(modal)
    document.body.appendChild(backdrop)
}