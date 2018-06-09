import controller from './controller.js'

var vanillaJSView={

    init:function(){
        this.container=document.querySelector(".container");
        this.container.innerHTML=`
             <div class="todo">
                <h1 class="todo__header">To Do List</h1>
                    <ul class="tasklist">
                    </ul>
                <input class="todo__taketask" type="text"  placeholder="Enter Task" autocomplete="off" required>
                <div class="filter">
                     <span class="filter__item filter__item--dark">All</span>
                     <span class="filter__item">Active</span>
                     <span class="filter__item">Completed</span>
                </div>
                <span class="clearcompleted">
                    Clear Completed Task
                 </span>
             </div>`;
        this.jtoDo=document.querySelector(".todo");

        this.jinput=this.jtoDo.querySelector(".todo__taketask");
        this.jinput.addEventListener("keydown",this.handleTaskAdd);

        this.jfilter_items=this.jtoDo.querySelectorAll(".filter__item");
        this.jfilter_items.forEach((jfilter_item)=>jfilter_item.addEventListener("click",this.handleActiveTab));

        this.jtasks=this.jtoDo.querySelector(".tasklist");
        this.jtasks.addEventListener("click",this.handleToggle);
        this.jtasks.addEventListener("dblclick",this.enableEditMode);
        this.jtasks.addEventListener("keydown",this.disableEditMode);

        this.jspan=this.jtoDo.querySelector(".clearcompleted");
        this.jspan.addEventListener("click",this.handleClearCompletedButton);
        this.currentState ="All";
        this.render();
    },

    handleTaskAdd:function(e){
        if(e.key!="Enter")
            return;
        const newTask=this.value;
        if(newTask=="")
            return;
        controller.addTask(newTask).then(()=>{vanillaJSView.render()});
        this.value="";
    },

    handleActiveTab:function(){
        vanillaJSView.currentState=this.textContent;
        vanillaJSView.jfilter_items.forEach((jfilter_item)=> jfilter_item.classList.remove("filter__item--dark"));
        this.classList.add("filter__item--dark");
        vanillaJSView.render();
    },

    handleToggle:function(e)
    {
        if (e.target.matches(".tasklist--done")) {
           vanillaJSView.markTaskComplete(e);
        }
        else if (e.target.matches(".tasklist--remove")) {
            vanillaJSView.removeTask(e);
        }
    },

    markTaskComplete:function(e){
        const index = parseInt(e.target.dataset.index);
        controller.markTaskComplete(index).then(()=>vanillaJSView.render());
    },

    removeTask:function(e){
        const index = parseInt(e.target.dataset.index);
        controller.removeTask(index).then(()=>vanillaJSView.render());
    },

    render:function() {
        const currentState = vanillaJSView.currentState;
        controller.getAllTasks().then((response)=>{
            this.jtasks.innerHTML=response.filter(task => !(currentState == "Active" && task.isDone)&&!(currentState == "Completed" && !task.isDone))
            .map((task) => {
                const linepresent=(task.isDone?"tasklist__text tasklist__text--checked":"tasklist__text");
                return`
                    <li class="tasklist__task">
                        <span class="tasklist__item tasklist--done" data-index="${task.id}">&#10004</span>
                        <span class="${linepresent}" for="${task.id}"  data-index="${task.id}">${task.task}</span>  
                        <span class="tasklist__item tasklist--remove" data-index="${task.id}">X</span>
                    </li>`;
            }).join('');
            this.renderClearCompletesButton();
        });

    },

    renderClearCompletesButton:function(){
        controller.getAllTasks().then((respone)=> {
            const isAnyCompleted=respone.some(task => task.isDone);
            if (isAnyCompleted)
                this.jspan.classList.remove("clearcompleted--hide");
            else
                this.jspan.classList.add("clearcompleted--hide");
        });
    },

    handleClearCompletedButton:function(){

    },

    enableEditMode:function(e) {
        if(!e.target.matches("span"))
            return;
        e.target.classList.add("tasklist__text--dark");
        e.target.contentEditable=true;
    },

    disableEditMode:function(e){
        if(!e.target.matches("span")||e.key!="Enter")
            return;
        e.target.contentEditable=false;
        const index = parseInt(e.target.dataset.index);
        const task=e.target.textContent;
        controller.changeTask(index,task).then(()=> vanillaJSView.render());
    }


}

export default vanillaJSView;