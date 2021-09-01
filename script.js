const from = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const btnDeleteAllComplete = document.querySelector('#btnDeleteAllComplete');
const taskList = document.querySelector('#task-list');
const completeTaskList = document.querySelector('#complete-task-list');

//eventleri cagirir.
eventListeners();

// Yapilan islemleri izlemek icin
function eventListeners() {
    //görev ekleme
    from.addEventListener('submit', addNewItem)

    // elemanlari silme ve tamamlananlari yapılan listesine gonderme
    //taskList.addEventListener('click',deletItem);
    // taskList.addEventListener('click', taskSwapItem)

    //Yapilan listesinde eleman silme
    completeTaskList.addEventListener('click', deletItem);
    btnDeleteAll.addEventListener('click', deleteAllItem);
    btnDeleteAllComplete.addEventListener('click', comletedeleteAllItem);

    //butun elemanlari silme
    //  btnDeleteAll.addEventListener('click',deleteAllItem);
}
//yeni eleman ekleme    
function addNewItem(e) {
    if (input.value === '') {
        alert('Gorev Yazmadiniz');
    } else {
        creatItem(input.value);
    }

    input.value = '';
    e.preventDefault();
}
//eklenen elemanları olusturma.
function creatItem(text) {
    //gorevimizin li etiketini olustuduk olusturduk
    const task = document.createElement('li');
    task.className = 'list-group-item list-group-item-secondary'
    task.appendChild(document.createTextNode(text));

    //silme iconu olusturduk
    const deleteIcons = document.createElement('a');
    deleteIcons.classList = 'delete-item float-right';
    deleteIcons.setAttribute('href', '#');
    deleteIcons.innerHTML = '<i class="fas fa-times"></i>';
    //Onaylama iconu olusturduk
    const checkIcons = document.createElement('a');
    checkIcons.classList = 'check-item float-left';
    checkIcons.setAttribute('href', '#');
    checkIcons.innerHTML = '<i class="fas fa-check"></i>';

    checkIcons.addEventListener('click', onComplete);
    deleteIcons.addEventListener('click', deleteTask);
    //iconlari elemana ekliyoruz.
    task.appendChild(deleteIcons);
    task.appendChild(checkIcons);

    //gorevi de listemize ekliyoruz
    taskList.appendChild(task);

    function onComplete(e) {
        if (confirm('Bu Görevi Tamamladın Mı?')) {
            // console.log(e);
            addItemCompleteTask(e.target.parentElement.parentElement.textContent);
            e.target.parentElement.parentElement.remove();

        }
    }

    function deleteTask(e) {
        if (confirm('Gorev Silinecek Emin Misin?')) {
            e.target.parentElement.parentElement.remove();
        }
    }

}

//Secilen görevi siler.
function deletItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('Gorev Silinecek Emin Misin?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
    e.preventDefault();
}

//Onaylanan gorevleri Yaplanlar listesine tasir.
function taskSwapItem(e) {
    if (e.target.className === 'fas fa-check') {
        if (confirm('Bu Görevi Tamamladın Mı?')) {
            addItemCompleteTask();
            console.log("e.target.parentElement.parentElement", e.target.parentElement)
            e.target.parentElement.remove();
        }
    }
    e.preventDefault();
}

//Yapilanlar listesinin elemanlarini olusturuyoruz.
function addItemCompleteTask(text) {

    //Tamamlanan gorevi li etiketiyle olusturduk
    const completeTask = document.createElement('li');
    completeTask.className = 'list-item list-group-item-secondary';
    completeTask.appendChild(document.createTextNode(text));

    // Silme iconu olustuduk
    const completeDeleteIcon = document.createElement('a');
    completeDeleteIcon.classList = 'delete-item float-right';
    completeDeleteIcon.setAttribute('href', '#');
    completeDeleteIcon.innerHTML = '<i class="fas fa-times"></i>';

    //Silme iconunu elemanimiza ekledik
    completeTask.appendChild(completeDeleteIcon);

    //gorevi listeye ekledik
    completeTaskList.appendChild(completeTask);


}

//Yapılan veya Yapilmamis gorevleri siler.
function deleteAllItem(e) {
    if (confirm('Butun Gorevler Silinecek Emin Misin?')) {

        taskList.childNodes.forEach(item => {
            if (item.nodeType === 1) {
                item.remove();
            }
        });

    }
    e.preventDefault();
}

function comletedeleteAllItem(e) {
    if (confirm('Butun Gorevler Silinecek Emin Misin?')) {

        completeTaskList.childNodes.forEach(item => {
            if (item.nodeType === 1) {
                item.remove();
            }
        });

    }
    e.preventDefault();
}