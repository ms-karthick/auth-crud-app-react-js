import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { BASE_URL } from '../../../App';
import { Link } from 'react-router-dom';

function ListCategory() {
    const [data, setData] = useState([]);

const loadDatas = () =>{
    axios.get(BASE_URL+'/api/employee')
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

    return (
        <div className='table-responsive'>
         <h4>Categories 
            <Link to="/AddEmployee" className="btn btn-primary btn-sm float-end">Add</Link>
        </h4> 
            <Table className='table m-0 table-colored-bordered table-bordered-primary'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                {/* <td>{item.created_at}</td> */}
                                {/* <td>{item.updated_at}</td> */}
                                <img rounded thumbnail src={`http://127.0.0.1:8000/storage/image/${item.image}`} width={200} height={200} />

                            </tr>
                        )
                    })

                    }
                </tbody>
            </Table>
        </div>
    );
}

export default ListCategory;