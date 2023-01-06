import React, {useState, useEffect} from "react";
import { BsFillPenFill, BsFillEyeFill, BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([])

   

  const getData = async(e)=>{
    
    

    const res = await fetch("/api/getdata",{
      method:"GET",
      headers:{
        "Content-Type": "application/json"
      }
    })

    const userdata = await res.json()
    
    if(res.status === 422 || !userdata){
      alert("error");
    }else{
      setData(userdata)
    }

  }

  const deleteUser = async (id)=>{
    const resDEl = await fetch(`/api/deleteuser/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json"
      }
    })
    const dataDLT = await resDEl.json()
    console.log(dataDLT);


    if(resDEl.status === 422 || !dataDLT){
      alert("error");
    }else{
      console.log("user delete");
      getData();
    }
  }


  useEffect(() => {
    getData()
  },[])
  
 







  return (
    <>
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2">
            <div className="btn btn-success"> <Link to="/iteam" style={{textDecoration : "none", color: "#fff"}} >Add Data</Link> </div>
          </div>

          <table className="table text-center table-striped table-hover mt-3">
            <thead className="table-success " >
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Mobile</th>
                <th scope="col">Controls</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((ele,id)=>{
                  return(
                    <>
                      <tr key={id} >
                <th scope="row">{id+1}</th>
                <td> {ele.name} </td>
                <td> {ele.email} </td>
                <td> {ele.work} </td>
                <td> {ele.mobile} </td>
                <td>
                    <button className="btn btn-success mx-2"><Link to={`/edit/${ele._id}`} style={{textDecoration : "none", color: "#fff"}} ><BsFillPenFill className="icon_id " /></Link></button>
                    <button className="btn btn-primary mx-2"><Link to={`view/${ele._id}`} style={{textDecoration : "none", color: "#fff"}} ><BsFillEyeFill className="icon_id " /></Link></button>
                    <button onClick={()=>deleteUser(ele._id)} className="btn btn-danger mx-2"><BsTrashFill className="icon_id " /></button>
                </td>
              </tr>
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
