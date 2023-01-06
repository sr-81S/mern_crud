import { TextField, Button } from "@mui/material";
import React,{useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

const IteamEdit = () => {

  const navigate = useNavigate()

  // const [data, setData] = useState([]);

  const {id} = useParams("")

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

    const getData = async () => {
      const res = await fetch(`/api/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      
      const userdata = await res.json();
      console.log(userdata);
     
  
      if (res.status === 422 || !userdata) {
        console.log("error");
      } else {
        setInput(userdata);
      }
    };
    useEffect(() => {
      getData();
    }, []);


    const editSend = async(e)=>{
      e.preventDefault();
      const {name,email,age,mobile,work,add,descri}= input;

      const res = await fetch(`/api/update/${id}`,{
        method:"PATCH",
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
        alert("data update")
        navigate("/")
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
                <Button type="submit" onClick={editSend} size="medium" sx={{fontSize: 20}} variant="contained">Edit</Button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IteamEdit;
