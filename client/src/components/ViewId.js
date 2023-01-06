import React, { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import im from "./profile-icon-png-921.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewId = () => {
  const { id } = useParams("");
  
  const lin = useNavigate()
  

  const [data, setData] = useState([]);
  

  const getData = async () => {
    const res = await fetch(`/api/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("api call");
    
    const userdata = await res.json();
    console.log(userdata);
   

    if (res.status === 422 || !userdata) {
      console.log("error");
    } else {
      setData(userdata);
      console.log(data);
    }
  };
  useEffect(() => {
    getData();
    console.log("use effect call");
  }, []);

  
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
      lin("/")
    }
  }



  return (
    <>
      <div className="container mt-3">
        <h1 style={{ fontWeight: 400 }}>welcome  {data.className} </h1>

        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <div className="row">
              <div className="left_view col-lg-6 col-md-6 col-12">
                <img
                  className="mt-0"
                  src={im}
                  style={{ width: 50 }}
                  alt="profile"
                />
                <h3>
                  Name: <span style={{ fontWight: 400 }}> {data.name} </span>
                </h3>
                <h3>
                  Age: <span style={{ fontWight: 400 }}> {data.age} </span>
                </h3>
                <p>
                  <MailOutlineIcon />
                  <strong>Email:</strong> <span> {data.email} </span>{" "}
                </p>
                <p>
                  <CardTravelIcon />
                  <strong>Ocupation:</strong> <span> {data.work} </span>{" "}
                </p>
              </div>
              <div className="right_view mt-5 col-lg-6 col-md-6 col-12">
                <p>
                  <PhoneAndroidIcon />
                  <strong>Mobile:</strong> <span> {data.mobile} </span>
                </p>
                <p>
                  <LocationOnIcon />
                  <strong>Location:</strong> <span> {data.add} </span>
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  <span>
                    {data.descri}
                  </span>
                </p>
                <div className="add_btn">
                  <button className="btn btn-success mb-3 mx-1">
                    <Link
                      to={`/edit/${data._id}`}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      <BorderColorIcon />
                    </Link>
                  </button>
                  <button onClick={()=>deleteUser(data._id)} className="btn btn-danger mb-3 mx-1">
                    <DeleteForeverIcon />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ViewId;
