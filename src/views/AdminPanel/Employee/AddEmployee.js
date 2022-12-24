import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../App';
   
const AddEmployee = ()=>{
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState();
  const [error, setError] = useState({
      status: false,
      msg: "",
      type: ""
  });
  const [file_preview, setFile_preview] = useState();

  const handleChangeFile = (event) => {
    let file = [];
    for (let i=0; i< event.target.files.length; i++){
      file.push(URL.createObjectURL(event.target.files[i]));
    }
    setFiles(event.target.files);
}

     const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name);
        console.log(files);

        if (name && files !== null) {
            var formdata = new FormData();
            formdata.append("name", name);
            formdata.append("image", files);
            formdata.append("img_url", files.name);

            var requestOptions = {
                method: 'POST',
                //   headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(BASE_URL+"/api/employee", requestOptions)
                .then(response => response.text())
                .then(function (result) {
                    const data = JSON.parse(result);
                    console.log(data)
                    if (data.status === true) {
                        navigate('/Dashboard')
                    }
                })
                .catch(error => console.log('error', error));
        }
        else {
            setError({ status: true, msg: "All Fields are Required", type: 'error' })
        }
    }

    useEffect(() => {
      if(!files){
          setFile_preview(undefined)
          return
      }
      setFile_preview(files);
      return() => URL.revokeObjectURL(files)
  },
  [files]
  );
    return (
        <div className="">
        <div className="row">
          <div className="col-md-12">
            <div className="card">

              <div className="col-md-6">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Image</label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleChangeFile}
                        className="form-control"
                      />
                        {file_preview.map((img, i) => {
                          return(
                            <img rounded thumbnail src={img} alt={"image-" +i} key={i} width={400} height={300} />
                          )
                        })}

                    </div>
                    <button type="submit" className="btn btn-info btn-block">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AddEmployee;