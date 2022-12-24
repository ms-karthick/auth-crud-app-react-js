import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useUserListMutation } from '../services/UserAuthApi';
import { Link } from 'react-router-dom';
import { getToken, removeToken} from '../services/LocalStorageService';

const Dashboard = () => {
    const [ userList ] = useUserListMutation();
  const [data, setData] = useState([]);
const token = getToken();
  const loadDatas = async () =>{

    const res = await userList({ token })
    console.log(res);
     let data = res.data.data;
     setData(data);
    //  console.log(data);
  }
            
  useEffect(() => {
      loadDatas();
      },[]);

  return <>
     <div className='table-responsive'>
            <Table className='table m-0 table-colored-bordered table-bordered-primary'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.location}</td>
                                <td>{item.email}</td>
                            </tr>
                        )
                    })

                    }
                </tbody>
            </Table>
        </div>
  </>;
};

export default Dashboard;