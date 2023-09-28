// import React,{Component}from "react";


// componentDidMount(){
//     fetch("http://localhost:5000/userData",{
//         method:"POST",
//         crossDomain:true,
//         headers:{
//             "Content-Type":"application/json",
//             Accept:"application/json",
//             "Access-Control-Allow-Origin":"*",
//         },
//         body:JSON.stringify({
//            token:window.localStorage.getItem("token"),
//         }),
//     }).then((res)=>res.json())
//     .then((data)=>{
//         console.log(data,"userData");
//     })

// }
// export default class Userdetails extends Component{
//     render(){
//         return(
//             <div>
//                 Name<h1>tobias</h1>
//                 Email<h1>to@gmail.com</h1>
//             </div>
//         )
//     }
// }

import React, { Component } from "react";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);

    // Initialize state to hold user data
    this.state = {
      name: "",
      email: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update state with user data from the server
        this.setState({
          name: data.name, // Assuming the server response contains a 'name' field
          email: data.email, // Assuming the server response contains an 'email' field
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Name: {this.state.name}</h1>
        <h1>Email: {this.state.email}</h1>
      </div>
    );
  }
}


