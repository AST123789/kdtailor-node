import React,{ useState} from 'react'
import { Link} from 'react-router-dom'
import {toast} from 'react-toastify'
export const InsertCustomerData= async(req)=>{

    try{
        const response = await fetch('http://13.211.233.35/api/insertcustomer',{
            method: "POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "name":req.name,
                "surname":req.surname,
                "phone":req.phone,
                "email":req.email
            })
        })
        if(response.status===401){
            toast.error('Your Session has been Expired')
            return window.setTimeout(function () {
                localStorage.clear();
                window.location.href='/#/';
            },1000);
        }
        const result = await response.json();
        if(response.ok){
            return result;
        }
        else if(response.status===400){
            toast.error(result.error[0])
        }
        else{

        }

    } catch(error){
        toast.error('Something went wrong , Please try again')
    }
};

function Registeration() {

    const [firstname,setfirstname] = useState("")
    const [lastname,setlastname] = useState("")
    const [number,setnumber] = useState("")
    const [email,setemail] = useState("")
    const [check,setcheck] = useState(0)
      
    const submit = (e)=>{
        e.preventDefault()
        var req={
            "name":firstname,
            "surname":lastname,
            "phone":number,
            "email":email
        }

        InsertCustomerData(req).then((response)=>{
            const result = response
            if(result !== undefined)
            {
                // alert(result.message)
            }
            else{
                alert("Something went wrong. Please try again")
            }
        }).catch()
            setcheck(1)
            setTimeout(function(){
                setcheck(0)
                setfirstname("")
                setlastname("")
                setnumber("")
                setemail("")
            },1000)
    }

    return (
        <>
        <div className="inner_content" style={{padding:'0rem'}}>
					<div className="inner_content_w3_agile_info">
					<div style={{textAlign:'center'}}>
						<img style={{width:'25%', height:'150px'}} src='kdtailor.jpeg'/>
                    </div>
                    {
                        check===1?<div style={{textAlign:'center',color:'white',fontSize:'30px',backgroundColor:'green',border:'2px solid black',margin:'3%'}}>Customer Successfully registered</div>:null
                    }
                    
                    <div className="registration admin_agile">
                        <div className="signin-form profile admin">
                            <h2>Customer Registeration</h2>
                            <div className="login-form">
                                <form method="post">
                                    <input type="text" name="name" placeholder="Enter Firstname" value={firstname} required onChange={(e)=>setfirstname(e.target.value)}/>
                                    <input type="text" name="lastname" placeholder="Enter Lastname" value={lastname} required onChange={(e)=>setlastname(e.target.value)}/>
                                    <input type="text" name="number" placeholder="Enter Phone number" value={number} required onChange={(e)=>setnumber(e.target.value)}/>
                                    <input type="email" name="email" placeholder="Enter Email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                                    <Link onClick={(e)=>submit(e)} style={{color:'#fff'}}>
                                        <div className="tp login_button">
                                            Register 
                                        </div>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
				</div>
				</div>
                <div className="copyrights">
                    <p>© 2022 KD Tailor. All Rights Reserved | Design by  <Link to="http://digitalcreaters.com/" target="_blank">Digital Creaters</Link> </p>
                </div>
                {/* <Footer/> */}
                </>
    )
}

export default Registeration
