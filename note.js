let notarea=document.querySelector(".notarea");
let noteList=document.querySelector(".noteList");

let lists=document.querySelector(".lists");

let add=document.querySelector("#noteclick");

let icons=document.querySelector("i");

let bgcolor="Yellow";

function createnote(idx,text)
{
    let note=document.createElement("div");
        note.classList.add("note");

        let icons_note=document.createElement("div");
        icons_note.classList.add("icons_note");
        

        let icon1=document.createElement("i");
        icon1.className = "fa-solid fa-plus";

        let icon2=document.createElement("i");
        icon2.className = "fa-solid fa-check";

        let icon3=document.createElement("i");
        icon3.className = "fa-solid fa-xmark";

        let icon4=document.createElement("i");
        icon4.className = "fa-solid fa-ellipsis";

        icons_note.appendChild(icon1);
        icons_note.appendChild(icon2);
        icons_note.appendChild(icon3);
        icons_note.appendChild(icon4);

        icons_note.style.backgroundColor=bgcolor;
        let inside_icon=icons_note.querySelectorAll("i");
        inside_icon.forEach((icon)=>
        {
            icon.style.backgroundColor=bgcolor;
        })

        
        let menu = document.createElement("div");
        menu.classList.add("menu");

        let noteList = document.createElement("div");
        noteList.classList.add("show_list");
        noteList.textContent = "Note List";

        let deleteNote = document.createElement("div");
        deleteNote.classList.add("delete_note");
        deleteNote.textContent = "Delete Note";

        menu.appendChild(noteList);
        menu.appendChild(deleteNote);

        note.appendChild(icons_note);
        note.appendChild(menu);

        note.dataset.id=idx;
        
        let textarea1=document.createElement("div");
        let textareainside=document.createElement("textarea");
        if(text)
        {
            textareainside.value=text;
        }

        textarea1.classList.add("textarea");
        textarea1.appendChild(textareainside);
        note.appendChild(textarea1);
        
        notarea.appendChild(note);

}

function savetoLocalstorage(curr_id,text,grandparentnote)
{
    let allnotes_arr=JSON.parse(localStorage.getItem("Notes"));

    
    if(!allnotes_arr)
    {
        allnotes_arr=[];
        let obj={curr_id,text};
        allnotes_arr.push(obj);
        localStorage.setItem("Notes",JSON.stringify(allnotes_arr));

    }

    let index=allnotes_arr.findIndex((note)=>
    {
        return note["curr_id"]===curr_id;
    })
    
    if(index !== -1)
    {
        let find_obj=allnotes_arr[index]
        find_obj["text"]=text;
        
    }

    else
    {
        let obj={curr_id,text};
        allnotes_arr.push(obj);
    }

    localStorage.setItem("Notes",JSON.stringify(allnotes_arr));
    let note_list=grandparentnote.querySelector(".show_list");
    if(!noteList.classList.contains("hidden"))
    {
        note_list.click();
    }
    
}

function displayNotes()
{
    let allnotes_arr=JSON.parse(localStorage.getItem("Notes"));

    lists.innerHTML = '';
    let saved_notes=Array.from(lists.children)

    allnotes_arr.forEach((note)=>
    {
        let exists=saved_notes.some((showed_notes)=>
        {
            return showed_notes.dataset.id== note["curr_id"];
        })

        if(!exists)
        {
            let noteadded=document.createElement("div");
            let textarea2=document.createElement("textarea");
            textarea2.setAttribute('readonly', true);
            noteadded.classList.add("noteadded");
            textarea2.classList.add("text2");
            noteadded.appendChild(textarea2);
            noteadded.dataset.id=note["curr_id"];
            textarea2.value=note["text"];
            lists.appendChild(noteadded);
        
            
        }
        else
        {
            saved_notes.forEach((showed_notes)=>
            {
                if(showed_notes.dataset.id===note["curr_id"])
                {
                    let textarea=showed_notes.querySelector("textarea");
                    textarea.value=note["text"];
             
                }
            })
        }

    })
    

}

function displayagain(id)
{
    let notesarea_arr=Array.from(notarea.children);

    let Note=notesarea_arr.find((nt)=>
    {
        return nt.dataset.id===id;
    })

    console.log("Notearea id",Note);
    if(Note)
    {
        Note.style.display="block";
    }
    
    else
    {
        let stored_val=JSON.parse(localStorage.getItem("Notes"));
        let obj=stored_val.find((note)=>
        {
            return note["curr_id"]===id;
        });

        let idx=obj["curr_id"];
        let text=obj["text"];

        let exists=notesarea_arr.some((note)=>
        {
            return note.dataset.id===idx;
        })

        if(!exists)
        {
            createnote(idx,text);
        }
    }
    
}

function deleteNote(id,note_list)
{
    let stored_val=JSON.parse(localStorage.getItem("Notes"));

    let obj_indx=stored_val.findIndex((note)=>
    {
        return note["curr_id"]===id;
    });

    if(obj_indx!==-1)
    {
        stored_val.splice(obj_indx,1);
        localStorage.setItem("Notes", JSON.stringify(stored_val));
    }

    let notesarea_arr=Array.from(notarea.children);

    let Note=notesarea_arr.find((nt)=>
    {
        return nt.dataset.id===id;
    })

    if(Note)
    {
        Note.remove();
    }

    console.log(note_list);

    displayNotes();



}

document.addEventListener("click", function(e) 
{
    if (e.target.classList.contains("fa-plus") || e.target.classList.contains("add-btn"))
    {
        let idx=Date.now();
        createnote(idx);
    }

    else if(e.target.classList.contains("fa-check"))
    {
        let parentnote=e.target.parentElement;
        let grandparentnote=parentnote.parentElement;

        let curr_id=grandparentnote.dataset.id;
        // console.log(curr_id);
        let textarea=grandparentnote.querySelector("textarea");
        let text=textarea.value;

        if((text).length===0)
        {
            alert("Add something to save!!");
            return;
        }
        else 
        {
            savetoLocalstorage(curr_id,text,grandparentnote);
        }
        console.log(text);
    }
    else if(e.target.classList.contains("fa-ellipsis"))
    {
        let parentelmt=e.target.parentElement;
        let siblingelmt=parentelmt.nextElementSibling;  //menu
        // console.log(siblingelmt);
        
        if (siblingelmt.style.display === "block") {
        siblingelmt.style.display = "none";
        } 
        else {
            siblingelmt.style.display = "block";
        }

    }
    else if(e.target.classList.contains("show_list") || e.target.classList.contains("showlist_icons")||e.target.classList.contains("fa-list-ul"))
    {
        noteList.classList.remove("hidden");
        displayNotes();
    }

    else if(e.target.classList.contains("fa-xmark"))
    {
        let parentIcon=e.target.parentElement;
        if(parentIcon.classList.contains("icons_note"))
        {   
            let greatParentIcon=parentIcon.parentElement;   //note
            let textinnote=greatParentIcon.querySelector("textarea").value;
            if(textinnote.length===0)
            {
                greatParentIcon.remove();
            }

            else{
                greatParentIcon.style.display="none";
            }
        }
        else if(parentIcon.classList.contains("icons"))
        {
            noteList.classList.add("hidden");
        }


    }
    else if(e.target.classList.contains("text2"))
    {
        // console.log("noteadded is clicked ")
        let text2=e.target;
        let noteadded=text2.parentElement;
        let id = noteadded.dataset.id;
        console.log("Notelists id",id);
        displayagain(id);
    }

    else if(e.target.classList.contains("delete_note"))
    {
        let parent=e.target.parentElement;            //menu
        let grandparent=parent.parentElement;         //note
        let note_list=e.target.previousElementSibling;

        let id=grandparent.dataset.id;
        deleteNote(id,note_list);

    }

})

let searching=document.querySelector(".searching");
searching.addEventListener("input",function(e)
{
    console.log(e.target.value);
    let query=e.target.value;

    let noteadded=lists.querySelectorAll(".noteadded");
    noteadded.forEach((note)=>
    {   
        
        let text=note.querySelector("textarea").value;
        console.log(text);
        if(text.includes(query))      //read opposite
        {
            note.style.display="block";
        }
        else
        {
            note.style.display="none";
        }
    })
})

let colors=document.querySelectorAll(".color");

colors.forEach((color)=>
{
    color.addEventListener("click",function(val)
    {
       console.log(val.target);
       console.log(val.target.style.backgroundColor);
       bgcolor=val.target.style.backgroundColor;
       let icons_note=document.querySelectorAll(".icons_note");
       
       icons_note.forEach((clr)=>
        {   
            clr.style.backgroundColor=bgcolor;
            let icons=clr.querySelectorAll("i");
            icons.forEach((iclr)=>
            {
                iclr.style.backgroundColor=bgcolor;
            })
            
        })
    
    })
})

