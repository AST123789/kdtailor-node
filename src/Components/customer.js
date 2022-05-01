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