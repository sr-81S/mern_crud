import { TextField, Button } from "@mui/material";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Iteam = () => {

    const navi = useNavigate()

    const [input, setInput] = useState({
        name:"",
        email:"",
        age:"",
        mobile:"",
        work:"",
        add:"",
        descri:"",
    })

    const setdata = (e)=>{
        // console.log(e.target.value);
        const {name,value} = e.target;
        setInput((preval)=>{
            return{
                ...preval,
                [name]:value,
            }
        })
    }


    const addDataDB = async(e)=>{
      e.preventDefault()

      const {name,email,age,mobile,work,add,descri}= input;
      if(!name || !email || !age || !mobile || !work || !add || !descri){
        alert("fild missing")
      }else{
        const res = await fetch("/api/resister",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,email,age,mobile,work,add,descri
        })
      })

      const data = await res.json()
      console.log(data);

      if(res.status === 422 || !data){
        alert("error");
      }else{
        alert("data added")
        navi("/")
      }
      }

      

    }






  return (
    <>
      <div className="container_form">
        <div className="mt-1">
          <div className="form_box mb-5">
            <div className="in_form">
              <form className="in_one">
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  name="name"
                  onChange={setdata}
                  value={input.name}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={setdata}
                  value={input.email}
                />
                <TextField name="age" id="outlined-basic" label="Age" variant="outlined" onChange={setdata}
                  value={input.age} />
                <TextField
                  id="outlined-basic"
                  label="Mobile"
                  variant="outlined"
                  name="mobile"
                  onChange={setdata}
                  value={input.mobile}
                />
                <TextField
                  id="outlined-basic"
                  label="Work"
                  variant="outlined"
                  name="work"
                  onChange={setdata}
                  value={input.work}
                />
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  name="add"
                  onChange={setdata}
                  value={input.add}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  defaultValue="Any Feedback"
                  name="descri"
                  onChange={setdata}
                  value={input.descri}
                />
                <Button type="submit" onClick={addDataDB} size="medium" sx={{fontSize: 20}} variant="contained">Add</Button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Iteam;
