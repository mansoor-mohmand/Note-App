import {Note} from "./Note.js";
export class Helper{

    static LineCount()
    {
        var section_note_body = document.querySelectorAll(".section-note .note-box .note-body p");
    
        section_note_body.forEach(text =>
            {
                var parent = text.parentElement.parentElement;
                var line = parseInt(text.offsetHeight / 23);
                
                
                if(line==1 || line==0)
                {
                    parent.classList.add("one");
                    
                }
                else if(line==2)
                {
                    parent.classList.add("two");
                    
                }
                else if(line==3)
                {
                    parent.classList.add("three");
                    
                }
                
                else if(line==4)
                {
                    parent.classList.add("four");
                    
                }
                else if(line==5)
                {
                    parent.classList.add("five");
                    
                }
                else if(line==6)
                {
                    parent.classList.add("six");
                    
                }
                else if(line==7)
                {
                    parent.classList.add("seven");
                    
                }
                
                else if(line==8)
                {
                    parent.classList.add("eight");
                    
                }
                else
                {
                    parent.classList.add("nine");
                }
            });
    }
    //* date and time sitting
    static getDateTime()
    {
        const Date_Time = new Date();
    
        var hour = Number(Date_Time.getHours());
        var minute = Number(Date_Time.getMinutes());
        var AMPM = "";
        var mytime="";
        var mydate ="";
        var mydate2="";
        var FullDateTime="";
        var FullDateTime2="";
    
        AMPM =(hour<12)?"AM":(hour>=12)?"PM":"";
        hour=(hour%12==0)?12:Date_Time.getHours()%12; 
        hour=(hour<10)?"0"+hour:hour;
        minute=(minute<10)?"0"+minute:minute;
    
        mytime = hour+":"+minute+" "+AMPM;
    
        var d = Date_Time.toString().split(" ");
        mydate = `${d[1]} ${d[2]} ${d[3]}`;
        mydate2 = `${d[1]} ${d[2]}`;
        
    
        FullDateTime=`${mydate}, ${mytime}`;
        FullDateTime2=`${mydate2}, ${mytime}`;
        var date_time = document.querySelectorAll(".date_time");
        date_time.forEach(l=>l.innerHTML=FullDateTime2);
    
        return FullDateTime;
    }
    
    
    //* time difference
    static Date_diff(oldDate)
    {
        var date = oldDate.split(",");
        var days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const M_P_DAY= (1000*60*60*24);
        var T_date = new Date();
        var O_Date = new Date(date[0]);
        
    
        const utc1 = Date.UTC(T_date.getFullYear(), T_date.getMonth(), T_date.getDate());
        const utc2 = Date.UTC(O_Date.getFullYear(), O_Date.getMonth(), O_Date.getDate());
        let date_diff = Math.floor((utc1-utc2)/M_P_DAY)
        
        if(date_diff==0)
        {
            return `Today,${date[1]}`;
        }
        else if(date_diff==1)
        {
            return `Yesterday,${date[1]}`;
        }
        else if(date_diff==2 || date_diff==3)
        {
            return `${days[O_Date.getDay()]},${date[1]}`;
        }
        else
        {   
            var d = T_date.toString().split(" ");
            return `${d[1]} ${d[2]},${date[1]}`;
        }
    
    } 
    
    
    //* note_box ---- click on each note display the contents
    
    static NoteBox_ClickEvent()
    {
        var longPress = false;
        var timeout;
        // ?notes DOM's
        const note_box = document.querySelectorAll(".note-box");
        
        
        //? long press event
        note_box.forEach(NoteBox=>NoteBox.addEventListener("mouseup",()=>{
            clearInterval(timeout);
        }));
    
    
        note_box.forEach(NoteBox=>NoteBox.addEventListener("mousedown",()=>{
            
            timeout=setInterval(() => {
               longPress=true;
                   NoteBox.classList.add("selected");
                   document.querySelector('.header-container').classList.add("show");
            }, 300);
    
    
                if(document.querySelectorAll(".selected").length>0)
                {
                    if(!NoteBox.classList.contains("selected"))
                    {
                        NoteBox.classList.add("selected");
                    }
                    else
                    {
                        NoteBox.classList.remove("selected");
                    }
                }
                else
                {
                    longPress=false;
                }
    
            this.countSelected();
        })
        );
    
        // ? click event 
        note_box.forEach(NoteBox=>NoteBox.addEventListener("click",()=>{
    
            if(longPress==false && document.querySelectorAll(".selected").length==0)
            {
                Note.DisplaySingleNote(NoteBox);
                Note.DisplayAllNotes();
            }
           
        })
        );
    }
    
    static SelectDeSelectAll(select)
    {
        const note_box = document.querySelectorAll(".note-box");
        const select_deselect_all_btn = document.getElementById("select_deselect_all_btn");
    
        if(select==true)
        {
            select_deselect_all_btn.className = "fa-solid fa-square-check header-icon";
            note_box.forEach(i=>{
                if(i.style.display!="none")
                {
                    i.classList.add("selected");   
                }
            });
        }
        else
        {
            select_deselect_all_btn.className = "fa-regular fa-square header-icon";
            note_box.forEach(i=>{
                i.classList.remove("selected");
            });
        }
    }
    
    static SelectDeSelectSingle()
    {
        const note_box = document.querySelectorAll(".note-box");
        const selectedLength = document.querySelectorAll(".selected").length;
    
        const select_deselect_all_btn = document.getElementById("select_deselect_all_btn");
        
        let note_boxLength=0;
        note_box.forEach(i=>{
            if(i.style.display!="none")
            {
                note_boxLength +=1;
            }
        });
    
        if(selectedLength==0)
        {
            document.querySelector('.header-container').classList.remove("show");
        }
        if(selectedLength==note_boxLength)
        {
            this.SelectDeSelectAll(true);
        }
        if(selectedLength<note_boxLength)
        {
            select_deselect_all_btn.className = "fa-regular fa-square header-icon";
        }
    }
    
    static countSelected()
    {
        
        let selectedLength = document.querySelectorAll(".selected").length;
            let selected =(selectedLength==0)?1:selectedLength;
    
            let selected_number = document.getElementById("selected_number");
            selected_number.innerText=selected;
    
            this.SelectDeSelectSingle();
    }
    
    static SortNumbers(arr)
    {   
        for(let j=0; j<arr.length; j++)
        {
    
            for(let i=0; i<arr.length; i++)
            {
                if(arr[i]>arr[j])
                {
                    console.log(arr[i] , arr[j])
                    let temp = arr[j];
                        arr[j] = arr[i];
                        arr[i] =temp;
                }          
            }
              
        }
    
        return arr;
    }
    
    static DeleteMsgBox(modal,selected,msg)
    {
        var delete_selected = modal.querySelector("#delete_selected");
        var delete_msg = modal.querySelector("#delete_msg");
    
        delete_selected.innerText=`Delete ${selected} note?`;
        delete_msg.innerText=msg;
        modal.showModal();
    }

}