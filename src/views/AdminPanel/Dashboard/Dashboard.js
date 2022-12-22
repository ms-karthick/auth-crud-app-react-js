import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BASE_URL } from '../../../App';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const [data, setData] = useState([]);

  const loadDatas = () =>{
      axios.get(BASE_URL+'/api/user')
      .then(response => response.data)
      .then((response_data) => {
          let data = response_data.data
          setData(data);
          // console.log(data);
      })
      .catch((error) => {
          console.log(error);
      });   
  }
            
  useEffect(() => {
      loadDatas();
      },[]);

  return <>
     <div className='table-responsive'>
         <h4>Categories 
            <Link to="/Category/Create" className="btn btn-primary btn-sm float-end">Add</Link>
        </h4> 
            <Table className='table m-0 table-colored-bordered table-bordered-primary'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                {/* <td>{item.created_at}</td> */}
                                {/* <td>{item.updated_at}</td> */}
                                {/* <td>
                                    <Link to={'edit/'+item.id} className='btn btn-success btn-sm'>Edit</Link>
                                </td>
                                <td>
                                    <Button type='button' onClick={()=>handleDelete(item.id)} className='btn btn-danger btn-sm'>Delete</Button>
                                </td> */}
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