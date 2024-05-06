import axios from "axios";
import { useEffect, useState } from "react";

export function Top10({ topUsers, setTopUsers }){

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const top10 = async () => {
            try{
                const res = await axios.get("http://localhost:8080/donations/top");
                console.log(res.data);
                setTopUsers(JSON.stringify(res.data));
                console.log(topUsers);
                window.localStorage.setItem('top10', topUsers);
                setUsers(JSON.parse(window.localStorage.getItem('top10')));
                console.log(users[0]);
            } catch (e){
                console.error(e);
            }
        };
        
        top10();
    }, [setTopUsers])

    return users;
}